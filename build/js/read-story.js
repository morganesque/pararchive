/*
	Viewing the story at the end.
*/		
var ReadStoryPage = PageView.extend({
	
	frag: '/pages/read-story.php',
	className: 'page read-story',
	firsttime: true,

	events:{
		"click .edit-block": "onEditBlock",
	},

	initialize:function(options)
	{		
		this.listenTo(pararchive.stories, 'change', this.setup);		
	},

	setup:function()
	{
		var html = this.$el.find('#viewStory').html();
		this.template = _.template(html);

		this.firsttime = false; // only stop asking to change events after this setup has happened.
	},	

	update:function()
	{
		// console.log("ReadStoryPage update");		
		pararchive.viewStory.fetchStory(pararchive.viewStory.storyID,_.bind(this.showStory,this))
	},

	showStory:function()
	{
		this.$el.html(this.template({data:pararchive.viewStory.attributes}));
	},

	onEditBlock:function(e)
	{
		e.preventDefault();
		var id = $(e.currentTarget).attr('href').substr(1);
		var url = '/story/'+pararchive.viewStory.storyID+'/block/'+id+'/';
		// console.log(url);		
		// pararchive.router.navigate(url,{trigger:true});
	},

});