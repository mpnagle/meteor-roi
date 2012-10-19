var totalROI=[];

Template.returnOnInvestment.InitializeROI = function(){
    Meteor.defer(
	function(){
	    Template.returnOnInvestment.loadResults();
	});
}

Template.returnOnInvestment.loadResults = function()
{
    for (i=0; i<5; i++)
    {
	costsCell = $('#returnsTable tr:eq(1) td:eq(' + (i+1) + ')');
	costsCell.html(totalPatientsPerYear[i]);
	
	totalCosts[i]= totalTechCosts[i] + totalStaffCosts[i] + totalMiscCosts[i];
	costsCell = $('#returnsTable tr:eq(2) td:eq(' + (i+1) + ')');
	
	if(totalCosts[i])
	{
	    costsCell.html(totalCosts[i]);
	}
	else
	{
	    costsCell.html(0);
	}
	
	outcomesCell = $('#returnsTable tr:eq(3) td:eq(' + (i+1) + ')');
	outcomesCell.html(totalOutcomes[i]);


	if (totalPatientsPerYear[i])
	{
	    totalROI[i] = Math.ceil((totalOutcomes[i] - totalCosts[i]) / totalPatientsPerYear[i]);
	}
	else
	{
	    totalROI[i] = 0;
	}
	 
	roiCell = $('#returnsTable tr:eq(4) td:eq(' + (i+1) + ')');
	roiCell.html(totalROI[i]);

    }

}
