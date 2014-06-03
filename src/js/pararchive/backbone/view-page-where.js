var PageWhere = PageView.extend({
	
	type:'where',
	frag: '/pages/where.php',
	className: 'page page_where',

	events: {
		'click .next__button':  'onNextClick',
		'change #where-place': 	'onTextChange',
		'paste #where-place': 	'onTextChange',
		'keyup #where-place': 	'onTextChange',
		'blur #where-place': 	'onTextChange',
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
		this.text = this.$el.find('#where-place');
	},

	update:function()
	{
		this.storyBlock = pararchive.story.getBlock();

		if (this.storyBlock.has('where'))
		{
			this.text.val(this.storyBlock.get('where'));
		} else {
			this.text.val('');
		}
		
		if (!this.text.val().length) this.next.hide();
		else this.next.show();		
	},

	onNextClick:function(e)
	{
		console.log("onNextClick");		
		e.preventDefault();
		e.stopPropagation();	
		var href = $(e.currentTarget).attr('href');
		
		this.storyBlock.save({'where':this.text.val()},{success:function()
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