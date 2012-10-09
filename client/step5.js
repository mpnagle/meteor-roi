var rowIndexOutcomes = -1;
var outcomesData = [];
var totalOutcomes = [0,0,0,0,0];


Template.Step_5.addRowOutcomes = function() {

outcomesChangeChildren = $('#outcomesChange').children();
rowIndexOutcomes = outcomesChangeChildren.length;



var outcomesChange = $('<select id=outcomesChange' + rowIndexOutcomes + '></select>');
outcomesChange.append('<option value="hospitalizations">All Inpatient Hospitalizations</option>');
outcomesChange.append('<option value="readmissions">30-day readmissions</option>');
outcomesChange.append('option value="office_visits">Office Visits</option>');
outcomesChange.append('<option value="nursing_visits">Nursing Visits</option>');
outcomesChange.append('<option value="other">Other</option>');
$('#outcomesChange').append(outcomesChange);



var outcomesType = $('<select id=outcomesType' + rowIndexOutcomes + '></select>');
outcomesType.append('<option value="percent_change">% Change</option>');
outcomesType.append('<option value="events_patient"># Events / Patient</option>');
$('#outcomesType').append(outcomesType);

var outcomesAmount =$("<input id=outcomesAmount" + rowIndexOutcomes + ">", {
    type: 'text'
});
$('#outcomesAmount').append(outcomesAmount);

var outcomesCost = $("<input id=outcomesCost" + rowIndexOutcomes + ">", {
    type: 'text'
});
$('#outcomesCost').append(outcomesCost);

var outcomesRisk = $('<select id=outcomesRisk' + rowIndexOutcomes + '></select>');
outcomesRisk.append('<option value="hospital">Hospital</option>');
outcomesRisk.append('<option value="provider">Provider Group</option>');
outcomesRisk.append('<option value="payer">Payer/option>');
outcomesRisk.append('<option value="home_care_agency">Home Care Agency</option>');
outcomesRisk.append('<option value="other">Other</option>');
$('#outcomesRisk').append(outcomesRisk);
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
	    Template.Step_5.addRowOutcomes();
	});
}


Template.Step_5.getDataStep5 = function(){
    
    outcomesData =[];

    currentRow =[];
    
    console.log("rowIndexOutcomes: " + rowIndexOutcomes);
    numRowsOutcomes = rowIndexOutcomes + 1;

    for (i=0; i<numRowsOutcomes; i++)
    {
	currentRow[0] = $('#outcomesChange' + i).val();
	currentRow[1] = $('#outcomesType' + i).val();
	currentRow[2] = $('#outcomesAmount' + i).val();
	currentRow[3] = $('#outcomesCost' + i).val();
	currentRow[4] = $('#outcomesRisk' + i).val();
    
	console.log("CurrentRow: " + currentRow);

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
	    console.log("entering if block where we assing the currentCost");
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
