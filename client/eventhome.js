if (Meteor.isClient) {

Session.setDefault('latestBlock',{});

//BlazeLayout.render('main', {main: "menuoption"});

//need Mumin's Web3 heack to finish
 Template.UserInfo.helpers({
 	Account: function(){
 		return web3.eth.accounts[0];
 	},
 	AccountBalance: function(){
		var user = web3.eth.accounts[0];
		return web3.fromWei(web3.eth.getBalance(user),"ether").round("2");

	},
	/////Not Done
 	TicketsOwn: function(){},
 	ContractsOwn: function(){},
 });


}
