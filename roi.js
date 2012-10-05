Sections = new Meteor.Collection("sections");

if (Meteor.isClient) {

  Template.leftSidebar.sections = function () {
      return Sections.find({}, {sort: {name: 1}});
  };


Template.leftSidebar.events({
    'click': function () {
//	Session.set("selected_tab", this);
	Session.set("selected_id", this._id);
	console.log(this);
	Session.set("which_screen", this.index);
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
