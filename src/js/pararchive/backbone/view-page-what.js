var PageWhat = PageView.extend({
	
	frag: '/pages/what.php',
	className: 'page page_what',

	events: {
		'click .next__button':  'onNextClick',
		'change #what-text': 	'onTextChange',
		'paste #what-text': 	'onTextChange',
		'keyup #what-text': 	'onTextChange',
		'blur #what-text': 		'onTextChange',
	},

	initialize:function()
	{				
		// this.events = _.extend(_.clone(this.events), PageView.prototype.events);
		// this.delegateEvents();			
	},

	setup:function()
	{
		this.storyBlock = pararchive.story.getStoryBlock();
		
		this.next = this.$el.find('.next__button');
		this.text = this.$el.find('#what-text');
		this.next.hide();

		if (this.storyBlock.has('what'))
		{
			this.text.val(this.storyBlock.get('what'));
		}
	},

	onNextClick:function(e)
	{
		console.log("onNextClick");		
		e.preventDefault();
		e.stopPropagation();
		this.storyBlock.set({'what':this.text.val()});

		var href = $(e.currentTarget).attr('href');
        // make it so number one!
        pararchive.router.navigate(href,{trigger:true});
	},

	onTextChange:function(e)
	{
		if (this.text.val().length)
		{
			this.next.fadeIn(500);
		} else {
			this.next.blur();
			this.next.hide();
		}
	},

});