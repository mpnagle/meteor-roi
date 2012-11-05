dataSets = new Meteor.Collection("datasets");

Meteor.methods({
    
    saveUser: function(options){
	options = options || {}

	
	    console.log('Testing saveUser. options: ');
	    console.log(options);
	    
	console.log("this.userId: ");
	console.log(this.userId);
	    //if you can't find the user, insert
	    

//	    console.log("in saveUser");
	
	if (!dataSets.findOne({owner:this.userId}))
	{
	    console.log("in the new user part of saveUser");
	    dataSets.insert({
		owner: this.userId,
		totalPatients: options.totalPatientsPerYear,
		enrolledPatients: options.enrolledPatientsPerYear,
		totalMonths: options.totalMonths,
		initial: options.initial,
		target: options.target,
		oneTimeData: options.oneTimeData,
		recurData: options.recurData,
		patientsOnCellular: options.patientsOnCellular, 
		totalOneTimeCosts: totalOneTimeCosts,
		totalRecurCosts: totalRecurCosts,
		totalTechCosts: totalTechCosts
		
	    });
	    console.log("current dataSet document after dataSets.insert");
	    	    console.log(dataSets.findOne({owner:this.userId}));
	}
	

	//else update the existing document
	else
	{
	    console.log(" in the autoupdate part of saveUser");
	    var currentData = dataSets.findOne({owner:this.userId});
	    

	    
	    console.log("currentData._id in model.js");
	    console.log(currentData._id);
	    
	    dataSets.update(currentData._id, 
			    {$set: 
			     {		totalPatients: options.totalPatientsPerYear,
					enrolledPatients: options.enrolledPatientsPerYear,
					totalMonths: options.totalMonths,
					initial: options.initial,
					target: options.target,
					oneTimeData: options.oneTimeData,
					recurData: options.recurData,
					patientsOnCellular: options.patientsOnCellular,
					totalOneTimeCosts: options.totalOneTimeCosts,
					totalRecurCosts: options.totalRecurCosts,
					totalTechCosts: options.totalTechCosts
			     }
			    }
			   );

	    /*var tempData = dataSets.findOne({owner:this.userId});
	    console.log("options: ");
	    console.log(options);
	    
	    console.log("options.initial: ");
	    console.log(options.initial);
	    
	    console.log("tempData.initial: ");
	    console.log(tempData.initial);
*/

	}
		    
	

	
    
    
    },
	       
    loadUser: function(userId){
	currentData = dataSets.findOne({owner:userId});
	
	console.log("userId in model.js is");
	console.log(userId);
	
	console.log("in loadUser in model.js");
	console.log(currentData);
	totalPatientsPerYear = currentData.totalPatients;
	enrolledPatientsPerYear = currentData.enrolledPatients;
	totalMonths = currentData.totalMonths;

	initial = currentData.initial;
	target =  currentData.target;

	oneTimeData = currentData.oneTimeData;

	recurData = currentData.recurData;
	
	patientsOnCellular = currentData.patientsOnCellular;
	totalOneTimeCosts = currentData.totalOneTimeCosts;
	totalRecurCosts = currentData.totalRecurCosts;
	totalTechCosts = currentData.totalTechCosts;

    }
	       
    
    


});


