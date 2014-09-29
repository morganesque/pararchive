window.Behaviors.NewBlock = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click @ui.newblockbutton": 'newBlock',
    },

    newBlock: function(e) 
    {
        e.preventDefault();

        pararchive.story.addBlock();
        
        var sid = pararchive.story.storyID;
        var bid = pararchive.story.blockID;

        pararchive.router.navigate('/edit/story/'+sid+'/block/'+bid+'/');
        pararchive.showEditBlock();
    }
});