var PageWhat = PageView.extend({

	type: 'what',	
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
		// console.log("PageWhat setup");		
		this.next = this.$el.find('.next__button');
		this.text = this.$el.find('#what-text');
		this.label = this.$el.find('.what__label');
	},

	update:function()
	{
		this.storyBlock = pararchive.story.getBlock(); 

		if (this.storyBlock.has('what'))
		{
			this.text.val(this.storyBlock.get('what'));
		} else {
			this.text.val('');
		}

		var i = pararchive.story.indexOf(this.storyBlock);
		if (i == 0) this.label.text("What is the first thing that happened in your story?");
		else this.label.html("&hellip;and what happened next?");

		if (!this.text.val().length) this.next.hide();
		else this.next.show();
	},

	onNextClick:function(e)
	{
		// console.log("onNextClick");		
		e.preventDefault();
		e.stopPropagation();

		var href = $(e.currentTarget).attr('href');
		
		this.storyBlock.save({'what':this.text.val()},{success:function()
		{
			pararchive.router.navigate(href,{trigger:true});
		}});
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