var Router = Backbone.Router.extend({

    pages:[],

    order: ['what','when','where','arte','done'],

    initialize: function()
    {
        console.log('Welcome to Pararchive');
        this.main = $('#main');
    },

    currentPage:null,

    routes: {
        "":                         "home",
        "login/":                   "login",
        "in/":                      "in",
        "what/":                    "what",
        "when/":                    "when",
        "arte/":                    "arte",
        "arte/:type/":              "arteType",
        "arte/edit/:id/":           "arteEdit",
        "arte/search/:query/":      "arteSearch",
        "where/":                   "where",
        "next/":                    "next",
        "done/":                    "done",
        "view/story/:story/":        "viewStory",
        "*undefined":               "show404Error"
    },

    /*
        Done before it calls any of the specific page functions.
    */      
    execute: function(callback, args) 
    {   
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
            pararchive.control.update();
        }
    },

    /*
        This is generally what happens for all pages 
        except a few which need a little more logic.
    */      
    normalPage:function(name,pageType,args)
    {
        // console.log("normalPage");        
        if (!this.pages[name])
        {            
            this.pages[name] = new pageType(args);
            this.pages[name].build();           
        } 
        this.currentSlug = name;
        this.currentPage = this.pages[name];    

    },

    in:function()
    {
        window.location.href = '/';
    },

    login:function()
    {
        // console.log("Router login");     
        
        var self = this;    

        if (!this.loginPage)
        {
            this.loginPage = new PageLogin();
            this.loginPage.build();         
        } 
        this.currentPage = this.loginPage;
    },

    home: function()
    {
        this.normalPage('home',PageHome);   
    },

    what: function()
    {
        this.normalPage('what',PageWhat);   
        pararchive.state.set('state','editing');
    },

    when: function()
    {
        this.normalPage('when',PageWhen);   
        pararchive.state.set('state','editing');
    },

    arte: function()
    {
        this.normalPage('arte',PageArte);   
        pararchive.state.set('state','editing');
    },

    where: function()
    {
        this.normalPage('where',PageWhere); 
        pararchive.state.set('state','editing');
    },

    done: function()
    {
        this.normalPage('done',PageDone);   
        pararchive.state.set('state','editing');
    },
    

    /*
        This allow one step of the process to pass the decision 
        as to what to do next off to the router instead of having 
        that within the page itself. Abstraction shall set ye free!
    */      
    next:function()
    {
        if (this.currentSlug)
        {       
            var i = this.order.indexOf(this.currentSlug);
            var j = i+1; if (j == this.order.length) j = 0; // loop if necessary.
            pararchive.router.navigate('/'+this.order[j]+'/',{trigger:true});
            
        } else {
            pararchive.router.navigate('/what/',{trigger:true});
        }
    },

    arteType:function(type)
    {        
        this.normalPage(type,PageArtefact,{slug:type});    
        pararchive.state.set('state','editing');
    },

    arteEdit:function(id)
    {
        this.normalPage('arte-edit-'+id,PageEditArtefact,{id:id});    
        pararchive.state.set('state','editing');  
    },

    arteSearch:function(query)
    {
        query = query.replace(/\++/g,' ');  
        this.normalPage('arte-search',PageSearchArtefact,{query:query});          
        pararchive.state.set('state','editing');  
    },

    viewStory:function(story_id)
    {
        this.normalPage('viewStory',PageViewStory,{story_id:story_id});       
        pararchive.state.set('state','viewing');  
    },

    show404Error:function()
    {
        this.currentPage = null;
        this.main.html('<div class="container">404 page not found</div>');
    },

});
