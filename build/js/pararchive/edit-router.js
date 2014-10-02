var EditRouter = Backbone.Marionette.AppRouter.extend(
{       
    appRoutes: {
        "":       	"home",
        "login/": 	"login",
        "in/":    	"in",

        ":username/": 										  "yourStories", 
        ":username/story/:story_id/edit/":                    "editStory",        
        ":username/story/:story_id/block/:block_id/edit/":    "editBlock",
        ":username/story/:story_id/block/:block_id/saved/":   "savedBlock",

        "*undefined":                               "show404Error"        
    }
});