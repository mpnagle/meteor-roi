var rowIndexMiscCosts = 0;
var miscData = [];
var totalMiscCosts = [0,0,0,0,0];



Template.Step_4.newRowMiscCosts= function() {

    var miscRows = document.getElementById('misc_costs').getElementsByTagName('tr');
    rowIndexMiscCosts = miscRows.length - 1;

    
    console.log("rowIndexMiscCosts:" + rowIndexMiscCosts);
    
    var miscType = $('<select id=miscType' + rowIndexMiscCosts + '></select>');
    miscType.append('<option value="misc_fees">Misc. Tech Fees</option>');
    miscType.append('<option value="services">Services</option>');
    miscType.append('<option value="subscriptions">Subscriptions</option>');
    miscType.append('<option value="other">Other</option>');
//  $('#miscType').append(miscType);

    var miscCost = $("<input id=miscCost" + rowIndexMiscCosts + ">", {
        type: 'text'
    });
//    $('#miscCost').append(miscCost);

    var miscFreq = $('<select id=miscFreq' + rowIndexMiscCosts + '></select>');
    miscFreq.append('<option value="annual">Annual</option>');
    miscFreq.append('<option value="monthly">Monthly</option>');
    miscFreq.append('<option value="monthly_patient">Monthly/Patient</option>');
    miscFreq.append('<option value="yearly_patient">Yearly/Patient</option>');
    miscFreq.append('<option value="one_time_patient">One Time/Patient</option>');
//    $('#miscFreq').append(miscFreq);

    var newRow = $('<tr><td></td><td></td><td></td></tr>');
    newRow.appendTo($('#misc_costs'));
    
    var values = [miscType, miscCost, miscFreq];
    $('#misc_costs tr:last').children().each(function(i) {
        var valueItem = values[i];
        $(this).append(valueItem);
    });


}



Template.Step_4.events({

    'click #addRowMisc':function() {
    Template.Step_4.newRowMiscCosts();
	},

    'click #calculate4':function() {
	Template.Step_4.calculateStep4();
	}
    

    });

Template.Step_4.InitializeStep4 = function(){
  
    
    console.log("miscData.length: " + miscData.length);
  
    if (miscData.length>0)
    {

	Meteor.defer(
	    function(){
		Template.Step_4.loadDataStep4();
	    });
    }
    else
    {
	Meteor.defer(
	    function(){
		Template.Step_4.newRowMiscCosts();
	    });
    }
}

Template.Step_4.getDataStep4 = function() {
    
    
    var numRowsMiscCosts = rowIndexMiscCosts + 1;
    
    miscData = [];
    
    for (i=0; i < numRowsMiscCosts; i++)
    {
	currentRow = ["","",""];
	
	currentRow[0] = $('#miscType' + i).val();
	currentRow[1] = $('#miscCost' + i).val();
	currentRow[2] = $('#miscFreq' + i).val();

	miscData.push(currentRow);    
    }
}

Template.Step_4.loadDataStep4 = function() {

    rowsInData = miscData.length;
    

    for (i=0; i< rowsInData; i++)
    {
	var currentRowToLoad = miscData[i];
	

	Template.Step_4.newRowMiscCosts();
	
	$('#miscType' + i).val(currentRowToLoad[0]);
	$('#miscCost' + i).val(currentRowToLoad[1]);
	$('#miscFreq' + i).val(currentRowToLoad[2]);


    }
    

}



Template.Step_4.calculateStep4 = function() {

    console.log("in calculate Step4");
    Template.Step_4.getDataStep4();
    

    numRowsMiscCosts = rowIndexMiscCosts + 1;
    totalMiscCosts = [0,0,0,0,0];
    
    for (i=0; i< numRowsMiscCosts; i++)
    {
	currentCostArray = [0,0,0,0,0];

	currentCost = parseInt(miscData[i][1]);
	currentType = miscData[i][2];

	
	if (currentType === "annual")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] += currentCost;

	    }
	}

	if (currentType === "monthly")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] += (12*currentCost);
	    }
	}
	
	if (currentType === "monthly_patient")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] = (12*currentCost*enrolledPatientsPerYear[j]);
	    }
	}
	

	if (currentType === "yearly_patient")
	{
	    for (j=0; j<5; j++)
	    {
		currentCostArray[j] = currentCost * enrolledPatientsPerYear[j];
	    }
	}

	
	if (currentType === "one_time_patient")
	{
	    currentCostArray[0] = currentCost * enrolledPatientsPerYear[0];
	}


	for (k=0; k<5; k++)
	{
	    totalMiscCosts[k] += currentCostArray[k];
	}
    }
}



