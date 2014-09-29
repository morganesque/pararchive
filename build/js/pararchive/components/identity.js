var IdentityView = Marionette.ItemView.extend(
{
	el:'#identity',
	template:false,

	ui: {
		username:'#username',
		logout:'#logout',
	},

	events:{
		"click @ui.logout": "onLogOut",
	},

	initialize:function(options)
	{
		this.listenTo(this.model, "change", this.render);
	},

	onRender:function()
	{
		this.$el.show();
		this.ui.username.text(this.model.get('firstname'));
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