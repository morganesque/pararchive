window.Behaviors.ViewStory = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click @ui.viewstory": "viewStory"
    },

    viewStory: function(e) 
    {
        e.preventDefault();
        var slug = $(e.currentTarget).attr('href').split('/')[2];
        pararchive.nav.viewStory(slug);
    }
});