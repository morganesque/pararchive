var Control = Backbone.View.extend(
{
	checks:[],
	types:['what','where','when','arte'],
	els:{},

	events:{
		"click .list-group a": "onMetaClick",
		"click .logout__link": "onLogOut"
	},

	addModel:function()
	{
		if (this.model) this.stopListening(this.model);
		
		this.model = pararchive.story.getBlock();
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "sync", this.render);

		this.model.trigger('change');
	},

	initialize:function(options)
	{
		// console.log("Control initialize");		

		if (options.user) this.user = options.user; 
		if (options.artefacts) this.artefacts = options.artefacts; 

		// this.listenTo(this.model, "change", this.render);
		this.listenTo(this.user,  "change", this.userChange);

		this.listenTo(this.artefacts,  "change", this.artefactChange);
		this.listenTo(this.artefacts,  "reset", this.artefactChange);

		this.checks['what']  = this.$el.find('.item__what');			
		this.checks['where'] = this.$el.find('.item__where');			
		this.checks['when']  = this.$el.find('.item__when');			
		this.checks['arte']  = this.$el.find('.item__arte');			

		// this.checks['what'].hide(); 		
		// this.checks['where'].hide();			
		// this.checks['when'].hide(); 		
		// this.checks['arte'].hide();

		this.els['greeting'] = this.$el.find('.greeting .content');
		this.els['monitor']  = this.$el.find('.monitor'); this.els.monitor.hide();		
		this.els['logout'] = this.$el.find('.logout__link');
		this.els['metas'] = this.$el.find('.meta__links .list-group-item');
		this.els['artefacts'] = this.$el.find('.the__artefacts');

		this.actionLabel = this.$el.find('.action__label');
	},

	/*
		If the artefacts object triggers "change" or "reset"
	*/	
	artefactChange:function()
	{
		var num = this.artefacts.length;
		
		// if (!num) this.checks['arte'].hide();
		// else this.checks['arte'].show();

		this.checks['arte'].find(".badge").text(this.artefacts.length);		

		this.els.artefacts.empty();

		var dd = $('<div class="display"></div>');

		this.artefacts.each(function(a,b,c)
		{	
			var url = a.get('url');
			var link = $('<a/>');

			link.css({'background-image': 'url('+url+')'});
			link.attr({href:'/arte/edit/'+a.get('id')+'/'});

			var dc = dd.clone();
			dc.append(link);
			this.els.artefacts.append(dc);
		},this);

	},

	/*
		This is still visible when the user is logged out
		so it needs to change it's appearance.
	*/		
	userChange:function()
	{
		if (this.user.get('status') == 'logged out')
		{
			this.els.greeting.text('Hello you!');			
			$("title").html('Pararchive');
			this.els.logout.hide();
		} else {
			this.els.greeting.text(this.user.get('firstname')+ ' ' +this.user.get('surname'));
			$("title").html(this.user.get('firstname')+'&rsquo;s Pararchive');
			this.els.logout.show();
		}		
	},

	/*
		Triggered when the Model changes.
	*/		
	render:function()
	{		
		var a = this.types;
		_.each(a,this.mark,this);
	},

	/*
		Taking the individual meta data elements 
		and displaying them appropriately.
	*/		
	mark:function(a)
	{
		var el = this.checks[a]
		var value = this.model.get(a);
		
		var label = a;
		if (label == 'arte') label = 'artefacts';

		if (this.model.get('id') == undefined && a != 'what')
		{
			el.hide();
		} else if (typeof value !== "undefined" && value !== null && value !== '') {
			el.show(); 
			el.text(value);
			el.addClass('got_content');
		} else {
			el.show(); 
			el.text(label);
			el.removeClass('got_content');
		}
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
		// console.log("Control update");		

		var slug = Backbone.history.fragment;
		slug = slug.substring(0,slug.length-1);

		var r = slug.indexOf("arte");
		if (r === 0) slug = 'arte';	

		var i = this.types.indexOf(slug);
		this.els.metas.removeClass('current');

		// if we're done hide the "you are editing a block" message.
		if (slug == 'done') this.actionLabel.css('opacity',0);
		else this.actionLabel.css('opacity',1);
		
		if (i >= 0) // only if it's one of the block content types.
		{	
			this.checks[slug].addClass('current');	
		}		
	},

	hide:function()
	{
		// console.log("Control hide");		
		this.els.monitor.hide();
	},

	show:function()
	{
		// console.log("Control show");		
		this.els.monitor.show();
	},
});