var StoryBlock = Backbone.Model.extend({});

var Story = Backbone.Collection.extend({
    
    model:StoryBlock,
    storyID:undefined,

    initialize:function(options)
    {
    	if (options && options.storyID) this.storyID = options.storyID;
    },

    setStoryID:function(id)
    {
    	this.storyID = id;
    },
    
    getStoryBlock:function()
    {
        return this.first();
    },

    url: function()
    {
    	if (!this.storyID) alert('Not picked a story yet!');
    	return '/api/blocks/?story_id='+this.storyID;
    }
});

var UserStory = Backbone.Model.extend({

});

var Stories = Model.extend({

	urlRoot:"/api/stories/"

});