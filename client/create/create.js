
/////////SELL SECTION/////////////
Template.create.events({
	'click .back': function(event){
			console.log(event);
	    	event.preventDefault();
	        BlazeLayout.render('main', {main: "menuoption"});

	    },
	'submit form': function(event){
			event.preventDefault();
			var eventName = event.target.eventName.value;
			var eventPlace = event.target.eventPlace.value;
			var startTime = event.target.startTime.value;
			var endTime = event.target.endTime.value;
			var withdrawDeadline = event.target.withdrawDeadline.value;
			var ticketSupply = event.target.ticketSupply.value;
			var ticketPrice = event.target.ticketPrice.value;
			var supervisor = event.target.supervisor.value;
			var hostName = event.target.hostName.value;
			var extraInfo = event.target.extraInfo.value;
			//session.set a shit load of things
			//Not fini

			Session.set('eventName',eventName);
			Session.set('eventPlace',eventPlace);
			Session.set('startTime',startTime);
			Session.set('endTime', endTime);
			Session.set('withdrawDeadline',withdrawDeadline);
			Session.set('ticketSupply',ticketSupply);
			Session.set('ticketPrice',ticketPrice);
			Session.set('supervisor',supervisor);
			Session.set('hostName',hostName)
			Session.set('extraInfo',extraInfo);

		    BlazeLayout.render('main', {main: "confirmcreate"});

		}
});
