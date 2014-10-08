var ViewFooterView = Marionette.ItemView.extend(
{
	template:'#viewfooter-template',
	className:'view-footer',

	current:1,

	ui: {
		next:'.view-next',
		prev:'.view-prev',
		page:'.page-num',
	},

	events: {
		"click @ui.next":"onNextClick",
		"click @ui.prev":"onPrevClick",
	},

	behaviors:{

	},

	initialize:function()
	{
		if (this.model.meta) this.slug = this.model.meta.get('slug');
		if (this.model.length) this.length = this.model.length;

		this.listenTo(this.model, 'reset', this.onReset);
		this.listenTo(this.model, 'block', this.onBlock);

		this.listenTo(pararchive.vent, 'footer:show', this.show);
		this.listenTo(pararchive.vent, 'footer:hide', this.hide);
	},

	show:function()
	{
		// console.log("footer:show");		
		this.$el.parent().removeClass('out');
	},

	hide:function()
	{
		// console.log("footer:hide");
		this.$el.parent().addClass('out');	
	},

	onRender:function()
	{		
		this.ui.page.text('Page '+this.current);
		this.updateArrows();
	},

	onReset:function()
	{
		this.slug = this.model.meta.get('slug');
		this.length = this.model.length;
		this.render();
	},

	onBlock:function()
	{
		// console.log("ViewFooterView\tonBlock");		
		var block = this.model.getBlock();
		this.current = this.model.indexOf(block) + 1;		
		this.render();
	},

	updateArrows:function()
	{
		// console.log("ViewFooterView\tupdateArrows");		
		this.ui.next.removeClass('disabled');
		this.ui.prev.removeClass('disabled');
		if (this.current == this.length) this.ui.next.addClass('disabled');
		// if (this.current == 1) this.ui.prev.addClass('disabled');
	},

	onNextClick:function(e)
	{
		e.preventDefault();
		if (this.current < this.length)
		{
			this.current++;
			// console.log("––––––––––––––––––––––––––––");
			pararchive.nav.viewStoryBlock(this.slug,this.current);						
		}	
	},

	onPrevClick:function(e)
	{
		// console.log("ViewFooterView\tonPrevClick");		
		e.preventDefault();
		if (this.current > 1)
		{			
			this.current--;
			// console.log("––––––––––––––––––––––––––––");
			pararchive.nav.viewStoryBlock(this.slug,this.current);
		}
		else if (this.current == 1)
		{
			console.log("–––going home ");
			pararchive.nav.viewStory(this.slug);
		}		
	},
});
