/*
   Model for a single piece of story meta data. 

   HACK -- This is the same as a StoryModel 
   (see model-user.js) but I'm not convinced 
   I can user them interchangabley right now.
*/        
var StoryMeta = Model.extend(
{
    urlRoot:"/api/stories/"
});
/*
    A collection of StoryBlock's that make up the Story.
*/        
var Story = Backbone.Collection.extend({

    model:StoryBlock,
    storyID:undefined,
    block:undefined,
    comparator:'order',

    initialize:function(options)
    {        
    	if (options && options.storyID) this.storyID = options.storyID;        
        this.meta = new StoryMeta();
    },    

    /*
        Right at the start it uses the Story ID
        to fetch all the blocks before passing
        over to router.js to do the rest.
        (if no blocks - create a new empty one)
    */
    loadStory:function(callback)
    {
        // console.log("loadStory");        
        // console.log(this);        
        this.fetch({reset:true,success:function(a,b,c)
        {
            // console.log(a,b,c);        
            if (callback) callback();
        },error:function()
        {
            // console.log('error loading story!');           
        }});
    },

    addBlock:function()
    {
        // console.log("Story\t\taddBlock");
        var newBlock = this.add({"story_id":this.storyID,order:this.length});
        this.setBlock(newBlock.cid);
    },

    setStoryID:function(id)
    {
        // console.log("Story\tsetStoryID "+id);
        if (String(id).substr(0,1)=='c')
        {
            this.storyID = id;
            var meta = pararchive.user.stories.get(id);
            if (typeof meta !== "undefined")
            {  
                this.setStoryMeta(meta.toJSON());
            }
        } else {
            var self = this;
            this.storyID = id;
            this.meta.set({id:id});
            this.meta.fetch({success:function(a)
            {
                self.trigger('meta'); // adds the story title to the storyPanel.                
            }});
        }
    },

    setStoryMeta:function(sm)
    {
        this.meta.set(sm);
        var sid = this.meta.get('id');
        if (sid) this.storyID = sid;
        this.trigger('meta');
    },

    setBlock:function(id)
    {
        // console.log('Story\t\tsetBlock '+id);
        if (id) this.block = this.get(id);
        else if (this.length) this.block = this.first();

        this.trigger('block');         
        this.block.loadArtefacts();        
        this.block.loadNotes();        
        this.block.loadTags();            
    },

    /*
        Sets the block based on it's index (when reading the story)
        Always pass in the URL value
    */
    setBlockByIndex:function(bin)
    {
        var block = this.at(bin-1);
        if (block)
        {
            var id = block.get('id');
            this.setBlock(id); 

        } else alert('There is no block at '+(bin-1));
    },

    getBlock:function()
    {
        if (this.block) return this.block;
        else return this.first();
    },

    getNextBlock:function()
    {
        var block = this.getBlock();
        var i = this.indexOf(block);
        if (i < this.length-1) return i+1;
        else return false;
    },

    getPrevBlock:function()
    {
        var block = this.getBlock();
        var i = this.indexOf(block);
        if (i > 0) return i+1;
        else return false;
    },

    url: function()
    {
        // console.log(this.storyID);        
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
