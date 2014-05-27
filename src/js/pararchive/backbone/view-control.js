var Control = Backbone.View.extend(
{
	checks:[],

	events:{
		"click .meta__links a": "onMetaClick",
	},

	changeModel:function(m)
	{
		this.model = m;
		this.listenTo(this.model, "change", this.render);
		this.render();
	},

	initialize:function()
	{
		// console.log("Control initialize");		

		this.user = pararchive.user;

		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.user,  "change", this.userChange);

		this.checks['what']  = this.$el.find('.item__what');			
		this.checks['where'] = this.$el.find('.item__where');			
		this.checks['when']  = this.$el.find('.item__when');			
		this.checks['arte']  = this.$el.find('.item__arte');			

		this.checks['what'].hide(); 		
		this.checks['where'].hide();			
		this.checks['when'].hide(); 		
		this.checks['arte'].hide();

		this.greeting = this.$el.find('.greeting');
		this.monitor  = this.$el.find('.monitor');

		this.render();
	},

	userChange:function()
	{
		if (this.user.get('status') == 'logged out')
		{
			this.greeting.text('Hello you!');			
			$("title").html('Pararchive');
			this.monitor.hide();
		} else {
			this.greeting.text(this.user.get('firstname')+ ' ' +this.user.get('surname'));
			$("title").html(this.user.get('firstname')+'&rsquo;s Pararchive');
			this.monitor.show();
		}		
	},

	mark:function(el,value)
	{
		if (typeof value !== "undefined") el.show(); 
		else el.hide();

		el.text(value);
	},

	render:function()
	{		
		var a = ['what','where','when','arte'];
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
});