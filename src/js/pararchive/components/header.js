var HeaderView = Marionette.ItemView.extend(
{
	el:'#header',
	template:false,

	ui: {
		logo:'.logo',
		story:'.story',
		name:'.story-name',
		author:'.story-author',
	},

	events:{
		'click @ui.logo': "onLogoClick",
	},

	initialize:function(options)
	{
		console.log("HeaderView\tinitialize");				
		this.listenTo(this.model, "meta", this.render);
		this.listenTo(pararchive.vent, "storyname:hide", this.hideName);
		this.listenTo(pararchive.vent, "storyname:show", this.nameShow);
		this.listenTo(pararchive.vent, "storyname:change", this.changeName);
	},

	onRender:function()
	{
		if (this.model.meta) this.ui.name.text(this.model.meta.get('name')+' ');
		this.ui.author.html('&mdash; '+pararchive.user.get('firstname')+' '+pararchive.user.get('surname'));
		// console.log("onRender "+this.nameShow);		
		this.ui.story.toggle(this.nameShow);	
	},	

	hideName:function()
	{
		console.log("hideName");		
		this.nameShow = false;	
		this.render();	
	},

	showName:function()
	{
		console.log("showName");		
		this.nameShow = true;		
		this.render();
	},

	changeName:function(name)
	{
		this.ui.name.text(name);
	},

	onLogoClick:function(e)
	{
		e.preventDefault();
		pararchive.nav.allStories();
	},
});