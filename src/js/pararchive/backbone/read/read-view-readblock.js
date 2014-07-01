var ReadBlock = Backbone.View.extend({
	
	initialize:function(options)
	{
		if (options)
		{
			this.artefacts = options.artefacts;
		}

		this.listenTo(this.model, "block", this.onBlockChange);
		this.listenTo(this.artefacts, "reset", this.onArtefacts);

		var temp = $('#block-template');
		this.template = _.template(temp.html());
	},

	onBlockChange:function()
	{
		// console.log('The Block Has Changed!');		
		// console.log(this.model.blockID);		
		var block = this.model.get(this.model.blockID);
		this.render(block.attributes);
	},

	render:function(obj)
	{
		this.$el.html(this.template(obj));
		var ch = $('.main-content').outerHeight();
		var wh = this.$el.outerHeight(); 
		var df = (wh - ch)/2;
		$('.main-content').css({'margin-top':df+'px'});
	},

	onArtefacts:function()
	{
		console.log('ReadBlock onArtefacts');		
		if (pararchive.artefacts.length)
		{
			var url = pararchive.artefacts.at(0).get('url');
			this.$el.css({"background-image":"url("+url+")"});	
		} else {
			this.$el.css({"background-image":"none"});	
			this.$el.css({"background-color":"#006699"});	
		}		
	},

});