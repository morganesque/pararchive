var PararchiveRouter = Backbone.Router.extend({

    pages:[],
    order: ['what','when','where','arte','done'],

    initialize: function()
    {
        console.log('Welcome to Pararchive');
        this.main = $('#main');
    },

    currentPage:null,

    /*
        Done before it calls any of the specific page functions.
    */      
    execute: function(callback, args)
    {   
        this.currentPage = null;        

        if (Backbone.history.fragment == 'next/') alert("Danger Will Robinson!\nYou shouldn't be coming to /next/ directly!!!");
        console.log('page: /'+Backbone.history.fragment);               

        // take it to bakersfield!
        window.scrollTo(0,0);        

        // go and do the normal routing thing.
        if (callback) callback.apply(this, args);

        // If after that there's a current page get it going!
        if (this.currentPage) 
        {
            // put contents of view into the page.
            this.main.html(this.currentPage.el);
            // kick off any rendering (updating) that the view needs to do.
            this.currentPage.render();
            // make sure the page captures events
            this.currentPage.delegateEvents();
            
            // make sure the control changes it's state if necessary.
            // pararchive.control.update();
        }
    },

    /*
        This is generally what happens for all pages 
        except a few which need a little more logic.
    */      
    normalPage:function(name,pageType,args)
    {
        // console.log("normalPage: "+name);        
        if (!this.pages[name])
        {            
            // console.log(name+" doesn't already exist");        
            this.pages[name] = new pageType(args);
            this.pages[name].build();           
        } 
        this.currentSlug = name;
        this.currentPage = this.pages[name];    
    },

    /*
        This just redirects the user to the main page again
        and is used because this allows a proper form submission
        on the login for which enables the browser to remember the 
        login details in it's default way.
    */        
    in:function()
    {
        window.location.href = '/';
    },



    refresh:function(story,block)
    {
        pararchive.router.navigate('/story/'+story+'/block/'+block+'/',{trigger:true});  
    },

    doChecks:function(story,block)
    {
        var yourstory = this.checkStory(story);         
        var newstory  = this.checkNewStory(story);                        

        if (!yourstory) 
        {
            alert('This is not your story!');
            pararchive.router.navigate('/',{trigger:true});
            return false;
        }           

        if (newstory || pararchive.story.length == 0)
        {
            // console.log("loading a new story: "+story);        
            pararchive.story.setStoryID(story);            
            pararchive.story.setBlock(block);
            pararchive.story.startEditting(function()
            {
                // console.log('new story loaded');        
                pararchive.router.navigate('/refresh/'+story+'/'+block+'/',{trigger:true});
            });
            return false;
        }        

        storyBlock = this.checkBlock(block);

        if (!storyBlock)
        {
            console.log('Story and block mismatch.')
            pararchive.router.navigate('/story/'+story+'/',{trigger:true});
            return false;
        }

        return true;
    },

    checkStory:function(sid)
    {
        var usid = pararchive.user.get('latest_story');
        if (usid !== sid) return false;
        else return true;    
    },

    checkNewStory:function(story)
    {
        var sid = pararchive.story.getStoryID();
        if (sid !== story) return true;
        else return false;
    },

    checkBlock:function(block)
    {
        if (block == 'new') return true;
        else {
            var b = pararchive.story.get(block);
            if (b) return true;
            else return false;    
        }
    },

});
