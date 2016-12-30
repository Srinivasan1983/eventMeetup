if (Meteor.isClient) {

Template.StartConcert.helpers({
	eventName: function () {return sellContractInstance.name();},
});

Template.StartConcert.events({
	'click .back': function(event){
		event.preventDefault();
	        BlazeLayout.render('main', {main: "YourExistingConcert"});
	},
	'submit form': function(event){
	    event.preventDefault();
	    //var account = web3.eth.accounts[0];
	  //  var password = event.target.password.value;

	   //	if(! web3.personal.unlockAccount(account,password)){
		//	alert('Account ' + account + 'cannot unlock');
	//	} else {
	//		alert('Account unlock!!!');
	//	}
	var gasEstimate = web3.eth.estimateGas({data: contractCode});
	 alert("This contract requires " + gasEstimate + " gas to deploy!!!");
	  var sellContractAddress = sellContractInstance.address;
	 	sellContractInstance.StartEvent.sendTransaction({from: account, gas: gasEstimate+200000});
		 var event = sellContractInstance.startEvent();
		     event.watch(function(error, log){
			  	if (!error) {
	    		alert("You Event is " + log.args.senderaddress + " \n");
	    	}
	    });
	},
});

}
