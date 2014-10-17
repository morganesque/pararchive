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
		},error:function(a,b,c)
		{
			console.log('error');		
			console.log(a,b,c);		
		}});
	},

	viewStory:function(slug)
	{
		// console.log("ViewController:viewStory: "+slug);
		pararchive.showViewStory();
		this.convertSlug(slug);		
	},

	viewBlock:function(slug,bin)
	{
		console.log("ViewController\tviewBlock: "+slug+' '+bin);
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
