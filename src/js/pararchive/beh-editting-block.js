window.Behaviors.EdittingBlock = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        'click .next__button':      'saveAndGo',
        'click #artefacts':         'addArtefact',
        'click #save-artefact':     'saveArtefact',
        'click #cancel-artefact':   'cancelArtefact',
        "click #delete-block":      'onDeleteBlock',        
    },    

    saveAndGo:function(e)
    {
        e.preventDefault();
        e.stopPropagation();        

        this.saveStoryBlock(function(model)
        {
            var bid = model.get('id');
            var sid = model.get('story_id');            
            pararchive.nav.savedBlock(sid,bid);
        }); 
    },

    addArtefact:function(e)
    {
        e.preventDefault();
        /*
            First save the block so you've got a proper ID to attach artefacts to.
        */            
        var self = this;
        this.saveStoryBlock(function(model) 
        {      
            self.view.ui.addarte.addClass('show');
        }); 
    },    

    saveStoryBlock:function(callback)
    {
        var data = {
            "what": this.view.fields()['what'].val(),
            "when": this.view.fields()['when'].val(),
            "where": this.view.fields()['where'].val(),
            // "order": pararchive.story.length-1,
        }        

        // if (this.view.block.isNew())
        // {
        //     console.log(this.view.block);       
        // }

        if(this.view.block)
        {
            this.view.block.save(data,{success:function(model,response,options)
            {       
                // make sure you set the newly saved block ID (replace the temp one).
                var bid = model.get('id');
                pararchive.story.setBlock(bid); 
                callback(model);
                
            },error:function()
            {
                if (response.responseText) alert(response.responseText);
                else alert('error - bad return value!');
            }});              
        }

      
    },    

    saveArtefact:function(e)
    {
        e.preventDefault();     

        if (this.view.fields()['artefact'].val() == '')
        {
            this.view.ui.addarte.removeClass('show');
            return;     
        }

        var url = this.view.fields()['artefact'].val();        
        this.view.block.addArtefact(url);

        this.view.fields()['artefact'].val('');
        this.view.ui.addarte.removeClass('show');
    },  

    cancelArtefact:function(e)
    {
        e.preventDefault();
        this.view.ui.addarte.removeClass('show');
    },  

    onDeleteBlock:function(e)
    {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete?'))
        {
            this.view.block.destroy({success:function(model,response,options)
            {
                console.log('success',model,response,options);      
                // model.
                pararchive.story.remove(model);
                pararchive.story.setBlock();
                pararchive.story.loadStory(function()
                {
                    console.log('done deleteing');      
                    var sid = pararchive.story.storyID;
                    pararchive.nav.editStory(sid);                    
                });

            },error:function(model,response,options)
            {
                console.log('error',model,response,options);        
            }});
        }
    },    
});