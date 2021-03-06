var App = Marionette.Application.extend({

    regions: {
        header:'#header',
        top:'#top',
        main:'#main',
        footer:'#footer',
    },

    initialize:function()
    {
        // console.log('App:Initialize');
        // console.log('App:Initialize');

        // First create a user object.
        this.user = new User();     

        // create the nav controller.
        this.nav = new NavController();

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

    showAllStories:function()
    {
        var storiesview = new AllStoriesView({
            collection:pararchive.allStories,
        }); 
        pararchive.main.show(storiesview);  
        this.top.empty();  
        this.vent.trigger('footer:hide');
    },

    showYourStories:function()
    {
        var storiesview = new YourStoriesView({
            collection:this.user.stories,
        });
        this.top.empty();
        this.main.show(storiesview);
        this.vent.trigger('footer:hide');
    },

    showEditStory:function()
    {
        var storyview = new StoryListView({
            collection:this.story,
        });
        this.main.show(storyview);
        this.showStoryPanel('edit');
    },

    showEditBlock:function()
    {
        var editblock = new EditBlockView({
            model:this.story,
        });
        this.main.show(editblock);
        this.showStoryPanel('block');
        this.vent.trigger('footer:hide');
    },

    showStoryPanel:function(state)
    {
        var storypanel = new StoryPanelView({
            collection:this.story,
        })
        this.top.show(storypanel);
        storypanel.setState(state)
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
        this.vent.trigger('footer:show');
    },

    showViewStory:function()
    {
        var storyfront = new StoryFrontView({
            model:this.story.meta,
        });
        this.main.show(storyfront);
        this.top.empty();  
        this.vent.trigger('footer:hide');
    },

    showViewBlock:function()
    {
        // console.log("App\t\t\tshowViewBlock");        
        var viewblock = new ViewBlockView({
            model:this.story,
        });
        this.main.show(viewblock);
        this.top.empty();  
        this.showViewFooter();
    },
});
