var ViewBlockView = Marionette.ItemView.extend(
{
	// model:pararchive.story,
	template:'#blockview-template',
	block:undefined,
	className:'view-block',

	ui: {
		body:'.body',
		artefacts:'.artefacts',
		thumbs:'.artefacts .thumbs',
		showall:'.artefacts .show-all',
		extras:'.story-extras',
	},

	events: {
		'click @ui.thumbs a'	:"onThumbClick",
		'click @ui.showall'		:"onShowAllClick",
	},

	behaviors:{

	},

	initialize:function()
	{
		this.listenTo(this.model, "block", this.onBlock);		
		$(window).on('resize',_.debounce(_.bind(this.onWindowResize,this),100));
	},

	onClose:function()
	{
		alert('CLOSE!!');
	},

	onBlock:function()
	{
		this.block = this.model.getBlock();
		this.listenTo(this.block, "artefacts", this.onArtfacts)
		this.render();
	},

	onRender:function()
	{
		// console.log("ViewBlockView\tonRender");		
		if (this.block) this.ui.body.text(this.block.get('what'))
		this.onWindowResize();
	},
	
	onArtfacts:function()
	{
		// console.log("ViewBlockView\tonArtfacts");			
		this.ui.thumbs.empty();
		
		var dd = $('<div class="display"></div>');

		if (this.block.artefacts.length)
		{
			this.block.artefacts.each(function(a,b,c)
			{
				var url = a.get('url');
				var link = $('<a/>');

				link.css({'background-image': 'url('+url+')'});
				link.attr({href:'#'+a.get('id')});

				var dc = dd.clone();
				dc.append(link);
				this.ui.thumbs.append(dc);				
			},this);
		}
	},

	onWindowResize:function(e)
	{
		console.log("onWindowResize");		
		var wh = $(window).height()-(53+73+32);
		this.ui.artefacts.css("height",wh+'px');
		this.ui.extras.css("height",wh+'px');
		this.ui.body.css("height",wh+'px');
	},

	onThumbClick:function(e)
	{
		e.preventDefault();		
		var id = $(e.currentTarget).attr('href').substr(1);		
		var a = this.block.artefacts.get(id);
		var url = a.get('url');
		this.ui.showall.css({"background-image":'url('+url+')'});
		this.ui.showall.show();
	},

	onShowAllClick:function(e)
	{
		e.preventDefault();
		this.ui.showall.hide();
	},

});