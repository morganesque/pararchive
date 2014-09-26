var App = Marionette.Application.extend({

    regions: {
        top:'#top',
        main:'#main',
    },

    initialize:function()
    {                
        console.log('App initialize');        

        // create the controller.
        this.controller = new Controller();

        // create the router
        this.router = new Router({controller: this.controller});

        // first create a user object.
        this.user = new Model();
        this.user.urlRoot = '/api/users/';

        // set the initial state.
        this.state = new Backbone.Model({state:'waiting'});

        // set up the stories model.
        this.stories = new Backbone.Model({urlRoot:"/api/stories/"}); 

        // start a story.
        this.story = new Story();

        // create the artefacts object.
        this.artefacts = new Artefacts();
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
});