var IdentityView = Marionette.ItemView.extend(
{
	el:'#identity',
	template:false,

	ui: {
		mystories:'.my-stories',
		username:'.username',
		logout:'.logout',
	},

	events:{
		"click @ui.logout": "onLogOut",
		"click @ui.mystories": "onMyStoriesClick",
	},

	initialize:function(options)
	{
		this.listenTo(this.model, "change", this.render);
	},

	onRender:function()
	{
		this.$el.show();
		this.ui.username.text(this.model.get('firstname')+' '+this.model.get('surname'));
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

	onMyStoriesClick:function(e)
	{
		e.preventDefault();
		pararchive.nav.yourStories();
	},
});