window.Behaviors.EditStory = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click .edit-story__edit-link": "editStory"
    },

    editStory: function(e) 
    {
        e.preventDefault();
        var sid = $(e.currentTarget).attr('href').substr(1);
        pararchive.nav.editStory(sid);        
    }
});