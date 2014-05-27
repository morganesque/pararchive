var PageHome = PageView.extend({
	
	frag: '/pages/home.php',
	className: 'page page_home',
	firsttime: true,

	events:{
		"click #start__button": "onStartClick",
		"click .edit__story": "onEditClick"
	},

	initialize:function()
	{		

	},

	setup:function()
	{
		// console.log("PageHome setup");		

		var StoryList = ComponentView.extend({

			render:function()
			{
				var stories = this.model.get('stories'); 
				_.each(stories,function(a)
				{				
					var link = $('<a href="#'+a.id+'" class="list-group-item edit__story">'+a.name+'<span class="pull-right">edit</span></a>');
					this.$el.append(link);
				},this);
				
			},
		});

		var storiesList = new StoryList(
		{
			model:pararchive.stories,
			el:this.$el.find('.story__list')
		});

		this.update();
		this.firsttime = false; // only stop asking to change events after this setup has happened.
	},

	update:function()
	{
		// console.log("PageHome update");		
		pararchive.stories.getData();
	},

	onStartClick:function(e)
	{
		e.preventDefault();
		console.log('new!');			
	},

	onEditClick:function(e)
	{
		e.preventDefault();
		var t = $(e.currentTarget).attr('href').substr(1);

		pararchive.story.setStoryID(t);
		pararchive.story.fetch({reset:true,success:function()
		{			
			pararchive.router.navigate('/what/',{trigger:true});
		}});			
	},

});