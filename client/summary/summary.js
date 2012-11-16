//results of screens 2 + 3 + 4
var totalCosts = [];

Template.Summary.InitializeSummary = function(){
    Meteor.defer(
	function(){
	    
	    Template.Summary.loadResults();
	});
}

Template.Summary.loadResults = function() {

    

    currentCellSummary = $('#totalSummary tr:eq(1) td:eq(0)');
    currentCellSummary.html('Total Tech Costs');



    currentCellSummary = $('#totalSummary tr:eq(2) td:eq(0)');
    currentCellSummary.html('Tech Costs Per Patient');





    for (i=0; i<5; i++)
    {
	costsCell = $('#totalSummary tr:eq(1) td:eq(' + (i+1) + ')');
	costsCell.html(totalTechCosts[i]);
	
	costsCellperPatient = $('#totalSummary tr:eq(2) td:eq(' + (i+1) + ')');

	if (enrolledPatientsPerYear[i])
	{
	    staffCostsPerPatient = Math.ceil(totalTechCosts[i] / enrolledPatientsPerYear[i]);
	    
	}
	else
	{
	    staffCostsPerPatient = 0;
	}
	
costsCellperPatient.html(staffCostsPerPatient);


    }


    //totalStaffSummary section
    currentCell = $('#totalSummary tr:eq(3) td:eq(0)');
    currentCell.html("Total Staff Costs");
    
    currentCell = $('#totalSummary tr:eq(4) td:eq(0)');
    currentCell.html('Staff Costs Per Patient');

    for (i=0; i<5; i++)
    {
	costsCell = $('#totalSummary tr:eq(3) td:eq(' + (i+1) + ')');
	costsCell.html(totalStaffCosts[i]);
	
	costsCellperPatient = $('#totalSummary tr:eq(4) td:eq(' + (i+1) + ')');
	
	if(enrolledPatientsPerYear[i])
	{
	    techCostsPerPatient = Math.ceil(totalStaffCosts[i] / enrolledPatientsPerYear[i]);
	}
	else
	{
	    techCostsPerPatient = 0;
	}

	costsCellperPatient.html(techCostsPerPatient);
    }


    //totalMiscCosts section
    currentCell = $('#totalSummary tr:eq(5) td:eq(0)');
    currentCell.html("Total Miscellaneous Costs");
    
    currentCell = $('#totalSummary tr:eq(6) td:eq(0)');
    currentCell.html('Miscellaneous Costs Per Patient');

    for (i=0; i<5; i++)
    {
	costsCell = $('#totalSummary tr:eq(5) td:eq(' + (i+1) + ')');
	costsCell.html(totalMiscCosts[i]);
	
	costsCellperPatient = $('#totalSummary tr:eq(6) td:eq(' + (i+1) + ')');
	
	if (enrolledPatientsPerYear[i])
	{
	    miscCostsPerPatient = Math.ceil(totalMiscCosts[i] / enrolledPatientsPerYear[i]);
	}
	else
	{
	    miscCostsPerPatient = 0;
	}
	costsCellperPatient.html(miscCostsPerPatient);
    }



    //totalCosts section
    currentCell = $('#totalSummary tr:eq(7) td:eq(0)');
    currentCell.html("Total Costs");
    
    currentCell = $('#totalSummary tr:eq(8) td:eq(0)');
    currentCell.html('Costs Per Patient');

    for (i=0; i<5; i++)
    {
	totalCosts[i]= totalTechCosts[i] + totalStaffCosts[i] + totalMiscCosts[i];



	costsCell = $('#totalSummary tr:eq(7) td:eq(' + (i+1) + ')');
	costsCell.html(totalCosts[i]);
	

	costsCellperPatient = $('#totalSummary tr:eq(8) td:eq(' + (i+1) + ')');

	if (enrolledPatientsPerYear[i])
	{
	    CostsPerPatient = Math.ceil(totalCosts[i] / enrolledPatientsPerYear[i]);
	}
	else
	{
	    CostsPerPatient = 0;
	}


	costsCellperPatient.html(CostsPerPatient);
    }





}

