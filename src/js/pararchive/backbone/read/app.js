var App = Backbone.View.extend(
{        
    initialize: function(options) 
    {
		// set up the Backbone router // router.js
		this.router = new Router;

		// first create a User object.
	    // this.user = new Model();
	    // this.user.urlRoot = '/api/users/';		

	    // set the initial state.
	    this.state = new Backbone.Model({state:'reading'});

	    // set up the stories model.
        this.stories = new StoryMeta();	

		// start a story.
		this.story = new Story();

        this.artefacts = new Artefacts();

        this.listenTo(this.state, "change:state", this.onChangeState)
        this.listenTo(this.story, "block", this.changeBlock)

        this.nav = new Nav({
            model:this.story,
            el:$('#navblock'),
        });

        this.readblock = new ReadBlock({
            model:this.story,
            el:$('#readblock'),
            artefacts:this.artefacts,
        });
    },  

    changeBlock:function()
    {       
        // console.log("changeBlock: "+this.story.blockID);         
        
        // go and load the artefacts for this block
        this.artefacts.selectBlock(this.story.blockID);

        // if (pararchive.router.currentPage) pararchive.router.currentPage.render();
    },
    
    onChangeState:function(e)
    {	    		
        var state = pararchive.state.get('state');
        console.log("onChangeState "+state);        
    }
});