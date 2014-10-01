var ViewController = Marionette.Controller.extend({

	convertSlug:function(slug,callback)
	{
		var convert = new Backbone.Model();
		convert.url = function() {
			return "/api/slug/"+this.get('slug')+'/';
		}
		convert.set('slug',slug);
		convert.fetch({success:function(model,json,options)
		{
			pararchive.story.setStoryMeta(json);
			pararchive.story.loadStory(function()
			{
				if (callback) callback();
			});
		}});
	},

	viewStory:function(slug)
	{
		// console.log("ViewController:viewStory: "+slug);
		this.convertSlug(slug);
		pararchive.showViewStory();
	},

	viewBlock:function(slug,bin)
	{
		console.log("Controller\tviewBlock");
		this.convertSlug(slug,function()
		{
			pararchive.showViewBlock();
			pararchive.story.setBlockByIndex(bin);
		});		
	},

	viewStoryCredits:function()
	{
		alert("viewStoryCredits");
	},
});
