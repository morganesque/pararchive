/*
	Viewing the story at the end.
*/		
var PageViewStory = PageView.extend({
	
	frag: '/pages/story.php',
	className: 'page page_story',
	firsttime: true,

	events:{
		"click .edit-block": "onEditBlock",
	},

	initialize:function(options)
	{		
		this.story_id = options.story_id;
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
		// console.log("PageHome update");		
		pararchive.viewStory.fetchStory(this.story_id,_.bind(this.showStory,this))
	},

	showStory:function()
	{
		this.$el.html(this.template({data:pararchive.viewStory.attributes}));
	},

	onEditBlock:function(e)
	{
		e.preventDefault();
		var id = $(e.currentTarget).attr('href').substr(1); console.log(id);		
		pararchive.story.setBlock(id);
		pararchive.router.navigate('/what/',{trigger:true});
	},

});