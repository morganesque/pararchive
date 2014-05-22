var Router = Backbone.Router.extend({

	pages:[],

	creation_order: ['what','when','arte','where'],

	initialize: function()
	{
		console.log('Welcome to Pararchive');
		this.main = $('#main');
	},

	currentPage:null,

	routes: {
		"": "home",
		"login/": 		"login",
		"what/": 		"what",
		"when/": 		"when",
		"arte/": 		"arte",
		"arte/:type/": 	"arteType",
		"where/": 		"where",
		"nearly/": 		"nearly",
	},

	/*
		Done before it calls any of the specific page functions.
	*/		
	execute: function(callback, args) 
	{	
		console.log('page: /'+Backbone.history.fragment);				
		// console.log("Router execute");				
		// take it to bakersfield!
		window.scrollTo(0,0);

		// go and do the normal routing thing.
	    if (callback) callback.apply(this, args);

	    /*
	    	If after that there's a current page get it going!
	    */		
	   	if (this.currentPage) 
    	{
    		this.main.html(this.currentPage.el);
    		this.currentPage.update();
    		this.currentPage.delegateEvents();
    	}
  	},

	/*
		This is generally what happens for all pages 
		except a few which need a little more logic.
	*/		
	normalPage:function(name,pageType,args)
	{
		if (!this.pages[name])
		{
			this.pages[name] = new pageType(args);
			this.pages[name].build();			
		} 
		this.currentPage = this.pages[name];	
	},

	login:function()
	{
		// console.log("Router login");		
		
		var self = this;	

		if (!this.loginPage)
		{
			this.loginPage = new PageLogin();
			this.loginPage.build();			
		} 
		this.currentPage = this.loginPage;
	},

	home: function()
	{
		this.normalPage('home',PageHome);	
	},

	what: function()
	{
		this.normalPage('what',PageWhat);	
	},

	when: function()
	{
		this.normalPage('when',PageWhen);	
	},

	arte: function()
	{
		this.normalPage('arte',PageQuick,{frag:'/pages/arte.php'});	
	},

	where: function()
	{
		this.normalPage('where',PageWhere);	
	},

	nearly: function()
	{
		this.normalPage('nearly',PageQuick,{frag:'/pages/nearly.php'});	
	},

	arteType:function(type)
	{
		var slug = 'arte-'+type; console.log(slug);		
		var frag = '/pages/'+slug+'.php';
		this.normalPage(slug,PageQuick,{frag:frag});	
	},


});