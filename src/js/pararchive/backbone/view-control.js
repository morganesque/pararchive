var Control = Backbone.View.extend(
{
	checks:[],

	events:{
		"click .meta__links a": "onMetaClick",
	},

	initialize:function()
	{
		this.user = pararchive.user;

		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.user, "change", this.userChange);

		this.checks['what'] = this.$el.find('.item__what');			
		this.checks['where'] = this.$el.find('.item__where');			
		this.checks['when'] = this.$el.find('.item__when');			

		this.greeting = this.$el.find('.greeting');
		this.monitor = this.$el.find('.monitor');
	},

	userChange:function()
	{
		console.log('User Change');		
		console.log(this.user.attributes);		
		if (this.user.get('status') == 'logged out')
		{
			this.greeting.text('Hello');
			this.monitor.hide();
		} else {
			this.greeting.text('Hello '+this.user.get('firstname'));
			this.monitor.show();
		}
	},

	mark:function(el,state)
	{
		var item = el.find('span');
		if (state)
		{
			item.addClass('icon-checkbox-checked');
			item.removeClass('icon-checkbox-unchecked');
		} else {
			item.addClass('icon-checkbox-unchecked');
			item.removeClass('icon-checkbox-checked');
		}
	},

	render:function()
	{
		console.log("Control render");	
		// console.log(this.model.changed);			

		var self = this;

		_.each(this.model.changed, function(v,k,l)
		{
			this.mark(this.checks[k],this.model.has(k));
		},this)
	},

	onMetaClick:function(e)
	{
		e.preventDefault();

		var href = $(e.currentTarget).attr('href');		
		pararchive.router.navigate(href,{trigger:true});
	},
});