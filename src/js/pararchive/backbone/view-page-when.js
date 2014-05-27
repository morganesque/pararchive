var PageWhen = PageView.extend({
	
	frag: '/pages/when.php',
	className: 'page page_when',

	events: {
		'click .next__button':  'onNextClick',
		'change #when-date': 	'onTextChange',
		'paste #when-date': 	'onTextChange',
		'keyup #when-date': 	'onTextChange',
		'blur #when-date': 		'onTextChange',
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
		this.text = this.$el.find('#when-date');
		this.next.hide();

		if (this.storyBlock.has('when'))
		{
			this.text.val(this.storyBlock.get('when'));
		}
	},

	onNextClick:function(e)
	{
		console.log("onNextClick");		
		e.preventDefault();
		e.stopPropagation();
		this.storyBlock.set({'when':this.text.val()});

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