var PageArte = PageView.extend({
	
	type:'arte',
	frag: '/pages/arte.php',
	className: 'page page_arte',

	events: {
		// 'click .next__button':  'onNextClick',
		"click .skip__button":  'onClick',
	},

	initialize:function()
	{				
		console.log("initialize");		
		// this.events = _.extend(_.clone(this.events), PageView.prototype.events);
		// this.delegateEvents();			
	},

	setup:function()
	{
		
	},

	update:function()
	{
	
	},	

});