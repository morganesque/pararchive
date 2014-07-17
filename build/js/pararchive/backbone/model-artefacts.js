var Artefacts = Backbone.Collection.extend({

	model:Artefact,
	blockID:undefined,
	fetching:false,
	fetched:false,

	selectBlock:function(id)
	{
		// console.log("selectBlock: "+id);		
		this.blockID = id;		
		this.getData();
	},

	getData:function()
	{
		// console.log("Artefacts getData");		
		if (this.fetching) 
		{
			// console.log('Artefacts - already fetching artefacts');		
			return;
		}

		if (this.fetched) {
			// console.log('already fetched triggering change');		
			// this.trigger('change');
		}

		var self = this;
		this.fetching = true;
		this.fetch({reset:true,success:function(a,b,c)
		{
			self.fetching = false;
			self.fetched = true;
			// self.trigger('artefacts');
			// console.log('Artefacts - got artefacts');		
		}});
	},

	url: function()
    {
    	// console.log("url: "+this.blockID);		
    	if (!this.blockID) alert('Artfacts Model - Not picked a block yet!');
    	return '/api/artefacts/?block_id='+this.blockID;
    },
});