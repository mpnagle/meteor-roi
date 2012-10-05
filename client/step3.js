Template.Step_3.newRowStep3FixedStaffing = function() {

 

   var typeStaff = $('<select></select>');
   typeStaff.append('<option value="management">Management</option>');
   typeStaff.append('<option value="support_staff">Support Staff</option>');
   typeStaff.append('<option value="other">Other</option>');
  $("#staffFixedType").append(typeStaff);
    


    var titleStaff = $("<input>", {
        type: 'text'
    });

    $('#staffFixedTitle').append(titleStaff);

    

   var percentStaff = $('<select></select>');
   percentStaff.append('<option value="100">100</option>');
   percentStaff.append('<option value="75">75</option>');
   percentStaff.append('<option value="50">50</option>');
   percentStaff.append('<option value="50">25</option>');
   percentStaff.append('<option value="50">0</option>');
   $('#staffFixedPercent').append(percentStaff);
 
   var salaryStaff = $("<input>", {
        type: 'text'
    });

    $('#staffFixedSalary').append(salaryStaff); 



}



Template.Step_3.newRowStep3VariableStaffing = function() {

    console.log('createRowStep3Variable');

   var typeStaffVariable = $('<select></select>');
    typeStaffVariable.append('<option value="clinical">Clinical</option>');
   typeStaffVariable.append('<option value="support_staff">Support Staff</option>');
   typeStaffVariable.append('<option value="other">Other</option>');
  $("#staffVarType").append(typeStaffVariable);
    


    var titleStaffVariable = $("<input>", {
        type: 'text'
    });
    $('#staffVarTitle').append(titleStaffVariable);

    

   var percentStaffVariable = $('<select></select>');
   percentStaffVariable.append('<option value="100">100</option>');
   percentStaffVariable.append('<option value="75">75</option>');
   percentStaffVariable.append('<option value="50">50</option>');
   percentStaffVariable.append('<option value="50">25</option>');
   percentStaffVariable.append('<option value="50">0</option>');
   $('#staffVarPercent').append(percentStaffVariable);
 
   var salaryStaffVariable = $("<input>", {
        type: 'text'
    });

    $('#staffVarSalary').append(salaryStaffVariable); 

   var staffPatientLoad = $("<input>", {
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
}
    });
