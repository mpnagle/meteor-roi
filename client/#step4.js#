Template.Step_4.newRowMiscCosts= function() {
    var miscType = $('<select></select>');
    miscType.append('<option value="misc_fees">Misc. Tech Fees</option>');
    miscType.append('<option value="services">Services</option>');
    miscType.append('<option value="subscriptions">Subscriptions</option>');
    miscType.append('<option value="other">Other</option>');
    $('#miscType').append(miscType);

    var miscCost = $("<input>", {
        type: 'text'
    });
    $('#miscCost').append(miscCost);

    var miscFreq = $('<select></select>');
    miscFreq.append('<option value="annual">Annual</option>');
    miscFreq.append('<option value="monthly_unit">Monthly/Unit</option>');
    miscFreq.append('<option value="monthly_patient">Monthly/Patient</option>');
    miscFreq.append('<option value="yearly_unit">Yearly/Unit</option>');
    miscFreq.append('<option value="yearly_patient">Yearly/Patient</option>');
    miscFreq.append('<option value="one_time_patient">One Time/Patient</option>');
    $('#miscFreq').append(miscFreq);

}

//initialize
//newRowMiscCosts();


Template.Step_4.events({

    'click #addRowMisc':function() {
    Template.Step_4.newRowMiscCosts();
	}
    });

Template.Step_4.InitializeStep4 = function(){
    Meteor.defer(
	function(){
	    Template.Step_4.newRowMiscCosts();
	});
}
