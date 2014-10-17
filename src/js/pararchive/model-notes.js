
var Note = Backbone.Model.extend(
{
	urlRoot:'/api/note/',
});

var Notes = Backbone.Collection.extend({

	model:Note,
	blockID:undefined,

	addNote:function(message)
    {       
        if (!this.blockID) 
		{
			alert('Notes Model - Not picked a block yet!');
			return;
		}

		var bid = this.blockID;

        var newcom = this.add({
            note: message,
            block_id: bid,
        });

        newcom.save({},{success:function()
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
			// console.log('Notes Model - Not picked a block yet!');
		}
    	var url = '/api/blocks/'+this.blockID+'/note/';
    	return url;
    },
});