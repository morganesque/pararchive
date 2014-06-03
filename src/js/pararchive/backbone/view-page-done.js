var PageDone = PageView.extend({
	
	frag: '/pages/done.php',
	className: 'page page_done',

	initialize:function(){},

	events: {
		// "click #login_submit": "onSubmit",
		"click .new__block": "onNewBlockClick",
		"click .edit__button": "onClick",
	},

	setup:function()
	{
		// console.log("PageLogin setup");		
		// when the frag is loaded this will be called.		
		// @ you should probably override this in a child view.
	},	

	/*
		When adding a new block to the story.
	*/		
	onNewBlockClick:function(e)
	{
		e.preventDefault();		
		pararchive.story.addBlock();	
		pararchive.router.navigate('/what/',{trigger:true});
	},

});