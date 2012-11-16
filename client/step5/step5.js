var rowIndexOutcomes = -1;
var outcomesData = [];
var totalOutcomes = [0,0,0,0,0];


Template.Step_5.addRowOutcomes = function() {

outcomesChangeChildren = $('#outcomesChange').children();
rowIndexOutcomes = outcomesChangeChildren.length;

    var outcomesRows = document.getElementById('outcomes').getElementsByTagName('tr');
    rowIndexOutcomes = outcomesRows.length - 1;



var outcomesChange = $('<select id=outcomesChange' + rowIndexOutcomes + '></select>');
outcomesChange.append('<option value="hospitalizations">All Inpatient Hospitalizations</option>');
outcomesChange.append('<option value="readmissions">30-day readmissions</option>');
outcomesChange.append('option value="office_visits">Office Visits</option>');
outcomesChange.append('<option value="nursing_visits">Nursing Visits</option>');
outcomesChange.append('<option value="other">Other</option>');




var outcomesType = $('<select id=outcomesType' + rowIndexOutcomes + '></select>');
outcomesType.append('<option value="percent_change">% Change</option>');
outcomesType.append('<option value="events_patient"># Events / Patient</option>');


var outcomesAmount =$("<input id=outcomesAmount" + rowIndexOutcomes + ">", {
    type: 'text'
});


var outcomesCost = $("<input id=outcomesCost" + rowIndexOutcomes + ">", {
    type: 'text'
});


var outcomesRisk = $('<select id=outcomesRisk' + rowIndexOutcomes + '></select>');
outcomesRisk.append('<option value="hospital">Hospital</option>');
outcomesRisk.append('<option value="provider">Provider Group</option>');
outcomesRisk.append('<option value="payer">Payer</option>');
outcomesRisk.append('<option value="home_care_agency">Home Care Agency</option>');
outcomesRisk.append('<option value="other">Other</option>');


    var newRow = $('<tr><td></td><td></td><td></td><td></td><td></td></tr>');
    newRow.appendTo($('#outcomes'));
    
    var values = [outcomesChange, outcomesType, outcomesAmount, outcomesCost, outcomesRisk];
    $('#outcomes tr:last').children().each(function(i) {
        var valueItem = values[i];
        $(this).append(valueItem);
    });

}

Template.Step_5.events({
    'click #addRowOutcomes': function(){
	Template.Step_5.addRowOutcomes()
    },

    'click #calculateStep5': function(){
	Template.Step_5.calculateStep5()
    }

});


Template.Step_5.InitializeStep5 = function(){
    Meteor.defer(
	function(){

	    if (outcomesData.length > 0)
	    {
		Template.Step_5.loadDataStep5();
	    }
	    else
	    {
		Template.Step_5.addRowOutcomes();
	   
	    }
	});
}


Template.Step_5.getDataStep5 = function(){
    
    outcomesData =[];

    var currentRow =[];
    

    numRowsOutcomes = rowIndexOutcomes + 1;

    for (var i=0; i<numRowsOutcomes; i++)
    {
	currentRow = ["","","",""];
	
	currentRow[0] = $('#outcomesChange' + i).val();
	currentRow[1] = $('#outcomesType' + i).val();
	currentRow[2] = $('#outcomesAmount' + i).val();
	currentRow[3] = $('#outcomesCost' + i).val();
	currentRow[4] = $('#outcomesRisk' + i).val();
    


	outcomesData.push(currentRow);


    }
	

    
}

Template.Step_5.calculateStep5 = function()
{
    Template.Step_5.getDataStep5();
    

    numRowsOutcomes = rowIndexOutcomes + 1;
    totalOutcomes = [0,0,0,0,0];

    for (i=0; i < numRowsOutcomes; i++)
    {
	currentCostArray = [0,0,0,0,0];
	
	currentCategory = outcomesData[i][0];
	currentType = outcomesData[i][1];
	currentAmount = parseInt(outcomesData[i][2]);
	currentCost = parseInt(outcomesData[i][3]);

	if (!currentCost)
	{

	    if (currentCategory === ("hospitalizations"||"readmissions"))
	    {
		currentCost = 10500;
	    }
	    
            if (currentCost === "office_visits")
	    { 
		currentCost = 120;
	    }
	    
	    if (currentCost === "nursing_visits")
	    {
		currentCost = 500;
	    }
	    
	}
	       

	    
	if (currentType === "events_patient")
	{
	    costPerPatient = currentAmount * currentCost;
	    
	    for (k=0; k<5; k++)
	    {
		currentCostArray[k]= costPerPatient * enrolledPatientsPerYear[k];
	    }
	    


	}




	for (i=0; i<5; i++)
	{
	    totalOutcomes[i] += currentCostArray[i];
	}

	console.log(totalOutcomes);

    }
}


Template.Step_5.loadDataStep5 = function(){
 
    var rowsInOutcomes = outcomesData.length;

    for (var j=0; j<rowsInOutcomes; j++)
    {
	var currentRowToLoad = outcomesData[j];

	console.log("currentRowToLoad is " + currentRowToLoad +
 "for j is " + j);
	
	Template.Step_5.addRowOutcomes();
	
	$('#outcomesChange' + j).val(currentRowToLoad[0]);
	$('#outcomesType' + j).val(currentRowToLoad[1]);
	$('#outcomesAmount' + j).val(currentRowToLoad[2]);
	$('#outcomesCost' + j).val(currentRowToLoad[3]);
	$('#outcomesRisk' + j).val(currentRowToLoad[4]);
    }
   

}
