var App = Marionette.Application.extend({

    regions: {
        header:'#header',
        top:'#top',
        main:'#main',
        footer:'#footer',
    },

    initialize:function()
    {
        console.log('App:Initialize');

        // Create the edit controller.
        this.controller = new EditController();
        // Create the edit router.
        this.router = new EditRouter({controller: this.controller});

        // Create the view controller.
        this.viewcontroller = new ViewController();
        // Create the view router.
        this.viewrouter = new ViewRouter({controller: this.viewcontroller});

        // First create a user object.
        this.user = new User();        

        // start a story.
        this.story = new Story();
    },

    showHeader:function()
    {
        var header = new HeaderView({
            model:pararchive.story
        });
    },

    showIdentity:function()
    {
        var identity = new IdentityView({
            model:pararchive.user,
        })
        identity.render();
        // this.header.show(identity);
    },

    showEditStory:function()
    {
        var storyview = new StoryListView({
            model:pararchive.story,
        });
        pararchive.main.show(storyview);
        pararchive.showStoryPanel();
    },

    showEditBlock:function()
    {
        console.log("App\t\t\tshowEditBlock");        
        var editblock = new EditBlockView({
            model:pararchive.story,
        });
        this.main.show(editblock);
    },

    showStoryPanel:function()
    {
        var storypanel = new StoryPanelView({
            model:pararchive.story,
        })
        this.top.show(storypanel);
    },

    hideStoryPanel:function()
    {
        this.top.empty();  
    },

    showSavedBlock:function()
    {
        var savedblock = new SavedBlockView({});
        this.main.show(savedblock);
    },

    showViewFooter:function()
    {
        var viewfooter = new ViewFooterView({
            model:pararchive.story,
        });
        pararchive.footer.show(viewfooter);
        pararchive.footer.$el.removeClass('out');
    },

    showViewStory:function()
    {
        var storyfront = new StoryFrontView({
            model:pararchive.story,
        });
        pararchive.main.show(storyfront);
        pararchive.footer.$el.addClass('out');
        this.hideStoryPanel();
    },

    showViewBlock:function()
    {
        console.log("App\t\t\tshowViewBlock");        
        var viewblock = new BlockView({
            model:pararchive.story,
        });
        this.main.show(viewblock);
        this.showViewFooter();
        this.showHeader();
    },
});
