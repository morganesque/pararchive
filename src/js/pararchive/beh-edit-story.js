window.Behaviors.EditStory = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click @ui.editstory": "editStory"
    },

    editStory: function(e) 
    {
        e.preventDefault();
        var sid = $(e.currentTarget).attr('href').split('/')[3];
        pararchive.nav.editStory(sid);        
    }
});