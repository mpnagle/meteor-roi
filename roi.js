Sections = new Meteor.Collection("sections");

if (Meteor.isClient) {

  Template.leftSidebar.sections = function () {
      return Sections.find({}, {sort: {name: 1}});
  };


Template.leftSidebar.events({
    'click': function () {
	Session.set("selected_tab", this);
	Session.set("selected_id", this._id);
	console.log(this);
	Session.set("which_screen", Session.get("selected_tab").index);
	console.log("current index: " + Session.get("which_screen"));
    }
});

Template.tabs.selected = function () {
    return Session.equals("selected_id",this._id) ? "selected" : '';
    };

    
    
    Template.Step_0.show = function () {
	return Session.equals ("which_screen", 0);
    };


    Template.Step_1.show = function () {
	return Session.equals ("which_screen", 1);
    };

    Template.Step_2.show = function () {
	return Session.equals ("which_screen", 2);

    };

    Template.Step_3.show = function () {
	return Session.equals ("which_screen", 3);
    };


    Template.Step_4.show = function () {
	return Session.equals ("which_screen", 4);
    };

    Template.Step_5.show = function () {
	return Session.equals ("which_screen", 5);
    };

    
    Template.Form_1.events({
	
	'click button#submit_1': function(){
	    var enroll_1 = $('#Form_1 input#A1').val().trim();
	    var enroll_2 = $('#Form_1 input#A2').val().trim();
    	    var enroll_3 = $('#Form_1 input#A3').val().trim();

	    Session.set("A1", enroll_1);
	    Session.set("A2", enroll_2);
	    Session.set("A3", enroll_3);
	    
	    console.log("clicking button 1");
	    }




    });
    
    Template.Form_1.A1 = function () {
	return Session.get("A1") || "";
	} 

    Template.Form_1.cell2 = function () {
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = increment / 4;

	return parseInt(Session.get("A1")) + increment || "";

    }

    Template.Form_1.cell3 = function () {
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = increment / 4;

	return parseInt(Session.get("A1")) + 2*increment || "";

	}

    Template.Form_1.cell4 = function () {
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = increment / 4;

	return parseInt(Session.get("A1")) + 3*increment || "";

	}

    Template.Form_1.cell5 = function () {
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = increment / 4;
	
	return parseInt(Session.get("A1")) + 4*increment || "";
	
    }
    
    Template.Form_1.cell6 = function () {
	var multiplier = parseInt(Session.get("A3"));
	multiplier = multiplier / 12;

	
	return parseInt(Session.get("A1")) * multiplier || "";
	
    }

    
  Template.Form_1.cell7 = function () {    
	var multiplier = parseInt(Session.get("A3"));
	multiplier = multiplier / 12;
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = increment / 4;
	return (parseInt(Session.get("A1")) + increment) * multiplier || 
"";

	}

    Template.Form_1.cell8 = function () {
	var multiplier = parseInt(Session.get("A3"));
	multiplier = multiplier / 12;
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = 2 * increment / 4;
	return (parseInt(Session.get("A1")) + increment) * multiplier || 
"";

	}

    Template.Form_1.cell9 = function () {

		var multiplier = parseInt(Session.get("A3"));
	multiplier = multiplier / 12;
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = 3 * increment / 4;
	return (parseInt(Session.get("A1")) + increment) * multiplier || "";


	}

    Template.Form_1.cell10 = function () {

	var multiplier = parseInt(Session.get("A3"));
	multiplier = multiplier / 12;
 	var increment = parseInt(Session.get("A2")) - parseInt(Session.get("A1"));
	increment = increment ; // for consistency's sake
	return (parseInt(Session.get("A1")) + increment) * multiplier || "";


	}





}

if (Meteor.isServer) {
  Meteor.startup(function () {

      var names=  ["Introduction",
		   "Step 1 -- Patient Enrollment",
		   "Step 2 -- Technology",      
		   "Step 3 -- Staffing",
		   "Step 4 -- Other",
		   "Step 5 -- Outcomes",
		  ]; 
      
      Sections.remove({});
      
      for (var i = 0; i < names.length; i++)
      {
	  
	  Sections.insert({name: names[i], index:i});
	  console.log(i);
      }
      

      
  });
}

/*
Handlebars.global

if the end of step_# === index 
 true
else
 false

*/
