
if (Meteor.isClient) {
////////BUY SECTION/////////////
Template.SelectEvent.events({
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "menuoption"});

	    },
	'submit form': function(event){
			event.preventDefault();
			 var EventAddress = event.target.eventAddress.value;
			Session.set('EventInstance',EventAddress);
			console.log(EventAddress);
			bookContractObject = web3.eth.contract(abi);
			bookContractInstance = bookContractObject.at(EventAddress);
	        BlazeLayout.render('main', {main: "Buyer"});


	}
});

}
