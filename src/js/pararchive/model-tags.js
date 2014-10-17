
var Tag = Backbone.Model.extend(
{
	urlRoot:'/api/tags/',
});

var Tags = Backbone.Collection.extend({

	model:Tag,
	blockID:undefined,
    block:undefined,

    initialize:function(items,options)
    {
        this.block = options.block;
    },

	addTag:function(text,type)
    {       
        // console.log("Tags\taddTag");        
        // console.log(this.block.id);        
        if (!this.block.id) 
		{
			alert('Tags Model - Not picked a block yet!');
			return;
		}

		var bid = this.block.id;

        var newtag = this.add({
            tag: text,
            block_id: bid,
            type:type,
        });

        newtag.save({},{success:_.bind(function(a,b,c)
        {
            this.block.trigger('tags');
            
        },this),error:function()
        {
            
        }});
    },

	url: function()
    {
    	// console.log("url: "+this.block.id);		
    	if (!this.block.id) 
		{
			console.log('Tags Model - Not picked a block yet!');
		}
    	var url = '/api/blocks/'+this.block.id+'/tag/';
    	return url;
    },
});