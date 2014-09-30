var ViewFooterView = Marionette.ItemView.extend(
{
	template:'#viewfooter-template',

	ui: {
		next:'.view-next',	
		prev:'.view-prev',	
	},

	events: {
		"click @ui.next":"onNextClick",
		"click @ui.prev":"onPrevClick",
	},	

	behaviors:{

	},

	onNextClick:function(e)
	{
		e.preventDefault();
		pararchive.story.getNextBlock();
	},

	onPrevClick:function(e)
	{
		e.preventDefault();
		alert('prev');
	},
});