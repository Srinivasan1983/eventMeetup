if (Meteor.isClient) {
Template.ConfirmBuy.helpers({
	eventName: function () {return bookContractInstance.name();},
	AccountBalance: function(){
		var user = web3.eth.accounts[3];
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	TicketPrice: function(){ return Session.get('TicketPrice');},
	TicketAmount: function(){ return Session.get('TicketNumber');},
	TicketCost: function(){  return Math.floor(Session.get('TicketPrice')) * Session.get('TicketNumber');},
	RemainingBalance: function() {
		var user = web3.eth.accounts[3];
		var originalBalance = web3.fromWei(web3.eth.getBalance(user),"ether")
		var ticketCost = Math.floor(Session.get('TicketPrice')) * Session.get('TicketNumber');
		return originalBalance - ticketCost;
	},
});

Template.ConfirmBuy.events({
	'click .no': function(event){
		event.preventDefault();
	        BlazeLayout.render('mainLayout', {main: "Buyer"});

	},
	'submit form': function(event){
	    event.preventDefault();
	    var account = web3.eth.accounts[0];
			//var user = web3.eth.accounts[3];
	    //var password = event.target.password.value;
	    //console.log(password);
	    /////its two in this case
	    var ticketWant = parseInt(Session.get('TicketNumber'));
	    var ticketPrice = parseInt(Session.get('TicketPrice'));
	    //console.log(ticketWant);
	    //starting transcation, alert when transaction finished
			var totalTicketPrice = web3.toWei(ticketWant*ticketPrice,"ether");
			Session.set('totalTicketPrice', totalTicketPrice);
	    web3.eth.sendTransaction({from: web3.eth.accounts[3], to: account, value: web3.toWei(ticketWant*ticketPrice,"ether")});
			//alert("aa");
	    //if(! web3.personal.unlockAccount(account,password)){
		//	alert('Account ' + account + 'cannot unlock');
	//	} else {
//			alert('Account unlock!!!');
//  		}
     //console.log(Session.get('Host'));
		  var gasEstimate = web3.eth.estimateGas({data: contractCode});
			alert("This contract requires " + gasEstimate + " gas to deploy!!!");
	    bookContractInstance.buyTicket(ticketWant,{from: account, data: contractCode, gas: gasEstimate+200000});
	    bookContractInstance.MoneyTransfer({},{address:account}).watch(function(error, log){
	    	if (!error) {
	    		//var ticketBuyed = bookContractInstance.balanceOfTickets(account);
					//console.log(ticketBuyed);
					//console.log(user);
	    		//console.log(log.args.backer);

	    		//alert("buyer "log.arg.backer " buy " + ticketWant  + " ticket!\n");
	    		alert("You buyed " + ticketWant + " ticket! " + "\n");
	    	}
	    });
	    //alert(bookContractInstance.balanceOfTickets(web3.eth.accounts[0]));


      	BlazeLayout.render('main', {main: "Home"});}

});

}
