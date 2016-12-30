if (Meteor.isClient) {
Template.CancleBooking.helpers({
	eventName: function () {return bookContractInstance.name();},
	AccountBalance: function(userIdx){
		var user = web3.eth.accounts[userIdx];
		console.log(user);
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	TicketPrice: function(){ return bookContractInstance.ticketPrice();},
	TicketWithraw: function(){ return Session.get('TicketNumber');},
	TicketLeft: function(userIdx) {
		var user = web3.eth.accounts[userIdx];
		return  bookContractInstance.balanceOfTickets(user) - Session.get('TicketNumber');
	},
	WithdrawMoney: function(){  return  bookContractInstance.ticketPrice() * Session.get('TicketNumber');},
	RemainingBalance: function(userIdx) {
		var numberToEther = 1000000000000000000;
		var user = web3.eth.accounts[userIdx];
		var originalBalance = web3.eth.getBalance(user).toNumber();
		var ticketWithdraw = web3.toWei(bookContractInstance.ticketPrice() * Session.get('TicketNumber'),'ether');
		//console.log(originalBalance);
		//console.log(ticketWithdraw);
		var BalanceAfterWithdraw = parseInt(originalBalance) + parseInt(ticketWithdraw);
		//console.log(BalanceAfterWithdraw);
		return web3.fromWei(BalanceAfterWithdraw,"ether");
	},

});

Template.CancleBooking.events({
	'click .no': function(event){
		event.preventDefault();
	    BlazeLayout.render('main', {main: "Buyer"});

	},
	'submit form': function(event){
		event.preventDefault();
		var account = web3.eth.accounts[0];
	//	var password = event.target.password.value;

	//	if(! web3.personal.unlockAccount(account,password)){
	//		alert('Account ' + account + 'cannot unlock');
	//	} else {
	//		alert('Account unlock!!!');
	//	}
  alert (Session.get('TicketNumber'));
  console.log(bookContractInstance);
  var gasEstimate = web3.eth.estimateGas({data: contractCode});
  var numberOfTicket = Session.get('TicketNumber');
		bookContractInstance.safeWithdraw(numberOfTicket,{from: account, data: contractCode, gas: gasEstimate+200000});
    alert ("AA");

		bookContractInstance.MoneyTransfer({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		var ticketBuyed = bookContractInstance.balanceOfTickets(account);
	    		//console.log(log.args.backer);

	    		//alert("buyer " log.args.backer " buy " + ticketBuyed + " ticket!\n");
	    		alert("You withdrawed " + Session.get('TicketNumber') +
	    			" ticket!\n You still have " + ticktetBuyed + " ticket! \n Get " + log.args.amount + " ether withdrawal\n");
	    	}
	    });
		BazeLayout.render('main', {main: "Buyer"});
	},
});

}
