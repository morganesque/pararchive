var IdentityView = Backbone.View.extend(
{
	events:{
		"click .identity__logout": "onLogOut",
		// "click .delete_block": "onDeleteBlock"
	},

	initialize:function(options)
	{
		// this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model,  "change", this.userChange);			
		
		this.greeting = this.$el.find('.identity__greeting');
		this.logout = this.$el.find('.identity__logout');
	},

	/*
		This is still visible when the user is logged out
		so it needs to change it's appearance.
	*/		
	userChange:function()
	{
		if (this.model.get('status') == 'logged out')
		{
			this.greeting.text('Hello you!');			
			$("title").html('Pararchive');
			this.logout.hide();
		} else {
			this.greeting.text(this.model.get('firstname')+ ' ' +this.model.get('surname'));
			$("title").html(this.model.get('firstname')+'&rsquo;s Pararchive');
			this.logout.show();
		}		
	},

	onLogOut:function(e)
	{
		e.preventDefault();
		console.log('loggin out');		
		$.get('/api/users/logout/',function(a,b,c)
		{
			window.location.href = '/';
		});
	},
});