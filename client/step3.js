// rowIndex keeps track of what we are adding. The total number of rows is rowIndex + 1.
// We start with -1 so that when we increment we're at 0.
var rowIndexFixedStaffing = -1;
var rowIndexVarStaffing = -1;

var fixedStaffData = [];
var variableStaffData = [];

var fixedStaffCosts = [0,0,0,0,0];
var variableStaffCosts = [0,0,0,0,0];

//var totalStaffCosts = [0,0,0,0,0];

//for debugging only
var totalStaffCosts = [25000,25000,25000,25000,25000];

Template.Step_3.newRowStep3FixedStaffing = function() {

  
   // incrementing what row number we're on when we make a new row, starting with 0.

   rowIndexFixedStaffing += 1;

   var typeStaff = $('<select id=typeStaff' + rowIndexFixedStaffing + ' > </select>');
   typeStaff.append('<option value="management">Management</option>');
   typeStaff.append('<option value="support_staff">Support Staff</option>');
   typeStaff.append('<option value="other">Other</option>');
  $("#staffFixedType").append(typeStaff);
    


    var titleStaff = $("<input id=titleStaff" + rowIndexFixedStaffing + " >" , {
        type: 'text'
    });

    $('#staffFixedTitle').append(titleStaff);

    
   var percentStaff = $('<select id=percentStaff' + rowIndexFixedStaffing + ' > </select>');
   percentStaff.append('<option value="100">100</option>');
   percentStaff.append('<option value="75">75</option>');
   percentStaff.append('<option value="50">50</option>');
   percentStaff.append('<option value="50">25</option>');
   percentStaff.append('<option value="50">0</option>');
   $('#staffFixedPercent').append(percentStaff);
 
   var salaryStaff = $("<input id=salaryStaff" + rowIndexFixedStaffing + ">", {
        type: 'text'
    });

    $('#staffFixedSalary').append(salaryStaff); 



}



Template.Step_3.newRowStep3VariableStaffing = function() {

   rowIndexVarStaffing += 1;
    



   var typeStaffVariable = $('<select id=typeStaffVariable' + rowIndexVarStaffing + '></select>');
   typeStaffVariable.append('<option value="clinical">Clinical</option>');
   typeStaffVariable.append('<option value="support_staff">Support Staff</option>');
   typeStaffVariable.append('<option value="other">Other</option>');
  $("#staffVarType").append(typeStaffVariable);
    


    var titleStaffVariable = $("<input id=titleStaffVariable" + rowIndexVarStaffing + ">", {
        type: 'text'
    });
    $('#staffVarTitle').append(titleStaffVariable);

    

   var percentStaffVariable = $('<select id=percentStaffVariable' + rowIndexVarStaffing + '></select>');
   percentStaffVariable.append('<option value="100">100</option>');
   percentStaffVariable.append('<option value="75">75</option>');
   percentStaffVariable.append('<option value="50">50</option>');
   percentStaffVariable.append('<option value="50">25</option>');
   percentStaffVariable.append('<option value="0">0</option>');
   $('#staffVarPercent').append(percentStaffVariable);
 
   var salaryStaffVariable = $("<input id=salaryStaffVariable" + rowIndexVarStaffing + ">", {
        type: 'text'
    });

    $('#staffVarSalary').append(salaryStaffVariable); 

   var staffPatientLoad = $("<input id=staffPatientLoad" + rowIndexVarStaffing + ">", {
        type: 'text'
    });


    $('#staffPatientLoad').append(staffPatientLoad); 

}

Template.Step_3.events({
'click #addRowFixedStaff': function() {
    
    Template.Step_3.newRowStep3FixedStaffing();

},

'click #addRowVariableStaff': function() {
    Template.Step_3.newRowStep3VariableStaffing();
},

'click #submitStep3': function() {
    Template.Step_3.getDataStep3();
},

'click #calculate3': function() {
    Template.Step_3.calculateStep3();
}


    });



Template.Step_3.InitializeStep3 = function(){

    //setting number of Rows in each matrix to 0 to start.
    


    //adding in the first row once the DOM has loaded via Meteor.defer
    Meteor.defer(
	function(){
	    Template.Step_3.newRowStep3FixedStaffing();
	    Template.Step_3.newRowStep3VariableStaffing();
	});
}


Template.Step_3.getDataStep3 = function(){

    console.log("rowIndexFixedStaffing is " + rowIndexFixedStaffing);
  
    var numRowsFixedStaffing = rowIndexFixedStaffing + 1;
    var numRowsVariableStaffing = rowIndexVarStaffing + 1;
    
    fixedStaffData = [];
    variableStaffData = [];
    
    for (i=0; i< numRowsFixedStaffing; i++)
    {
	
	currentRow = ["","","",""];
		
	currentRow[0] = $('#typeStaff' + i).val();
   	currentRow[1] = $('#titleStaff' + i).val();
        currentRow[2] = $('#percentStaff' + i).val();
        currentRow[3] = $('#salaryStaff' + i).val();




	
	//adding currentRow to the fixedStaffData matrix
	fixedStaffData.push(currentRow);
	//console.log(fixedStaffData);
	
    }


    
    //loading variableStaffData
    for (i=0; i< numRowsVariableStaffing; i++)
    {
	
	currentRow = ["","","","",""];
		
	currentRow[0] = $('#typeStaffVariable' + i).val();
   	currentRow[1] = $('#titleStaffVariable' + i).val();
        currentRow[2] = $('#percentStaffVariable' + i).val();
        currentRow[3] = $('#salaryStaffVariable' + i).val();
	currentRow[4] = $('#staffPatientLoad' + i).val();

//	console.log("First entry + " + currentRow[0] + " 2nd " + currentRow[1] + " 3rd " + currentRow[2] + " 4th " + currentRow[3]);

	
	//adding currentRow to the fixedStaffData matrix
	variableStaffData.push(currentRow);
	//console.log(variableStaffData);
	
    }



}


Template.Step_3.calculateStep3 = function () {


    Template.Step_3.getDataStep3();
    
    //fixedStaffCosts is an array for years 1 - 5, starting at $0 for each year.
    fixedStaffCosts = [0,0,0,0,0];
    variableStaffCosts = [0,0,0,0,0];
    
    //iterating through fixedStaffData  
    for (i=0; i<fixedStaffData.length; i++)
    {
	console.log("in cost loop --- " + i);
	console.log("fixedStaffData length" + fixedStaffData.length);
	
	currentPercent = parseInt(fixedStaffData[i][2]);
	currentSalary = parseInt(fixedStaffData[i][3]);
	
	currentCost = currentPercent * currentSalary / 100;
	
	
	costFiveYearArray = [];
	for (j=0; j<5; j++)	{
	    costFiveYearArray.push(currentCost);
	}

	console.log("costFiveYearArray is " + costFiveYearArray);
	
	for (k=0; k<5; k++)	{
	    fixedStaffCosts[k] += costFiveYearArray[k];
	}

	
	


    }
    

    console.log("variableStaffData.length: " + variableStaffData.length);
    //iterating over rows
    for (i=0; i<variableStaffData.length; i++)
    {
	
	
	currentPercent = parseInt(variableStaffData[i][2]);
	currentSalary = parseInt(variableStaffData[i][3]);
	costPerEmployee = currentPercent * currentSalary / 100;
	

	
	patientsPerEmployee = parseInt(variableStaffData[i][4]);
	
	console.log("patientsPerEmployee: " + patientsPerEmployee);
	
	//iterating over years
	for (year=0; year<5; year++)
	{
	    
	    employeesNeeded = Math.ceil(enrolledPatientsPerYear[year] / patientsPerEmployee);
	    costPerStaffer = costPerEmployee * employeesNeeded;
	    variableStaffCosts[year] += costPerStaffer;
	    
	    console.log("enrolledPatientsPerYear[year]: " + enrolledPatientsPerYear[year]);
	    console.log("patientsPerEmployee: " + patientsPerEmployee);
	    console.log("employeesNeeded: " + employeesNeeded);
	    console.log("costPerStaffer: " + costPerStaffer);

	    



	}
	

    }


    
    
    //totalStaffCosts

    for (k=0; k<5; k++)
    {
	if (!fixedStaffCosts[k])
	{
	    fixedStaffCosts[k]=0;
	}
	if (!variableStaffCosts[k])
	{
	    variableStaffCosts[k]=0;
	}
	
	totalStaffCosts[k] = fixedStaffCosts[k] + variableStaffCosts[k];
    }

    console.log(totalStaffCosts);



    
}
