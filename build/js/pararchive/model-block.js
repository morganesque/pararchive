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
        this.tags = new Tags();
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
        var self = this;
        newArte.save({},{success:function(a,b,c)
        {
            // console.log('Saved\tArtefact');        
            // console.log('StoryBlock\tDoneSaveArtefact');        
            // console.log(a,b,c);        
        },error:function(a,b,c)
        {
            // console.log(a,b,c); 
            a.destroy();       
            self.trigger('artefacts');
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
            console.log("StoryBlock\tThis block is still new so not loading notes.");        
        }        
    },

    loadTags:function()
    {
        // console.log("StoryBlock\tloadNotes");        
        if (!this.isNew())
        {
            // console.log("StoryBlock\tloadArtefacts "+this.get('id'));        
            var id = this.get('id');
            this.tags.blockID = id;
            this.tags.fetch({reset:true,success:_.bind(function(a,b,c)
            {
                this.trigger('tags');
            },this)});    
        } else {
            console.log("StoryBlock\tThis block is still new so not loading notes.");        
        }        
    },
});