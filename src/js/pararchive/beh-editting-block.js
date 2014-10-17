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

        this.view.saveStoryBlock(function(model)
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
        this.view.saveStoryBlock(function(model) 
        {      
            self.view.ui.addarte.addClass('show');
        }); 
    },      

    saveArtefact:function(e)
    {
        e.preventDefault();     

        if (this.view.ui.arte_field.val() == '')
        {
            this.view.ui.addarte.removeClass('show');
            return;     
        }        

        var url = this.view.ui.arte_field.val();        
        this.view.block.addArtefact(url);

        this.view.ui.arte_field.val('');
        this.view.ui.addarte.removeClass('show');
    }, 

    showSpinner:function()
    {
        var spinner = $('<div class="display"><span class="icon icon-spinner"></span></div');
        this.view.ui.artefacts.append(spinner);
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
                // console.log('success',model,response,options);      
                // model.
                pararchive.story.remove(model);
                pararchive.story.setBlock();
                pararchive.story.loadStory(function()
                {
                    // console.log('done deleteing');      
                    var sid = pararchive.story.storyID;
                    pararchive.nav.editStory(sid);                    
                });

            },error:function(model,response,options)
            {
                // console.log('error',model,response,options);        
            }});
        }
    },    
});