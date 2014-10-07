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
		notify:'.notify',
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
		this.listenTo(this.collection, "change", this.render);		
		this.listenTo(this.collection, "reset", this.render);		
	},

	serializeData:function()
	{
		var out = {
			items:this.collection.toJSON(),
		}	
		if (this.collection.meta !== undefined) out.meta = this.collection.meta.toJSON();
		return out;
	},

	onRender:function()
	{
		// console.log("onRender");		
		this.ui.notify.addClass('out');	
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

		this.ui.notify.html('<p>Saving...</p>');
		this.ui.notify.removeClass('out');

		if (name)
		{
			var slug = $.slugify(name);
			this.collection.meta.set({name:name,slug:slug,blurb:blurb});			
			this.collection.meta.save({},{success:_.bind(function(story)
			{				
				this.ui.notify.html('<p>Saved!</p>');
				setTimeout(_.bind(function()
				{
					this.ui.notify.addClass('out');
				},this),1000);

			},this)});
		} else {
			alert("You story's name can't be blank");
		}
	},

});