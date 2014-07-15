var PageWhen = PageView.extend({
	
	type: 'when',
	frag: '/pages/when.php',
	className: 'page page_when',

	events: {
		'click .next__button':  'saveAndGo',

		'change #when-date': 	'onTextChange',
		'paste #when-date': 	'onTextChange',
		'keyup #when-date': 	'onTextChange',
		'blur #when-date': 		'onTextChange',

		"click .skip__button":  'onClick',
	},

	initialize:function()
	{				
		// this.events = _.extend(_.clone(this.events), PageView.prototype.events);
		// this.delegateEvents();			
	},

	setup:function()
	{
		this.next = this.$el.find('.next__button');
		this.text = this.$el.find('#when-date');		
	},

	update:function()
	{
		this.storyBlock = pararchive.story.getBlock();

		if (this.storyBlock.has('when'))
		{
			this.text.val(this.storyBlock.get('when'));
		} else {
			this.text.val('');
		}

		if (!this.text.val().length) this.next.css({"opacity":0.5});
		else this.next.css({"opacity":1});
	},

	onTextChange:function(e)
	{		
		if (this.text.val().length)
		{
			// this.next.fadeIn(500);
			this.next.css({"opacity":1});
		} else {
			this.next.blur();
			// this.next.hide();
		}
	},

});