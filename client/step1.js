var summaryEmpty = true; //flag for enrollment summary state

//global variables throughout the calculator
//var totalPatientsPerYear = [0,0,0,0,0]; //array for total patients, year 1 - 5
//var enrolledPatientsPerYear = [0,0,0,0,0]; //array for currently enrolled patients, year 1 - 5
//var totalMonths = 0; //number for capturing # of months the program runs


//for testing only -- sample initialization data
var totalPatientsPerYear = [100,200,300,400,500];
var enrolledPatientsPerYear = [50,100,150,200,250];
var totalMonths = 6;


Template.Step_1.events({
    'click #calculateStep1':function() {    
        updateSummary();
    }
});


function updateSummary(){
    //Total Patient Enrollment Row
    var initial = parseInt($('#initialEnroll').val());
    var target = parseInt($('#year5Enroll').val());
    
    var newHtml = '<td>' + initial + '</td>';
    currCell = $('#enrollSummary tr:eq(1) td:eq(1)');
    currCell.html(Math.floor(initial));

    totalPatientsPerYear[0] = initial;

    for (year=2; year<6; year+=1){
//        $(newHtml).insertAfter(currCell);
        currCell = $('#enrollSummary tr:eq(1) td:eq(' + year +')');
        console.log('curr cell html');
        console.log($(currCell.html()));
        var numPatients = initial + ((target-initial)/4)*(year-1);
        currCell.html(Math.floor(numPatients));


	totalPatientsPerYear[(year-1)] = Math.floor(numPatients);
    }
    

    console.log(totalPatientsPerYear);

    //Concurrent Patient Enrollment Row

    var totalMonths = parseInt($('#monthsEnroll').val());
    var currPatientTot = $('#enrollSummary tr:eq(1) td:eq(1)').text();

    for (year=1; year<6; year+=1){
	currCell = $('#enrollSummary tr:eq(2) td:eq(' + year + ')');
	
	var numPatients = (currPatientTot*totalMonths)/12;
        currCell.html(Math.floor(numPatients));
        
	enrolledPatientsPerYear[(year-1)] = Math.floor(numPatients);
	
	currPatientTotObject = $('#enrollSummary tr:eq(1) td:eq(' + (year+1) + ')');
        currPatientTot = currPatientTotObject.text();
   }

console.log(enrolledPatientsPerYear);    


}







