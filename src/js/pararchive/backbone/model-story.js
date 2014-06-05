var Story = Backbone.Collection.extend({
    
    model:StoryBlock,
    storyID:undefined,
    blockID:undefined,

    initialize:function(options)
    {
    	if (options && options.storyID) this.storyID = options.storyID;
    },

    startEditting:function(id,callback)
    {
        // console.log("startEditting: "+id);        
        var self = this;
        
        this.setStoryID(id);
        this.fetch({reset:true,success:function()
        {
            if (self.length) self.setBlock();
            else self.addBlock(); 

            callback();
        }});
    },

    startReading:function(id,callback)
    {
        // console.log("startEditting: "+id);        
        var self = this;
        
        this.setStoryID(id);
        this.fetch({reset:true,success:function()
        {
            callback();
        }});
    },

    addBlock:function()
    {
        var newBlock = this.add({"story_id":this.storyID});
        this.setBlock(newBlock.cid);  
    },

    setStoryID:function(id)
    {
        var self = this;
    	this.storyID = id;
        this.meta = new StoryMeta({id:id});
        this.meta.fetch({success:function(a)
        {
            self.trigger('meta'); // adds the story title to the storyPanel.
        }});
    },

    setBlock:function(id)
    {
        if (id) this.blockID = id;
        else this.blockID = this.first().get('id');

        // console.log(['this.blockID',this.blockID]);        

        this.trigger('block');
    },
    
    getBlock:function()
    {
        if (this.blockID) return this.get(this.blockID);
        else return this.first();
    },

    getLastBlock:function()
    {
        return this.last();
    },

    url: function()
    {
    	if (!this.storyID) alert('Not picked a story yet!');
    	return '/api/blocks/?story_id='+this.storyID;
    }
});