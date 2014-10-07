var StoryListView = Marionette.ItemView.extend(
{
	template:'#story-template',
	className:'edit-story',

	ui:{
		num:'.some-blocks .num',
		someblocks:'.some-blocks',
		noblocks:'.no-blocks',
		newstory:'.new-story',
		plus:'.new-block',

		blurb:'#story-blurb',
		name:'#story-name',
	},

	behaviors:{
		NewBlock:{},
	},

	events:{
		'change 	@ui.name':"onNameChange",
		'keypress 	@ui.name':"onNameChange",
		'paste 		@ui.name':"onNameChange",
		'focus 		@ui.name':"onNameChange",
		'textInput 	@ui.name':"onNameChange",
		'input 		@ui.name':"onNameChange",
		'click .save-story-meta':"onSaveStoryMeta",
	},

	initialize:function()
	{	
		this.listenTo(this.collection, "change", this.onChange);		
		this.listenTo(this.collection, "reset", this.onReset);		
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

	serializeData:function()
	{
		var out = {
			items:this.collection.toJSON(),
		}	
		if (this.collection.meta !== undefined) out.meta = this.collection.meta.toJSON();
		return out;
	},

	onNameChange:function(e)
	{
		pararchive.vent.trigger('storyname:change',this.ui.name.val());
	},

	onSaveStoryMeta:function(e)
	{
		e.preventDefault();

		var name = this.ui.name.val();
		var blurb = this.ui.blurb.val();

		if (name)
		{
			var slug = $.slugify(name);
			this.collection.meta.set({name:name,slug:slug,blurb:blurb});			
			this.collection.meta.save({},{success:function(story)
			{
				var sid = story.get('id');
				console.log('saved story meta: '+sid);		
				pararchive.story.trigger('meta');
				pararchive.story.trigger('change');
				pararchive.nav.editStory(sid);
			}});
		} else {
			alert("You story's name can't be blank");
		}
	},

});