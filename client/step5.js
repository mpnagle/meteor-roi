Template.Step_5.addRowOutcomes = function() {

var outcomesChange = $('<select></select>');
outcomesChange.append('<option value="hospitalizations">All Inpatient Hospitalizations</option>');
outcomesChange.append('<option value="readmissions">30-day readmissions</option>');
outcomesChange.append('<option value="nursing_visits">Nursing Visits/option>');
outcomesChange.append('<option value="other">Other</option>');
$('#outcomesChange').append(outcomesChange);



var outcomesType = $('<select></select>');
outcomesType.append('<option value="percent_change">% Change</option>');
outcomesType.append('<option value="num_value_patient"># Value / Patient</option>');
outcomesType.append('<option value="other">Other</option>');
outcomesType.append('<option value="n_a">N/A</option>');
$('#outcomesType').append(outcomesType);

var outcomesAmount =$("<input>", {
    type: 'text'
});
$('#outcomesAmount').append(outcomesAmount);

var outcomesRisk = $('<select></select>');
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
    }
});


Template.Step_5.InitializeStep5 = function(){
    Meteor.defer(
	function(){
	    Template.Step_5.addRowOutcomes();
	});
}

