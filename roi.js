Sections = new Meteor.Collection("sections");

if (Meteor.isClient) {

  Template.leftSidebar.sections = function () {
      return Sections.find({}, {sort: {name: 1}});
  };


Template.leftSidebar.events({
    'click': function () {

	Session.set("selected_id", this._id);
	Session.set("which_screen", this.index);
	console.log("which_screen: " + this.index);
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

    Template.Summary.show = function () {
    return Session.equals ("which_screen", 6);

    };

    Template.returnOnInvestment.show = function () {
	return Session.equals ("which_screen", 7);
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
		   "Summary",
		   "Total Return On Investment"
		  ]; 
      
      Sections.remove({});
      
      for (var i = 0; i < names.length; i++)
      {
	  
	  Sections.insert({name: names[i], index:i});
	  console.log(i);
      }
      

      
  });
}
