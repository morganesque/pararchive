var EditRouter = Backbone.Marionette.AppRouter.extend(
{       
    appRoutes: {
        "":                                         "home",
        "login/":                                   "login",
        "in/":                                      "in",

        "edit/story/:story_id/":                         "editStory",        
        "edit/story/:story_id/block/:block_id/":         "editBlock",
        "edit/story/:story_id/block/:block_id/saved/":   "savedBlock",

        "*undefined":                               "show404Error"        
    }
});