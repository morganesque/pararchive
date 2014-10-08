/*
    Model for a single story block.
*/        
var StoryBlock = Backbone.Model.extend(
{
    urlRoot:"/api/blocks/",
    artefacts:undefined,    

    initialize:function()
    {
        this.artefacts = new Artefacts();
        this.notes = new Notes();
    },

    loadArtefacts:function()
    {
        if (!this.isNew())
        {
            // console.log("StoryBlock\tloadArtefacts "+this.get('id'));        
            var id = this.get('id');
            this.artefacts.selectBlock(id,_.bind(function()
            {   
                this.trigger('artefacts');
            },this));    
        } else {
            console.log("StoryBlock\tThis block is still new so not loading artefacts.");        
        }
    },

    addArtefact:function(url)
    {
        // console.log("StoryBlock\taddArtefact");        
        var newArte = this.artefacts.add(
        {
            block_id:this.get('id'),
            url:url,
        });
        newArte.save({},{success:function(a,b,c)
        {
            // console.log('Saved\tArtefact');        
            // console.log('StoryBlock\tDoneSaveArtefact');        
            // console.log(a,b,c);        
        },error:function(a,b,c)
        {
            // console.log(a,b,c);        
            alert(b.responseText);        
        }});
    },

    loadNotes:function()
    {
        // console.log("StoryBlock\tloadNotes");        
        if (!this.isNew())
        {
            // console.log("StoryBlock\tloadArtefacts "+this.get('id'));        
            var id = this.get('id');
            this.notes.blockID = id;
            this.notes.fetch({reset:true,success:_.bind(function(a,b,c)
            {
                this.trigger('notes');
            },this)});    
        } else {
            console.log("StoryBlock\tThis block is still new so not loading artefacts.");        
        }        
    },
});

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
        var self = this;
        this.fetch({reset:true,success:function()
        {
            if (callback) callback();
        }});
    },

    addBlock:function()
    {
        // console.log("Story\t\taddBlock");
        var newBlock = this.add({"story_id":this.storyID});
        this.setBlock(newBlock.cid);
    },

    setStoryID:function(id)
    {
        var self = this;
    	this.storyID = id;
        this.meta.set({id:id});
        this.meta.fetch({success:function(a)
        {
            self.trigger('meta'); // adds the story title to the storyPanel.
        }});
    },

    setStoryMeta:function(sm)
    {
        this.meta.set(sm);
        this.storyID = this.meta.get('id');
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
        var i = this.indexOf(block); console.log(i,this.length,(i+1));
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
