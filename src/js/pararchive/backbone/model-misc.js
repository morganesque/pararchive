var StoryBlock = Backbone.Model.extend({
    urlRoot:"/api/blocks/",
});

var UserStory = Backbone.Model.extend({});

var StoryMeta = Model.extend({
    urlRoot:"/api/stories/"
});

var Artefact = Backbone.Model.extend({
	urlRoot:'/api/artefacts/',
});

var Artefacts = Backbone.Collection.extend({

	model:Artefact,
	blockID:undefined,
	fetching:false,
	fetched:false,

	selectBlock:function(id)
	{
		this.blockID = id;		
		this.getData();
	},

	getData:function()
	{
		if (this.fetching) return;

		var self = this;
		this.fetching = true;
		this.fetch({success:function(a,b,c)
		{
			// console.log('fetched the artfacts');
			// console.log(a);		
			// console.log([a,b,c]);
			this.fetching = false;
			this.fetched = true;
			self.trigger('artefacts');
		}});
	},

	url: function()
    {
    	// console.log("url: "+this.blockID);		
    	if (!this.blockID) alert('Artfacts Model - Not picked a block yet!');
    	return '/api/artefacts/?block_id='+this.blockID;
    },
});