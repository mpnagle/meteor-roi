var summaryEmpty = true; //flag for enrollment summary state

//global variables throughout the calculator
var totalPatientsPerYear = [0,0,0,0,0]; //array for total patients, year 1 - 5
var enrolledPatientsPerYear = [0,0,0,0,0]; //array for currently enrolled patients, year 1 - 5
var totalMonths = 0; //number for capturing # of months the program runs


//initial data inputs
var initial = 0;
var target = 0;





Template.Step_1.events({
    'click #calculateStep1':function() {    
        updateSummary();
    },

    'click #saveDataTest':function() {
	Meteor.call('saveUser', {
	    totalPatientsPerYear: totalPatientsPerYear,
	    enrolledPatientsPerYear: enrolledPatientsPerYear,
	    totalMonths: totalMonths,
	    "initial": initial,
	    target: target,
	    oneTimeData: oneTimeData,
	    recurData: recurData,
	    patientsOnCellular: patientsOnCellular,
	   
	    totalOneTimeCosts: totalOneTimeCosts,
	    totalRecurCosts: totalRecurCosts,
	    totalTechCosts: totalTechCosts
	    
	});
	
	console.log("recurData: ");
	console.log(recurData);


    }
    
});


Template.Step_1.initializeStep1 = function() {
    Meteor.defer(
	function(){
	    Template.Step_1.loadDataStep1();
	});
	
	

    }


Template.Step_1.loadDataStep1 = function() {
    
    console.log("in loadDataStep1");

    console.log("initial is " + initial);

    $('#initialEnroll').val(initial);
    $('#year5Enroll').val(target);
    $('#monthsEnroll').val(totalMonths);

}



function updateSummary(){
    //Total Patient Enrollment Row
    initial = parseInt($('#initialEnroll').val());
    target = parseInt($('#year5Enroll').val());
    
    var newHtml = '<td>' + initial + '</td>';
    currCell = $('#enrollSummary tr:eq(1) td:eq(1)');
    currCell.html(Math.floor(initial));

    totalPatientsPerYear[0] = initial;

    for (year=2; year<6; year+=1){

        currCell = $('#enrollSummary tr:eq(1) td:eq(' + year +')');

//        console.log($(currCell.html()));
        var numPatients = initial + ((target-initial)/4)*(year-1);
        currCell.html(Math.floor(numPatients));


	totalPatientsPerYear[(year-1)] = Math.floor(numPatients);
    }
    

    console.log(totalPatientsPerYear);

    //Concurrent Patient Enrollment Row

    totalMonths = parseInt($('#monthsEnroll').val());
    var currPatientTot = $('#enrollSummary tr:eq(1) td:eq(1)').text();

    for (year=1; year<6; year+=1){
	currCell = $('#enrollSummary tr:eq(2) td:eq(' + year + ')');
	
	var numPatients = (currPatientTot*totalMonths)/12;
        currCell.html(Math.floor(numPatients));
        
	enrolledPatientsPerYear[(year-1)] = Math.floor(numPatients);
	
	currPatientTotObject = $('#enrollSummary tr:eq(1) td:eq(' + (year+1) + ')');
        currPatientTot = currPatientTotObject.text();
   }




}







