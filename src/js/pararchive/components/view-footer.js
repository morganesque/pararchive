var ViewFooterView = Marionette.ItemView.extend(
{
	template:'#viewfooter-template',

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
	},

	onReset:function()
	{
		console.log("ViewFooterView:onReset");
		this.slug = this.model.meta.get('slug');
		this.length = this.model.length;
	},

	onBlock:function()
	{
		var block = this.model.getBlock();
		this.current = this.model.indexOf(block) + 1;
		
		this.ui.page.text('Page '+this.current);
		this.updateArrows();
				
	},

	updateArrows:function()
	{
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
			pararchive.router.navigate('/view/'+this.slug+'/'+this.current+'/');
			this.model.setBlockByIndex(this.current);
		}	
		this.updateArrows();	
	},

	onPrevClick:function(e)
	{
		// console.log("ViewFooterView\tonPrevClick");		
		e.preventDefault();

		if (this.current > 1)
		{			
			this.current--;
			console.log("–––going to "+this.current);		
			pararchive.router.navigate('/view/'+this.slug+'/'+this.current+'/');
			this.model.setBlockByIndex(this.current);
		}
		else if (this.current == 1)
		{
			console.log("–––going home ");
			pararchive.router.navigate('/view/'+this.slug+'/');
			pararchive.showViewStory();
		}
		this.updateArrows(); 		
	},
});
