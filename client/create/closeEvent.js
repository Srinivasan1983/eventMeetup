if (Meteor.isClient) {

Template.CloseEvent.helpers({
	eventName: function () {return sellContractInstance.name();},
});

Template.CloseEvent.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('main', {main: "YourExistingConcert"});
	},
	'submit form': function(event){
	    event.preventDefault();
	    var account = web3.eth.accounts[0];
	//    var password = event.target.password.value;

	//   	if(! web3.personal.unlockAccount(account,password)){
	//		alert('Account ' + account + 'cannot unlock');
//		} else {
//			alert('Account unlock!!!');
//		}

		sellContractInstance.closeEvent({},{from: account, gas: 100000});
		sellContractInstance.CloseEvent({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		alert("You concert is " + log.args.stateName + " \n");
	    	}
	    });
	},
});

}
