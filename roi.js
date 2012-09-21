Sections = new Meteor.Collection("sections");

if (Meteor.is_client) {

  Template.leftSidebar.sections = function () {
      return Sections.find({}, {sort: {name: 1}});
  };


Template.leftSidebar.events({
    'click': function () {
	Session.set("selected_tab", this._id);
	}
    });



}

if (Meteor.is_server) {
  Meteor.startup(function () {

      var names = ["Introduction",
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

