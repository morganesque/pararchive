var StoryListView = Marionette.ItemView.extend(
{
	template:'#story-template',

	ui:{
		num:'.some-blocks .num',
		someblocks:'.some-blocks',
		noblocks:'.no-blocks',
		newstory:'.new-story',
		plus:'.new-block',
		storyname:'.story-name',
	},

	behaviors:{
		NewBlock:{},
	},

	events:{
		'click .story-name__submit':'changeStoryName',
	},

	initialize:function()
	{	
		this.listenTo(this.model, "change", this.onChange);		
		this.listenTo(this.model, "reset", this.onReset);		
	},

	onChange:function()
	{
		// console.log("StoryListView change");			
		this.render();
	},

	onReset:function()
	{
		// console.log("StoryListView reset");		
		this.render();
	},

	onRender:function()
	{				
		// console.log("story list - onRender");		
		if (pararchive.story.length)
		{			
			this.ui.newstory.hide();
			this.ui.someblocks.show();
			this.ui.noblocks.hide();

			if (pararchive.story.length == 1) this.ui.num.text('1 block');
			else this.ui.num.text(pararchive.story.length+' blocks');

		} else {

			this.ui.someblocks.hide();	

			if (this.model.meta)
			{
				if (this.model.meta.get('name') !== 'MyStory')
				{
					this.ui.newstory.hide();
					this.ui.noblocks.show();
				} else {					
					this.ui.newstory.show();
					this.ui.noblocks.hide();
				}
			}
		}		
	},

	changeStoryName:function(e)
	{
		e.preventDefault();

		var name = this.ui.storyname.val();
		if (name)
		{
			var slug = $.slugify(name);
			this.model.meta.set({name:name,slug:slug});
			this.model.trigger('meta');
			this.model.meta.save({},{success:function(story)
			{
				console.log('saved new name');		
				var id = story.get('id');
				pararchive.controller.editStory(id);
			}});
		}
	},

});