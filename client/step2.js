Template.Step_2.newRowStep2OneTimeCosts = function() {
    console.log('createRowPage2');
    var typeTech = $('<select></select>');
    typeTech.append('<option value="med"">Medical Devices (Purchased)</option>');
    typeTech.append('<option value="infra">Infrastructure</option>');
    typeTech.append('<option value="other">Other</option>');
    $("#techOneType").append(typeTech);

    console.log($("#techOneType"));

    var cost = $("<input>", {
        type: 'text'
    });
    $('#techOneCost').append(cost);

    var classTech = $('<select></select>');
    classTech.append('<option value="shelf">Shelf Life</option>');
    classTech.append('<option value="amortize">Amortize</option>');
    $('#techOneClass').append(classTech);

    var techTime = $("<input>", {
        type: 'text'
    });
    $('#techOneTime').append(techTime);
}


Template.Step_2.newRowStep2RecurCosts = function() {
    var typeTech = $('<select></select>');
    typeTech.append('<option value="hardware_rent">Hardware(Rent.)</option>');
    typeTech.append('<option value="data_cellular">Data Cost - Cellular</option>');
    typeTech.append('<option value="data_landline">Data Cost - Landline</option>');
    typeTech.append('<option value="data_other">Data Cost - Other</option>');
    typeTech.append('<option value="shipping">Shipping / Refurbishing</option>');
    typeTech.append('<option value="server">Server / Hosting</option>');
    typeTech.append('<option value="misc_tech">Misc. Tech Fees</option>');
    $('#techRecurType').append(typeTech);

    var techCost = $("<input>", {
        type: 'text'
    });
    $('#techRecurCost').append(techCost);

    var techFreq = $('<select></select>');
    techFreq.append('<option value="annual">Annual</option>');
    techFreq.append('<option value="monthly_unit">Monthly/Unit</option>');
    techFreq.append('<option value="monthly_patient">Monthly/Patient</option>');
    techFreq.append('<option value="yearly_unit">Yearly/Unit</option>');
    techFreq.append('<option value="yearly_patient">Yearly/Patient</option>');
    techFreq.append('<option value="one_time_patient">One Time/Patient</option>');
    $('#techRecurFreq').append(techFreq);
}


//Meteor.startup(function(){
//    newRowStep2OneTimeCosts();
//    newRowStep2RecurCosts();
//
//    });






Template.Step_2.events({
    
        'click #addRowOneTech': function(){
	    Template.Step_2.newRowStep2OneTimeCosts();
	},

        'click #addRowRecurringTech': function(){
	        Template.Step_2.newRowStep2RecurCosts();
	},

	'click #calculateStep2': function(){
	    
	    
	
	    var cost1 = parseInt($('#cost1').val());
	    var type1 = $('#type1').val();
	    var class1 = $('#class1').val();
	    var time1 = parseInt($('#time1').val());
	    
	    
	    $('ul#calculation3').append("<li> "+ "First row: " + cost1 + " " + type1 + " " + class1 + " " + time1 + "</li>");
	    
	    
	    var costRecur1 = parseInt($('#costRecur1').val());
	    var typeRecur1 = $('#typeRecur1').val();
	    var freq1 = $('#freq1').val();
	    var percentCell = parseInt($('#percentCell').val());
	
	    $('ul#calculation3').append("<li> " + "Second row: " + costRecur1 + " " + typeRecur1 + " " + freq1 + " " + percentCell);
	    
	    console.log("clicking in step2.js");


	}
    
});


Template.Step_2.InitializeStep2 = function(){
    Meteor.defer(
	function(){
	    Template.Step_2.newRowStep2OneTimeCosts();
	    Template.Step_2.newRowStep2RecurCosts();
	});
}
