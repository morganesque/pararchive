
var Comment = Backbone.Model.extend(
{
	urlRoot:'/api/comment/',
});

var Comments = Backbone.Collection.extend({

	model:Comment,
	blockID:undefined,

	url: function()
    {
    	// console.log("url: "+this.blockID);		
    	if (!this.blockID) 
		{
			console.log('Artfacts Model - Not picked a block yet!');
		}
    	var url = '/api/blocks/'+this.blockID+'/comment/';
    	return url;
    },
});