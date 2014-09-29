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
        this.user = new Model();
        this.user.urlRoot = '/api/users/';

        // set the initial state.
        this.state = new Backbone.Model({state:'waiting'});

        // set up the stories model.
        this.stories = new Stories();

        // start a story.
        this.story = new Story();

        // create the artefacts object.
        this.artefacts = new Artefacts();
    },

    showIdentity:function()
    {
        var identity = new IdentityView({
            model:pararchive.user,
        })
        identity.render();
        // this.header.show(identity);
    },

    showEditBlock:function()
    {
        var editblock = new EditBlockView({
            model:pararchive.story.getBlock(),
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

    showSavedBlock:function()
    {
        var savedblock = new SavedBlockView({});
        this.main.show(savedblock);
    },   

    showViewFooter:function()
    {
        var viewfooter = new ViewFooterView({
            model:new Backbone.Model(),
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
    },

    showViewBlock:function()
    {
        var viewblock = new BlockView({
            model:pararchive.story.getBlock(),
        });
        this.main.show(viewblock);
        this.showViewFooter();
    }, 
});