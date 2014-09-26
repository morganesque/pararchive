var Router = Backbone.Marionette.AppRouter.extend(
{       
    appRoutes: {
        "":                                         "home",
        "login/":                                   "login",
        "in/":                                      "in",

        "story/:story_id/":                         "editStory",        
        "story/:story_id/block/:block_id/":         "editBlock",
        "story/:story_id/block/:block_id/saved/":   "savedBlock",

        // "story/:story_id/read/":                    "read",

        "*undefined":                               "show404Error"        
    }
});