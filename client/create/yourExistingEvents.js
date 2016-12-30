if (Meteor.isClient) {

Template.YourExistingEvents.helpers({
	eventName: function() {return sellContractInstance.name()},
	Host: function(){return sellContractInstance.hostName()},
	Place: function(){return sellContractInstance.place()},
	WithDrawalDeadline: function(){return sellContractInstance.withDrawalDeadline()},
	StartTime: function(){return sellContractInstance.startTime()},
	EndTime: function(){return sellContractInstance.endTime()},
	TicketPrice: function(){return sellContractInstance.ticketPrice()},
	TicketAvailable: function(){return sellContractInstance.ticketSupply()},
	eventState: function(){return sellContractInstance.state()},
	ExtraInformation : function(){return sellContractInstance.extraInfo()},

});
////////BUY SECTION/////////////
Template.YourExistingEvents.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "SellerManagement"});

	    },
	'click .startConcert': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "StartConcert"});

	    },
	'click .closeConcert': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "CloseEvent"});

	    },
	'click .getIncome': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "GetIncome"});

	    },
	'click .cancelConcert': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "CancelEvent"});

	    },

	});
}
