
var StoryModel = Backbone.Model.extend(
{    
});

var Stories = Backbone.Collection.extend({
    
    model:StoryModel,

    url:"/api/stories/",

    initialize:function(options)
    {
    }

});