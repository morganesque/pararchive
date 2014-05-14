var Router = Backbone.Router.extend({

	initialize: function()
	{
		this.main = $('#main');
	},

	currentPage:null,

	routes: {
		"": "home",
		"login/": "login",
	},

	/*
		Done before it calls any of the specific page functions.
	*/		
	execute: function(callback, args) 
	{	
		// console.log("Router execute");				
		// take it to bakersfield!
		window.scrollTo(0,0);

		if (this.currentPage) this.currentPage.hide();

		this.main.empty();

		// go and do the normal routing thing.
	    if (callback) callback.apply(this, args);

	    console.log(this.currentPage);		

	    this.main.html(this.currentPage.el);
  	},

	login:function()
	{
		// console.log("Router login");		
		
		var self = this;	

		if (!this.loginPage)
		{
			this.loginPage = new PageLogin(this.main);
			this.loginPage.build();			
		} 
		this.currentPage = this.loginPage;
	},

	home: function()
	{
		if (!this.homePage)
		{
			this.homePage = new PageHome(this.main,'/pages/home.php');
			this.homePage.build();			
		}
		this.currentPage = this.homePage;	
	},


});