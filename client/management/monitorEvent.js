if (Meteor.isClient) {

Template.monitorEvent.helpers({
	ConcertName: function () {return superviseContractInstance.name();},
});

Template.monitorEvent.events({
	'click .back': function(event){
	    event.preventDefault();
	    BlazeLayout.render('main', {main: "SelectManagementEvent"});

	    },
	'click .yes':function(event){
		event.preventDefault();
		Session.set('confirmSignal',true);
		BlazeLayout.render('main', {main: "ConfirmEvent"});
	},
	'click .no': function(event){
		event.preventDefault();
		Session.set('confirmSignal',false);
		BlazeLayout.render('main', {main: "ConfirmEvent"});
	}
});

}
