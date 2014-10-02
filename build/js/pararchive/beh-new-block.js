window.Behaviors.NewBlock = Marionette.Behavior.extend(
{
    defaults: {},

    events: {
        "click @ui.plus": 'newBlock',
    },

    newBlock: function(e) 
    {
        console.log("NewBlock\tnewBlock");        
        e.preventDefault();
        pararchive.story.addBlock();
        var sid = pararchive.story.storyID;
        var bid = pararchive.story.block.cid;
        pararchive.nav.editStoryBlock(sid,bid);        
    }
});