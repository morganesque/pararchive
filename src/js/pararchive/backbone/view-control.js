var Control = Backbone.View.extend(
{
	checks:[],
	types:['what','where','when','arte'],

	events:{
		"click .meta__links a": "onMetaClick",
		"click .logout__link": "onLogOut"
	},

	addModel:function()
	{
		if (this.model) this.stopListening(this.model);
		
		this.model = pararchive.story.getBlock();
		this.listenTo(this.model, "change", this.render);

		this.model.trigger('change');
	},

	initialize:function(options)
	{
		// console.log("Control initialize");		

		if (options.user) this.user = options.user; 

		// this.listenTo(this.model, "change", this.render);
		this.listenTo(this.user,  "change", this.userChange);

		this.checks['what']  = this.$el.find('.item__what');			
		this.checks['where'] = this.$el.find('.item__where');			
		this.checks['when']  = this.$el.find('.item__when');			
		this.checks['arte']  = this.$el.find('.item__arte');			

		this.checks['what'].hide(); 		
		this.checks['where'].hide();			
		this.checks['when'].hide(); 		
		this.checks['arte'].hide();

		this.greeting = this.$el.find('.greeting .content');
		this.monitor  = this.$el.find('.monitor'); this.monitor.hide();		
		this.logout = this.$el.find('.logout__link');
		this.metas = this.$el.find('.meta__links .list-group-item');
	},

	userChange:function()
	{
		if (this.user.get('status') == 'logged out')
		{
			this.greeting.text('Hello you!');			
			$("title").html('Pararchive');
			this.logout.hide();
		} else {
			this.greeting.text(this.user.get('firstname')+ ' ' +this.user.get('surname'));
			$("title").html(this.user.get('firstname')+'&rsquo;s Pararchive');
			this.logout.show();
		}		
	},

	mark:function(el,value)
	{
		if (typeof value !== "undefined" && value !== null) el.show(); 
		else el.hide();

		el.text(value);
	},

	render:function()
	{				
		var a = this.types;
		_.each(a,function(a)
		{
			this.mark(this.checks[a],this.model.get(a));

		},this);
	},

	onMetaClick:function(e)
	{
		e.preventDefault();

		var href = $(e.currentTarget).attr('href');		
		pararchive.router.navigate(href,{trigger:true});
	},

	onLogOut:function(e)
	{
		e.preventDefault();

		$.get('/api/users/logout/',function(a,b,c)
		{
			window.location.href = '/';
		});
	},

	update:function()
	{
		var slug = Backbone.history.fragment;
		slug = slug.substring(0,slug.length-1);

		var i = this.types.indexOf(slug);
		
		if (i >= 0) // only if it's one of the block content types.
		{
			this.metas.removeClass('current');
			this.checks[slug].addClass('current');	
		}		
	},

	hide:function()
	{
		// console.log("Control hide");		
		this.monitor.hide();
	},

	show:function()
	{
		// console.log("Control show");		
		this.monitor.show();
	},
});