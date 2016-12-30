


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("main", {main: "Home"});
  }
});

FlowRouter.route("/create", {
	name: "create",
	action() {
		BlazeLayout.render("main",{
			main: "create"
		})
	}
});

FlowRouter.route("/SellerManagement", {
	name: "SellerManagement",
	action() {
		BlazeLayout.render("main",{
			main: "SellerManagement"
		})
	}
});


FlowRouter.route("/closed", {
	name: "closed",
	action() {
		BlazeLayout.render("main",{
			main: "closed"
		})
	}
});

FlowRouter.route("/SelectManagementEvent", {
	name: "SelectManagementEvent",
	action() {
		BlazeLayout.render("main",{
			main: "SelectManagementEvent"
		})
	}
});

FlowRouter.route("/SelectEvent", {
	name: "SelectEvent",
	action() {
		BlazeLayout.render("main",{
			main: "SelectEvent"
		})
	}
});
