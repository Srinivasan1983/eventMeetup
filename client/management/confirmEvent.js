if (Meteor.isClient) {

Template.ConfirmEvent.helpers({
	Confirmation: function () {
		var confirmSignal = Session.get('confirmSignal');
		console.log(typeof confirmSignal);
		console.log(confirmSignal);
		if (confirmSignal){
			return 'Confrimation';
		} else {
			return 'Denial';
		}
	},
});

Template.ConfirmEvent.events({
	'click .back': function(event){
		event.preventDefault();
	        BlazeLayout.render('main', {main: "Supervise"});
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
  var gasEstimate = web3.eth.estimateGas({data: contractCode});
  alert("This contract requires " + gasEstimate + " gas to deploy!!!");

		var confirmSignal = Session.get('confirmSignal');
		superviseContractInstance.confirmEvent(confirmSignal,{from: account, data: contractCode, gas: gasEstimate+200000});

		var event = superviseContractInstance.ConfirmEvent();

		    event.watch(function(error, log){
	    	if (!error) {
	    		var superviseContractAddress = superviseContractInstance.address
	    		if (log) {
	    			alert("Management " + superviseContractAddress + ' accepts your "Confrimation"!');
	    		}
	    		else {
	    			alert("Management " + superviseContractAddress + ' accepts your "Denial!"');
	    		}
	    	}
	    });
	},
});

}
