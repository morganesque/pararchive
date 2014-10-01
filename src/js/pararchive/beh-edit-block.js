window.Behaviors.EditBlock = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click @ui.editblock": 'editBlock',
    },

    editBlock: function(e) 
    {
        e.preventDefault();

        var sid = pararchive.story.storyID;
        var bid = pararchive.story.block.get('id');
        // console.log(sid,bid);        
        pararchive.router.navigate('/edit/story/'+sid+'/block/'+bid+'/',{trigger:true});
    }
});