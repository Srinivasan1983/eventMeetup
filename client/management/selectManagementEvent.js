if (Meteor.isClient) {

	Template.SelectManagementEvent.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "Home"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var eventAddress = event.target.SelectManagementEvent.value;
			Session.set('ConcertInstance',eventAddress);
			superviseContractObject = web3.eth.contract(abi)
			superviseContractInstance = superviseContractObject.at(eventAddress);
	        BlazeLayout.render('main', {main: "monitorEvent"});


	}
});

}
