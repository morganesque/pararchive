var Router = PararchiveRouter.extend({

    routes: {
        "":                                         "home",
        "login/":                                   "login",
        "in/":                                      "in",

        "story/:story_id/":                         "story",
        "story/:story_id/read/":                    "read",
        "story/:story_id/block/:block_id/":         "block",
        "story/:story_id/block/:block_id/saved/":   "saved",

        "refresh/:story_id/:block_id/":             "refresh",

        "*undefined":                               "show404Error"
    },

    login:function()
    {
        // console.log("Router login");     
        
        var self = this;    

        if (!this.loginPage)
        {
            this.loginPage = new LoginPage();
            this.loginPage.build();         
        } 
        this.currentPage = this.loginPage;
    },

    home: function()
    {
        console.log('your-stories');        
        this.normalPage('your-stories',YourStoriesPage);   
    },

    story:function(story)
    {
        // console.log("router story");        
        // var self = this;

        if (!this.checkStory(story)) return; // belongs to the user

        pararchive.state.set('state','story-list');
        this.normalPage('story-list',StoryListPage);

        pararchive.story.setStoryID(story);
        pararchive.story.startEditting(function()
        {
            
        });
    },

    block:function(story,block)
    {      
        if (this.doChecks(story,block))
        {
            pararchive.story.setBlock(block);
            
            pararchive.state.set('state','edit-block');
            this.normalPage('edit-block',EditBlockPage);    
        }          
        // console.log('router::block');        
        

        // pararchive.story.setStoryID(story);
        // pararchive.story.setBlock(block);
        // pararchive.story.startEditting(function()
        // {
        //     if (pararchive.story.length < 1) pararchive.story.addBlock();
        // });
    },

    saved:function(story,block)
    {        
        pararchive.state.set('state','saved-block');
        this.normalPage('saved-block',SavedBlockPage);
        pararchive.story.setStoryID(story);
        pararchive.story.startEditting(function()
        {
            pararchive.story.setBlock(block);
        });
    },

    read:function(story)
    { 
        pararchive.state.set('state','read-story');
        pararchive.story.setStoryID(story);
        pararchive.viewStory.setStoryID(story);
        this.normalPage('read-story',ReadStoryPage);
    },

});
