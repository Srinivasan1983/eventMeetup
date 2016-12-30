if (Meteor.isClient) {

Template.confirmcreate.helpers({
	hostName: function() {return Session.get('hostName')},
	eventName: function(){return Session.get('eventName')},
	eventPlace: function() {return Session.get('eventPlace')},
	startTime: function(){return Session.get('startTime')},
	endTime: function(){return Session.get('endTime')},
	withdrawDeadline: function(){return Session.get('withdrawDeadline')},
	ticketPrice: function(){return Session.get('ticketPrice')},
	ticketSupply: function(){return Session.get('ticketSupply')},
	supervisor: function(){return Session.get('supervisor')},
	extraInfo: function(){return Session.get('extraInfo')},
})

Template.confirmcreate.events({
	    'click .no': function(event){
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "create"});

	    },
	    //'click .yes': function(event){
	    'submit form': function(event){
	    	event.preventDefault();
	    	//starting transcation, alert when transaction finished
	    	//var account = web3.eth.accounts[0];
        //console.log(user);
	    	//var password = event.target.password.value;
	    	//if(! web3.personal.unlockAccount(account,password)){
			//	alert('Account ' + account + 'cannot unlock');
		//	} else {
			//	alert('Account unlock!!!');
		//	}

	    	smartTicketContractObject = web3.eth.contract(abi);
        //console.log(abi);
        //console.log(account);
	    	/*var currentTime = new Date();
	    	var timeBeforeWithdrawDeadLineInMilliSeconds = Math.abs(Session.get('withdrawDeadline')-currentTime);
	    	var timeBeforeWithdrawDeadLineInMinutes = Math.floor(timeBeforeWithdrawDeadLineInMilliSeconds/60000);
	    	alert(timeBeforeWithdrawDeadLineInMinutes);
			var timeBeforeStartTimeInMilliSeconds = Math.abs(Session.get('startTime')-currentTime);
	    	var timeBeforeStartTimeInMinutes = Math.floor(timeBeforeWithdrawDeadLineInMilliSeconds/60000);
			var timeBeforeEndTimeInMilliSeconds = Math.abs(currentTime-Session.get('endTime'));
	    	var timeBeforeEndTimeInMinutes = Math.floor(timeBeforeEndTimeInMilliSeconds/60000);
			*/
			var gasEstimate = web3.eth.estimateGas({data: contractCode});
			alert("This contract requires " + gasEstimate + " gas to deploy!!!");

			//var param1 = {}

	    	smartTicketContractInstance = smartTicketContractObject.new(Session.get('eventName'),Session.get('eventPlace'),
	    		parseInt(Session.get('ticketPrice')),Session.get('hostName'),parseInt(Session.get('ticketSupply')),
					parseInt(Session.get('withdrawDeadline')),parseInt(Session.get('startTime')),
					parseInt(Session.get('endTime')),Session.get('supervisor'),Session.get('extraInfo'),

			//buyContract1Instance = buyContract1Object.new(['Test Contract','NTU',
	    	//	2,50,500,1000,2000],
	    		{from:web3.eth.accounts[0], data: contractCode, gas: gasEstimate+200000},function(error,contract){
	    			if(!error) {
							console.log(Session.get('eventName'));
							console.log(Session.get('eventPlace'));
							console.log(Session.get('ticketSupply'));
							console.log(Session.get('ticketPrice'));
							console.log(Session.get('supervisor'));
							console.log(Session.get('startTime'));
							console.log(Session.get('endTime'));
							console.log(Session.get('withdrawDeadline'));
							console.log(contract.address);
	    				if(!contract.address) {
	    					alert("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

      					} else {
        					alert("Contract mined! Address: " + contract.address);
        					//console.log(contract);
      					}
	    			} else {
	    				alert(error);
	    			}
	    		});

	    	    /*function buyContract1(
        string _name,string _place,uint _ticketPrice,uint _ticketSupply,
        uint timeBeforeWithdrawDeadline,uint timeBeforestartTime,
        uint timeBeforeconcertEndTime) */
	        //alert("Sell success!");

	        BlazeLayout.render('main', {main: "menuoption"});
	    }

});

}
