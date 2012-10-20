var rowIndexOneTimeCosts = -1;
var rowIndexRecurCosts = -1;

var oneTimeData = [];
var recurData = [];
var patientsOnCellular = 0;

var totalOneTimeCosts = [];
var totalRecurCosts = [];
var totalTechCosts = [0,0,0,0,0];

//for debugging only -- should be initialized to empty.
//var totalTechCosts = [10000,10000,0,0,0];

Template.Step_2.newRowStep2OneTimeCosts = function() {

//    techOneTypeChildren = $('#one_time_costs').children();
//    console.log("techOneTypeChildren: " + techOneTypeChildren);

var techOneRows = document.getElementById('one_time_costs').getElementsByTagName('tr');
    rowIndexOneTimeCosts = techOneRows.length - 1;
  
console.log("techOneRows.length: " + techOneRows.length);

    var typeTech = $('<select id=techOneType' + rowIndexOneTimeCosts + '></select>');
    typeTech.append('<option value="med"">Medical Devices (Purchased)</option>');
    typeTech.append('<option value="infra">Infrastructure</option>');


    var cost = $("<input id=techOneCost" + rowIndexOneTimeCosts + ">", {
        type: 'text'
    });

    
    var classTech = $('<select id=techOneClass' + rowIndexOneTimeCosts + '></select>');
    classTech.append('<option value="shelf">-</option>');
    classTech.append('<option value="amortize">-</option>');


    var techTime = $("<input id=techOneTime" + rowIndexOneTimeCosts + ">", {
        type: 'text'
    });


    //row with 4 columns
    var newRow = $('<tr><td></td><td></td><td></td><td></td></tr>');
    newRow.appendTo($('#one_time_costs'));
    
    var values = [typeTech, cost, classTech, techTime];
    $('#one_time_costs tr:last').children().each(function(i) {
        var valueItem = values[i];
        $(this).append(valueItem);
    });

}


Template.Step_2.newRowStep2RecurCosts = function() {
    
    techRecurTypeChildren = $('#techRecurType').children();
    rowIndexRecurCosts = techRecurTypeChildren.length;



    var typeTech = $('<select id=techRecurType' + rowIndexRecurCosts + '></select>');
    typeTech.append('<option value="hardware_rent">Hardware(Rent.)</option>');
    typeTech.append('<option value="data_cellular">Data Cost - Cellular</option>');
    typeTech.append('<option value="data_landline">Data Cost - Landline</option>');
    typeTech.append('<option value="data_other">Data Cost - Other</option>');
    typeTech.append('<option value="shipping">Shipping / Refurbishing</option>');
    typeTech.append('<option value="server">Server / Hosting</option>');
    typeTech.append('<option value="misc_tech">Misc. Tech Fees</option>');
    $('#techRecurType').append(typeTech);

    var techCost = $("<input id=techRecurCost" + rowIndexRecurCosts +">", {
        type: 'text'
    });
    $('#techRecurCost').append(techCost);

    var techFreq = $('<select id=techRecurFreq' + rowIndexRecurCosts + '></select>');
    techFreq.append('<option value="annual">Annual</option>');
    techFreq.append('<option value="monthly">Monthly</option>');
    techFreq.append('<option value="monthly_patient">Monthly/Patient</option>');
    techFreq.append('<option value="yearly_patient">Yearly/Patient</option>');
    techFreq.append('<option value="one_time_patient">One Time/Patient</option>');
    $('#techRecurFreq').append(techFreq);
}







Template.Step_2.events({
    
        'click #addRowOneTech': function(){
	    Template.Step_2.newRowStep2OneTimeCosts();
	},

        'click #addRowRecurringTech': function(){
	        Template.Step_2.newRowStep2RecurCosts();
	},

	'click #calculateStep2': function(){
	    Template.Step_2.calculateStep2();
	    
	

	}
    
});


Template.Step_2.InitializeStep2 = function(){
    Meteor.defer(
	function(){
	    
	    if ((oneTimeData.length > 0) || (recurData.length > 0))
	    {
		Template.Step_2.loadDataStep2();
	    }
	    else
	    {
	    
		Template.Step_2.newRowStep2OneTimeCosts();
		Template.Step_2.newRowStep2RecurCosts();
		
	    }
		


	});
}


Template.Step_2.getDataStep2 = function(){
    
    var numRowsOneTimeCosts = rowIndexOneTimeCosts + 1;
    var numRowsRecurCosts = rowIndexRecurCosts + 1;

    oneTimeData = [];
    recurData = [];



    for (var i=0; i < numRowsOneTimeCosts; i++)
    {
	currentRow = ["","","",""];
	
	currentRow[0] = $('#techOneType' + i).val();
	currentRow[1] = $('#techOneCost' + i).val();
	currentRow[2] = $('#techOneClass' + i).val();
	currentRow[3] = $('#techOneTime' + i).val();
	

	oneTimeData.push(currentRow);
    }

    console.log("oneTimeData is " + oneTimeData); 

    for (var j=0; j < numRowsRecurCosts; j++)
    {
	currentRow = ["","",""];

	currentRow[0] = $('#techRecurType' + j).val();
	currentRow[1] = $('#techRecurCost' + j).val();
	currentRow[2] = $('#techRecurFreq' + j).val();
    
	recurData.push(currentRow);
    
    }

    patientsOnCellular = $('#percentCell').val();
    

    
}


Template.Step_2.calculateStep2 = function() {
    
    //oneTimeCosts section
    Template.Step_2.getDataStep2();
    

    var numRowsOneTimeCosts = rowIndexOneTimeCosts + 1;
    var numRowsRecurCosts = rowIndexRecurCosts + 1;
    
    totalOneTimeCosts = [0,0,0,0,0];
    totalRecurCosts = [0,0,0,0,0];
    totalTechCosts = [0,0,0,0,0];
    
    for (i=0; i<numRowsOneTimeCosts; i++)
    {


	currentCostArray = [0,0,0,0,0];
	
	currentType = oneTimeData[i][0];
	currentCost = parseInt(oneTimeData[i][1]);
	currentTime = parseInt(oneTimeData[i][3]);

	if (currentType === "med")
	{
	    //price based on lifetime use
	    fractionOfUse = totalMonths / (currentTime * 12);
	    
	    pricePerPatient = currentCost * fractionOfUse;

	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] += pricePerPatient * enrolledPatientsPerYear[j];
		
	    }

	}


	if (currentType === "infra")
	{
	    //price based on amortizing
	    pricePerYear = currentCost / currentTime;
	    

	    for (k = 0; k< currentTime; k++)
	    {
		currentCostArray[k]+= pricePerYear;

	    }   
	}

	for (k = 0 ; k<5; k++)
	{
	    totalOneTimeCosts[k] += currentCostArray[k];
	}
    }
    


    //recurCostsSection

    
    for (i=0; i<numRowsRecurCosts; i++)
    {
	
	currentCostArray = [0,0,0,0,0];

	currentType = recurData[i][0];
	currentCost = parseInt(recurData[i][1]);
	currentFreq = recurData[i][2];

	if (currentFreq === "annual")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] += currentCost;

	    }
	}
	
	if (currentFreq === "monthly")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] += (12*currentCost);
	    }
	}
	
	if (currentFreq === "monthly_patient")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] = (12*currentCost*enrolledPatientsPerYear[j]);
	    }
	}
	

	if (currentFreq === "yearly_patient")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] = currentCost * enrolledPatientsPerYear[j];
	    }
	}

	
	if (currentFreq === "one_time_patient")
	{
	    currentCostArray[0] = currentCost * enrolledPatientsPerYear[0];
	}


	//assuming they'll pick monthly / patient for data - cellular
	if (currentType === "data_cellular")
	{
	    for (k=0; k<5; k++)
	    {
		currentCostArray[k] *= patientsOnCellular / 100;

		currentCostArray[k] = Math.ceil(currentCostArray[k]);

	    }
	}
	
	if (currentType === "data_landline")
	{
	    for (k=0; k<5; k++)
	    {
		currentCostArray[k] *= (1 - (patientsOnCellular / 100));
		
		currentCostArray[k] = Math.ceil(currentCostArray[k]);
		
	    }
	}




	for (k=0; k<5; k++)
	{
	    totalRecurCosts[k] += currentCostArray[k];
	}
	

	


    }

    //making totalTechCosts for output
    for (l=0; l<5; l++)
    {
	if (!totalOneTimeCosts[l])
	{
	    totalOneTimeCosts[l] = 0;
	}
	if (!totalRecurCosts[l])
	{
	    totalRecurCosts[l]=0
	}
	
	totalTechCosts[l] += parseInt(totalOneTimeCosts[l]) + parseInt(totalRecurCosts[l]);

	//console.log("l: " + l + " parseInt(totalOneTimeCosts[l]): " + parseInt(totalOneTimeCosts[l]) + " parseInt(totalRecurCosts[l]): " + parseInt(totalRecurCosts[l]));
    }

    console.log(totalOneTimeCosts);
    console.log(totalTechCosts);
}

Template.Step_2.loadDataStep2 = function(){
    
    rowsInOneTime = oneTimeData.length;
    
    for (var i=0; i< rowsInOneTime; i++)
    {
	
	
	var currentRowToLoad = oneTimeData[i];

	Template.Step_2.newRowStep2OneTimeCosts();
	
	$('#techOneType' + i).val(currentRowToLoad[0]);
	$('#techOneCost' + i).val(currentRowToLoad[1]);
	$('#techOneClass' + i).val(currentRowToLoad[2]);
	$('#techOneTime' + i).val(currentRowToLoad[3]);
	    
    }


    rowsInRecur = recurData.length;

    for (j=0; j<rowsInRecur; j++)
    {
	Template.Step_2.newRowStep2RecurCosts();


	var currentRowToLoad = recurData[j];

	$('#techRecurType' + j).val(currentRowToLoad[0]);
	$('#techRecurCost' + j).val(currentRowToLoad[1]);
	$('#techRecurFreq' + j).val(currentRowToLoad[2]);


    }

    $('#percentCell').val(patientsOnCellular);

}

