Template.Step_1.events({
    'click #calculateStep1':function() {    

	console.log("in function calculateStep1");
	

	//Total Patient Enrollment Row
	var initial = parseInt($('#initialEnroll').val());
	var target = parseInt($('#year5Enroll').val());
	
	var newHtml = '<td>' + initial + '</td>';
	var currCell = $('#enrollSummary tr:eq(1) td:eq(0)');
	for (year=1; year<6; year+=1){
            $(newHtml).insertAfter(currCell);
            var numPatients = initial + (((target-initial)/4)*year);
            newHtml = '<td>' + numPatients + '</td>'
            currCell = $('#enrollSummary tr:eq(1) td:eq(' + year +')');
	}
	
	//Concurrent Patient Enrollment Row

	var totalMonths = parseInt($('#monthsEnroll').val());
	var currPatientTot = $('#enrollSummary tr:eq(1) td:eq(1)').text();
	var currCell = $('#enrollSummary tr:eq(2) td:eq(0)');

	for (year=1; year<6; year+=1){
            var numPatients = (currPatientTot*totalMonths)/12;
            var newHtml = '<td>' + numPatients + '</td>';
            $(newHtml).insertAfter(currCell);
            
	    currCell = $('#enrollSummary tr:eq(2) td:eq(' + year + ')');
            currPatientTotObject = $('#enrollSummary tr:eq(1) td:eq(' + (year+1) + ')');
            currPatientTot = currPatientTotObject.text();
	};
	
	
	
    }
})


