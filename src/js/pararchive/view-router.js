var ViewRouter = Backbone.Marionette.AppRouter.extend(
{       
    appRoutes: {
        "view/:storyname/":                   "viewStory",        
        "view/:storyname/:block_id/":         "viewBlock",
        "view/:storyname/:block_id/credits/": "viewStoryCredits",    
    }
});