var ComponentView = Backbone.View.extend(
{        
    initialize: function(options) 
    {
        this.listenTo(this.model, "change", this.update)
    },  
    
    update: function()
    {
    	// console.log("ActuateComponent doRender");		
    	this.render();
    	this.trigger('rendered');
    }
});