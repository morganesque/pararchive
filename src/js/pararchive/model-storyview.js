var StoryView = Backbone.Model.extend({
    
    storyID:undefined,

    initialize:function(options)
    {
    	if (options && options.storyID) this.storyID = options.storyID;
    },

    fetchStory:function(id,callback)
    {
        var self = this; 
        
        this.setStoryID(id);
        this.fetch({reset:true,success:function()
        {
            callback();
        }});
    },

    setStoryID:function(id)
    {
        var self = this;
    	this.storyID = id;
    },

    url: function()
    {
    	if (!this.storyID) alert('Not picked a story yet!');
    	return '/api/view/'+this.storyID+'/';
    }
});