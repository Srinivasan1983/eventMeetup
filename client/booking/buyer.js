if (Meteor.isClient) {
// Mumin hack
Template.Buyer.helpers({
	eventName: function() {return bookContractInstance.name()},
	Host: function(){return bookContractInstance.hostName();},
	Place: function(){return bookContractInstance.place()},
	WithDrawalDeadline: function(){return bookContractInstance.withDrawalDeadline()},
	StartTime: function(){return bookContractInstance.startTime()},
	EndTime: function(){return bookContractInstance.endTime()},
	TicketPrice: function(){return bookContractInstance.ticketPrice()},
	TicketAvailable: function(){return bookContractInstance.ticketSupply()},
	ExtraInfo: function(){return bookContractInstance.extraInfo()},
});

Template.Buyer.events({
	'click .back': function(event){
			console.log(event)
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "menuoption"});

	    },
	'click .useTicket': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "TicketLeft"});

	    },
	'click .refund': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "ConfirmRefund"});

	    },

	'submit .buy':function(event){
		event.preventDefault();
		//session set a lot of things, not done
		Session.set('TicketNumber', event.target.ticketNumber.value);

		Session.set('Host',bookContractInstance.name());
		Session.set('Place',bookContractInstance.place());
		Session.set('StartTime',bookContractInstance.startTime().toString());
		Session.set('EndTime',bookContractInstance.endTime().toString());
		Session.set('TicketPrice',bookContractInstance.ticketPrice().toString());
		Session.set('TicketAvailable', bookContractInstance.ticketSupply().toString());
		BlazeLayout.render('main', {main: "ConfirmBuy"});
	},
	'submit .withdraw':function(event){
		event.preventDefault();
		Session.set('TicketNumber', event.target.ticketNumber.value);
		BlazeLayout.render('main', {main: "CancleBooking"});
	},
});

}
