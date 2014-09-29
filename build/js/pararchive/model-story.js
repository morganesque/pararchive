
var StoryBlock = Backbone.Model.extend(
{
    urlRoot:"/api/blocks/",
});

var StoryMeta = Model.extend(
{
    urlRoot:"/api/stories/"
});

var Story = Backbone.Collection.extend({
    
    model:StoryBlock,
    storyID:undefined,
    blockID:undefined,

    initialize:function(options)
    {
    	if (options && options.storyID) this.storyID = options.storyID;
    },

    /*
        Right at the start it uses the Story ID
        to fetch all the blocks before passing 
        over to router.js to do the rest.
        (if no blocks - create a new empty one)
    */        
    loadStory:function(callback)
    {        
        // console.log("loadStory",this.storyID,this.blockID);        
        var self = this;
        this.fetch({reset:true,success:function()
        {
            // self.setBlock(self.blockID); // think this is being done manually now - no need for it here.
            if (callback) callback();
        }});
    },

    addBlock:function()
    {
        console.log("Story::addBlock");        
        var newBlock = this.add({"story_id":this.storyID});
        this.setBlock(newBlock.cid);  
    },

    getStoryID:function()
    {
        return this.storyID;
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

    setStoryMeta:function(sm)
    {   
        this.meta = new StoryMeta(sm);     
        this.storyID = this.meta.get('id');
        this.trigger('meta');
    },

    setBlock:function(id)
    {
        console.log('Story:setBlock '+id);        
        if (id) this.blockID = id;
        else if (this.length) this.blockID = this.first().get('id');
        // else this.addBlock(); // dont' think we need to do this anymore - things aren't going to be that automated. 
        
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
    	if (!this.storyID) 
        {
            alert('Not picked a story yet!');
            throw new Error('fricken huck!');
        }
    	return '/api/blocks/?story_id='+this.storyID;
    },

    getLastWhenWhere:function(data)
    {
        if (this.length > 1)
        {
            var data = this.at(this.length-2);        
            return {
                'when': data.get('when'),
                'where': data.get('where'),
            }    
        }
        
    },
});