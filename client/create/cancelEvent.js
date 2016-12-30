if (Meteor.isClient) {
	Template.CancelEvent.events({
	'submit form': function(event){
	    	event.preventDefault();
			var account = web3.eth.accounts[0];
		//	var password = event.target.password.value;
	  //  	if(! web3.personal.unlockAccount(account,password)){
		//		alert('Account ' + account + 'cannot unlock');
		//	} else {
		//		alert('Account unlock!!!');
	//		}
     var gasEstimate = web3.eth.estimateGas({data: contractCode});
        alert("This contract requires " + gasEstimate + " gas to deploy!!!");
	    	sellContractInstance.cancelEvent.sendTransaction({from: account, gas: gasEstimate+200000});

	        var event = sellContractInstance.CancelEvent()
          event.watch(function(error, log){
	    		if (!error) {
	    			alert("Contract " + log.args.senderaddress + "is " + log.args.stateName + " \n");
	    		}
	    	});
	        BlazeLayout.render('main', {main: "Home"});

	    },
	'click .back': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "YourExistingConcert"});

	    },
	});
}
