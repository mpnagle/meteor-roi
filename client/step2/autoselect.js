Meteor.defer(function(){

    $(".selectTechOne").css("background-color","red");
    
   


    console.log("in autoselect.js");

    console.log($('.selectTechOne'));


  
});


Template.Step_2.rendered = function(){

//  $('#one_time_costs').css("backgroundColor","red");

 //   $('.selectTechOne').css("backgroundColor","red");

    $('#techOneType0').change(function(){
	console.log("testing .change() on .selectTechOne");
    });

  //  $('#techOneType0').html("html change?");

};


/*    $('.selectTechOne').on('mouseover', function() {
	
	console.log("click click bitch");});
*/
