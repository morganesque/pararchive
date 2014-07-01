var Router = Backbone.Router.extend({

    pages:[],

    initialize: function()
    {
        console.log('Welcome to Pararchive');
        this.main = $('#main');
    },

    currentPage:null,

    routes: {
        "read/story/:story/": "storyRedirect",
        "read/story/:story/start/": "storyStart",
        "read/story/:story/end/": "storyEnd",
        "read/story/:story/block/:block/": "storyblock",        
        "*undefined": "show404Error"
    },

    /*
        Done before it calls any of the specific page functions.
    */      
    execute: function(callback, args) 
    {   
        console.log('page: /'+Backbone.history.fragment);               
        // console.log(callback);        

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
            pararchive.control.update();
        }
    },

    storyRedirect:function(story)
    {
        var href = '/read/story/'+story+'/start/';
        pararchive.router.navigate(href,{trigger:true});
    },

    storyStart:function(story)
    {
        this.storyOnly(story,'start');
    },

    storyEnd:function(story)
    {
        this.storyOnly(story,'end');
    },

    storyOnly:function(story, which)
    {        
        pararchive.story.startReading(story,function()
        {
            var name = pararchive.story.meta.get('name');
            if (which == 'start') pararchive.readblock.render({when:'start',what:name,where:''});
            if (which == 'end') pararchive.readblock.render({when:'Fin',where:'',what:''});
            
            pararchive.nav.setCurrent(which);
            pararchive.artefacts.reset();
            pararchive.readblock.onArtefacts();
        });
    },

    /*
        This is generally what happens for all pages 
        except a few which need a little more logic.
    */      
    storyblock:function(story,block)
    {
        // console.log("storyblock: "+story+' '+block);                

        pararchive.story.startReading(story,function(){
            pararchive.story.setBlock(block);
        });        
    },

    show404Error:function()
    {
        this.currentPage = null;
        this.main.html('<div class="container">404 page not found</div>');
    },

});