/*
	A model for individual stories owned by a user.
*/		
var StoryModel = Backbone.Model.extend(
{    
	
});
/*
	A list of stories owned by the currently logged in user.
*/		
var Stories = Backbone.Collection.extend({
    
    model:StoryModel,
    url:"/api/stories/",
});

var AllStories = Backbone.Collection.extend({

	model:StoryModel,
	url:function()
	{
		return "/api/stories/all/";
	}

});

/*
	A model for the currently logged in user.
*/		
var User = Backbone.Model.extend(
{    
	urlRoot:'/api/users/',
	stories:undefined,

	initialize:function()
	{
		this.stories = new Stories();
		this.listenTo(this,'change',this.onChange);
	},

	onChange:function()
	{
		// set up the stories model.    
        this.stories.fetch({reset:true});
	},
});

