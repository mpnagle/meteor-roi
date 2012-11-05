Template.Sensitivity.initializeSensitivity = function(){
    Meteor.defer(
	function(){
	    
	    Template.Sensitivity.loadSliders();
	    Template.Sensitivity.loadTooltips();
	    Template.Sensitivity.sliderResults();
	});
}



Template.Sensitivity.loadSliders = function(){
    
    var sliders = [];
    
    for(i=0; i<=4; i++)
    {
	sliders[i] = $('#slider' + i).slider({
    	    orientation: "horizontal",
	    slide: Template.Sensitivity.sliderResults,
	    change: Template.Sensitivity.sliderResults,
	    min: 0,
	    max: 100,
	    value: 100
	});

    }
 	
}

Template.Sensitivity.sliderResults = function() {
    
   //get and display slider values as percent change
    var sliderValues = [];
    
    for (i=0; i<=4; i++)
    {
	sliderValues[i] = $('#slider' + i).slider("value");
	$('#sliderValue' + i).html(sliderValues[i]);
    }
    

    // get original values from rest of calculator
    var originalValues = [];

    originalValues[0] = enrolledPatientsPerYear[4];

    originalValues[1] = (Math.ceil( totalTechCosts[4] / enrolledPatientsPerYear[4]) || 0);

    originalValues[2] = (Math.ceil (totalStaffCosts[4] / enrolledPatientsPerYear[4]) || 0);

    originalValues[3] = (Math.ceil (totalMiscCosts[4] / enrolledPatientsPerYear[4]) || 0);

    originalValues[4] = (Math.ceil (totalOutcomes[4] / enrolledPatientsPerYear[4]) || 0);


    console.log(enrolledPatientsPerYear[4]);
    console.log(originalValues[1]);
    
    for (i=0; i<5; i++)
    {
	$('#originalValue' + i).html(originalValues[i]);
	
    }

    
    // compute new values
    
    var newValues = [];
    
    for (i=0; i<5; i++)
    {
	newValues[i] = (sliderValues[i] * originalValues[i] / 100);
	$('#newValue' + i).html(newValues[i]);
    }


}


Template.Sensitivity.loadTooltips = function() {
    $('#sensitivityResults').tooltip({
       content: "test"

    });

//    $('#sensitivityResults').html("test!");
    console.log("in loadTooltips");



}
