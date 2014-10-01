
var Artefact = Backbone.Model.extend(
{
	urlRoot:'/api/artefacts/',
});

var Artefacts = Backbone.Collection.extend({

	model:Artefact,
	blockID:undefined,
	fetched:false,

	selectBlock:function(id,callback)
	{
		console.log("Artefacts\tselectBlock: "+id);		
		if (!this.fetched)
		{
			this.blockID = id;	
			this.reset();
			var self = this;
			this.fetch({success:_.bind(function()
			{
				this.fetched = true;
				callback();
			},this)});
		} else {
			callback();
		}

	},

	url: function()
    {
    	// console.log("url: "+this.blockID);		
    	if (!this.blockID) 
		{
			console.log('Artfacts Model - Not picked a block yet!');
		}
    	var url = '/api/artefacts/?block_id='+this.blockID;
    	return url;
    },
});