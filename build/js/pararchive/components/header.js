var HeaderView = Marionette.LayoutView.extend(
{
	el:'#header',
	template:false,

	regions:{
		identity:'#identity',
	},

	ui: {
		logo:'.logo',
		story:'.story',		
	},

	events:{
		'click @ui.logo': "onLogoClick",
	},

	initialize:function(options)
	{
		// console.log("HeaderView\tinitialize");				
		this.listenTo(this.model, "meta", this.render);

		this.listenTo(pararchive.vent, "storyname:hide", this.hideName);
		this.listenTo(pararchive.vent, "storyname:show", this.showName);		
	},

	onRender:function()
	{		
		// console.log("onRender "+this.nameShow);		
		this.showIdentity();
	},	

	showIdentity:function()
    {
        var identity = new IdentityView({
            model:pararchive.user,
        })
        identity.render();
    },	

	onLogoClick:function(e)
	{
		e.preventDefault();
		pararchive.nav.allStories();
	},
});