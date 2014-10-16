
var Tag = Backbone.Model.extend(
{
	urlRoot:'/api/tags/',
});

var Tags = Backbone.Collection.extend({

	model:Tag,
	blockID:undefined,

	addTag:function(text,type)
    {       
        // console.log("Tags\taddTag");        
        // console.log(this.blockID);        
        if (!this.blockID) 
		{
			alert('Tags Model - Not picked a block yet!');
			return;
		}

		var bid = this.blockID;

        var newtag = this.add({
            tag: text,
            block_id: bid,
            type:type,
        });

        newtag.save({},{success:function()
        {
            
        },error:function()
        {
            
        }});
    },

	url: function()
    {
    	// console.log("url: "+this.blockID);		
    	if (!this.blockID) 
		{
			console.log('Tags Model - Not picked a block yet!');
		}
    	var url = '/api/blocks/'+this.blockID+'/tag/';
    	return url;
    },
});