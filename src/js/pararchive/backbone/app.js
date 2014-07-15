var App = Backbone.View.extend(
{        
    initialize: function(options) 
    {
		// set up the Backbone router // router.js
		this.router = new Router;

		// first create a User object.
	    this.user = new Model();
	    this.user.urlRoot = '/api/users/';		

	    // set the initial state.
	    this.state = new Backbone.Model({state:'login'});

	    // set up the stories model.
        this.stories = new StoryMeta();	

		// start a story.
		this.story = new Story();

        this.artefacts = new Artefacts();

		// attach story to story panel.
		this.storyPanel = new StoryPanel(
        {
			model:this.story,
			el:$('#storyPanel')
		});	

        this.viewStory = new StoryView();

        // attach the control panel.
		this.control = new Control(
		{
			el:$('#control'),
			user:this.user,
            artefacts:this.artefacts,
		});

        this.listenTo(this.state, "change:state", this.onChangeState)
        this.listenTo(this.story, "block", this.changeBlock)

        this.control.hide();
        this.storyPanel.hide();
    },  

    changeBlock:function()
    {       
        // console.log("changeBlock: "+this.story.blockID);

        // tell the control panel about the block
    	this.control.addModel();
        // tell the story panel about the block
        this.storyPanel.selectBlock(this.story.blockID);
        // go and load the artefacts for this block
        this.artefacts.selectBlock(this.story.blockID);

        if (pararchive.router.currentPage) pararchive.router.currentPage.render();
    },
    
    onChangeState:function(e)
    {	    		
        var state = pararchive.state.get('state');
        // console.log(['onChangeState',state]);        
    	switch(state)
    	{
    		case "login":
            case "viewing":
    			this.control.hide();
    			this.storyPanel.hide();
    		break;

    		case "editing":
    			this.control.show();
    			this.storyPanel.show();
    		break;
    	}
    }
});