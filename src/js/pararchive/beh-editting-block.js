window.Behaviors.EdittingBlock = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        'click .next__button':      'saveAndGo',
        'click #artefacts':         'addArtefact',
        'click #save-artefact':     'saveArtefact',
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
            pararchive.router.navigate('/story/'+sid+'/block/'+bid+'/saved/');
            pararchive.showSavedBlock();
        }); 
    },

    addArtefact:function(e)
    {
        e.preventDefault();
        /*
            First save the block so you've got a proper ID to attach artefacts to.
        */      
        this.saveStoryBlock(function(model) 
        {
            pararchive.state.set('state','artefacts');  
        }); 
    },    

    saveStoryBlock:function(callback)
    {
        var data = {
            "what": this.view.fields()['what'].val(),
            "when": this.view.fields()['when'].val(),
            "where": this.view.fields()['where'].val(),
        }

        this.view.model.save(data,{success:function(model,response,options)
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
    },    

    saveArtefact:function(e)
    {
        e.preventDefault();     

        if (this.view.fields()['artefact'].val() == '')
        {
            pararchive.state.set('state','edit-block');
            return;     
        }

        var arte = pararchive.artefacts.add({
            block_id: pararchive.story.blockID,
            url: this.view.fields()['artefact'].val(),
            type: 'photo',
        });

        this.view.fields()['artefact'].val('');
        // this.useThisButton.text('Saving...');

        var self = this;

        arte.save({},{success:function(a,b,c)
        {           
            // var href = '/arte/edit/'+a.get('id')+'/';
            // pararchive.router.navigate(href,{trigger:true});         
            pararchive.state.set('state','edit-block');

        },error:function(model,response) 
        {
            if (response.responseText) alert(response.responseText);
            else alert('error - bad return value!');

            pararchive.artefacts.remove(model);

            self.fields['artefact'].val(model.get('url'));
            // self.useThisButton.text('Use This');
        }});
        
    },    

    onDeleteBlock:function(e)
    {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete?'))
        {
            this.view.model.destroy({success:function(model,response,options)
            {
                console.log('success',model,response,options);      
                // model.
                pararchive.story.remove(model);
                pararchive.story.setBlock();
                pararchive.story.startEditting(function()
                {
                    console.log('done deleteing');      
                    pararchive.router.navigate('/story/'+pararchive.story.storyID+'/',{trigger:true});
                });

            },error:function(model,response,options)
            {
                console.log('error',model,response,options);        
            }});
        }
    },    
});