if (Meteor.isClient) {

////////BUY SECTION/////////////
Template.SellerManagement.events({
	'click .back': function(event){
			console.log(event)
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "menuoption"});
	    },
	'click .sell': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "create"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var eventAddress = event.target.eventAddress.value;
			Session.set('eventInstance',eventAddress);

			sellContractObject = web3.eth.contract(abi);

			sellContractInstance = sellContractObject.at(eventAddress);
      
	        BlazeLayout.render('main', {main: "YourExistingEvents"});
	}
});

}
