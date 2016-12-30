if (Meteor.isClient) {

Template.TicketLeft.helpers({
	ConcertName: function () {return bookContractInstance.name();},
});

Template.TicketLeft.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('main', {main: "SelectEvent"});
	},
	'submit form': function(event){
	    event.preventDefault();
	    var account = web3.eth.accounts[0];
	    var password = event.target.password.value;

	   	if(! web3.personal.unlockAccount(account,password)){
			alert('Account ' + account + 'cannot unlock');
		} else {
			alert('Account unlock!!!');
		}

		bookContractInstance.TicketLeft({},{from: account, gas: 100000});
		bookContractInstance.TicketVerified({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		alert("You have " + bookContractInstance.balanceOfTickets(account) + " ticket left. \n");
	    	}
	    });
	},
});

}
