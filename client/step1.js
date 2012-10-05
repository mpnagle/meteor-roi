var summaryEmpty = true; //flag for enrollment summary state

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
    for (year=2; year<6; year+=1){
//        $(newHtml).insertAfter(currCell);
        currCell = $('#enrollSummary tr:eq(1) td:eq(' + year +')');
        console.log('curr cell html');
        console.log($(currCell.html()));
        var numPatients = initial + (((target-initial)/4)*year);
        currCell.html(Math.floor(numPatients));
  //      newHtml = '<td>' + numPatients + '</td>'

    }
    
    //Concurrent Patient Enrollment Row

    var totalMonths = parseInt($('#monthsEnroll').val());
    var currPatientTot = $('#enrollSummary tr:eq(1) td:eq(1)').text();

    for (year=1; year<6; year+=1){
	currCell = $('#enrollSummary tr:eq(2) td:eq(' + year + ')');
        var numPatients = (currPatientTot*totalMonths)/12;
        currCell.html(Math.floor(numPatients));
        currPatientTotObject = $('#enrollSummary tr:eq(1) td:eq(' + (year+1) + ')');
        currPatientTot = currPatientTotObject.text();
    }


}







