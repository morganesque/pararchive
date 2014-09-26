window.Behaviors.EditStory = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click .story-list__edit-link": "editStory"
    },

    editStory: function(e) 
    {
        e.preventDefault();
        var id = $(e.currentTarget).attr('href').substr(1);
        pararchive.router.navigate('story/'+id+'/');
        pararchive.controller.editStory(id);
    }
});