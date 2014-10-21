window.Behaviors.ViewBlock = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click @ui.viewblock": "viewBlock"
    },

    viewBlock: function(e) 
    {
        e.preventDefault();
        var slug = $(e.currentTarget).attr('href').split('/')[2];
        var block = this.view.collection.get(this.view.blockID);
        var bin = this.view.collection.indexOf(block)+1;
        pararchive.nav.viewStoryBlock(slug,bin);
    }
});