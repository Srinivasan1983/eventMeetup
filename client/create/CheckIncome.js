if (Meteor.isClient) {

Template.GetIncome.helpers({
	eventName: function () {return sellContractInstance.name();},
});

Template.GetIncome.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('main', {main: "YourExistingEvents"});
	},
	'submit form': function(event){
	    event.preventDefault();
      //web3.eth.defaultAccount = web3.eth.accounts[0];
	    //var account = web3.eth.accounts[0];
	  //  var password = event.target.password.value;

	   //	if(! web3.personal.unlockAccount(account,password)){
		//	alert('Account ' + account + 'cannot unlock');
	//	} else {
	//		alert('Account unlock!!!');
	//	}

		sellContractInstance.getIncome({},{from: account, gas: 100000});
    console.log(account);
    //console.log(eventAddress);
    //Session.get('eventInstance');
		sellContractInstance.MoneyTransfer({},{address:account}).watch(function(error, log){
			alert("ss");
	    	if (!error) {
	    		var sellContractAddress = sellContractInstnace.address
	    		alert("You sold " + log.args.ticketSold + " tickets \n" +
	    		"Total " + log.args.totalTicketUsed + "tickets is used!\n" +
	    		"Claim " + log.args.contractBalance + " ether \n" +
	    		"Your event is Inactive now.\n");
	    	}
				else {

					alert("error");
				}


	    });
	},
});

}
