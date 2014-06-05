var Nav = Backbone.View.extend({
	
	initialize:function(options)
	{
		// console.log("Nav initialize");		
		if (options)
		{

		}

		this.listenTo(this.model, "block", this.onBlockChange);
		$(document).on('keyup',_.bind(this.onKeyPress,this));
	},

	events:{
		"click .nav": "onNavClick",
	},

	setCurrent:function(c)
	{
		this.current = c;
		if (c == 'start') $('#navleft').hide();
		if (c == 'end') $('#navright').hide();
	},

	onKeyPress:function(e)
	{
		if (e.keyCode == 39)
		{
			e.preventDefault();
			this.current++;
			this.navigate();
		}
		else if (e.keyCode == 37) 
		{
			e.preventDefault();
			this.current--;
			this.navigate();
		}
	},

	onBlockChange:function()
	{	
		var id = this.model.blockID;		
		var block = this.model.get(id);
		this.current = this.model.indexOf(block);		
		$('.nav').show();
	},

	onArtefacts:function()
	{

	},

	onNavClick:function(e)
	{
		console.log("nav onNavClick");		
		e.preventDefault();

		if (this.current == 'start')
		{
			this.current = 0;

		} else if (this.current == 'end') {

			this.current = this.model.length-1;

		} else {

			var id = $(e.currentTarget).attr('id');	
			switch(id)
			{
				case "navleft":
					this.current--;
				break;
				case "navright":
					this.current++;
				break;
			}
		}
		this.navigate();		
	},

	navigate:function()
	{
		if (this.current < 0) 
		{
			this.current = 'start';
			pararchive.router.navigate('/read/story/'+this.model.storyID+'/start/',{trigger:true});				

		} else if (this.current == this.model.length) {

			this.current = "end";
			pararchive.router.navigate('/read/story/'+this.model.storyID+'/end/',{trigger:true});				

		} else {

			var newblock = this.model.at(this.current);
			pararchive.router.navigate('/read/story/'+this.model.storyID+'/block/'+newblock.id+'/',{trigger:true});				
		}
	},

});