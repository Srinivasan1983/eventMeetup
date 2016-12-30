if (Meteor.isClient) {
Template.ConfirmRefund.helpers({
 eventName: function () {return bookContractInstance.name();},
});

Template.ConfirmRefund.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('main', {main: "Buyer"});
	},
	'submit form': function(event){
	    event.preventDefault();
	    var account = web3.eth.accounts[0];
	  //  var password = event.target.password.value;

	  // 	if(! web3.personal.unlockAccount(account,password)){
	//		alert('Account ' + account + 'cannot unlock');
//		} else {
//			alert('Account unlock!!!');
//		}
    console.log(bookContractInstance);
		 var gasEstimate = web3.eth.estimateGas({data: contractCode});
		 alert("This contract requires " + gasEstimate + " gas to deploy!!!");
		 bookContractInstance.refundBalanceAmount({},{from: account, gas: gasEstimate+200000});
		 var event = bookContractInstance.Refund()
		 event.watch(function(error, log){
	    	if (!error) {
	    		alert("You got " + log.args.refundAmount + " ether refund! "+" \n");
	    	}
	    });
	},
});

}
