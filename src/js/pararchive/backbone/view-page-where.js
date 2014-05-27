var PageWhere = PageView.extend({
	
	frag: '/pages/where.php',
	className: 'page page_where',

	events: {
		'click .next__button':  'onNextClick',
		'change #where-place': 	'onTextChange',
		'paste #where-place': 	'onTextChange',
		'keyup #where-place': 	'onTextChange',
		'blur #where-place': 	'onTextChange',
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
		this.text = this.$el.find('#where-place');
		
		if (this.storyBlock.has('where'))
		{
			this.text.val(this.storyBlock.get('where'));
		}
		
		this.next.hide();
	},

	onNextClick:function(e)
	{
		console.log("onNextClick");		
		e.preventDefault();
		e.stopPropagation();
		this.storyBlock.set({'where':this.text.val()});

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