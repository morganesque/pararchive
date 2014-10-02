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

        // First create a user object.
        this.user = new User();     

        // create the nav controller.
        this.nav = new NavController({user:this.user});

        // Create the edit controller.
        this.controller = new EditController();
        // Create the edit router.
        this.router = new EditRouter({controller: this.controller});

        // Create the view controller.
        this.viewcontroller = new ViewController();
        // Create the view router.
        this.viewrouter = new ViewRouter({controller: this.viewcontroller});

        // start a story.
        this.story = new Story();

        // a model to fetch all the stories.
        this.allStories = new AllStories();
    },

    showHeader:function()
    {
        var header = new HeaderView({
            model:this.story
        });
        header.render();
    },

    showIdentity:function()
    {
        var identity = new IdentityView({
            model:this.user,
        })
        identity.render();
        // this.header.show(identity);
    },

    showYourStories:function()
    {
        console.log("App\t\t\tshowYourStories");        
        var storiesview = new YourStoriesView({
            model:this.user.stories,
        });
        this.top.empty();
        this.main.show(storiesview);
        this.vent.trigger('hidestory');
    },

    showEditStory:function()
    {
        var storyview = new StoryListView({
            model:this.story,
        });
        this.main.show(storyview);
        this.showStoryPanel();
    },

    showEditBlock:function()
    {
        console.log("App\t\t\tshowEditBlock");        
        var editblock = new EditBlockView({
            model:this.story,
        });
        this.main.show(editblock);
    },

    showStoryPanel:function()
    {
        var storypanel = new StoryPanelView({
            model:this.story,
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
            model:this.story,
        });
        this.footer.show(viewfooter);
        this.footer.$el.removeClass('out');
    },

    showViewStory:function()
    {
        var storyfront = new StoryFrontView({
            model:this.story,
        });
        this.main.show(storyfront);
        this.footer.$el.addClass('out');
        this.hideStoryPanel();
    },

    showViewBlock:function()
    {
        console.log("App\t\t\tshowViewBlock");        
        var viewblock = new ViewBlockView({
            model:this.story,
        });
        this.main.show(viewblock);
        this.showViewFooter();
    },
});
