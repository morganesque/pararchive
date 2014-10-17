var ViewBlockArtefactsView = Marionette.ItemView.extend(
{
	// model = block.artefacts,

	template:'#blockartefactsview-template',
	block:undefined,
	className:'view-block__artefacts',

	ui: {
		thumbs: '.thumbs',
		showall:'.show-all',
	},

	events: {
		'click @ui.thumbs a'	:"onThumbClick",
		'click @ui.showall'		:"onShowAllClick",
	},

	behaviors:{

	},

	initialize:function()
	{
		this.listenTo(this.collection, "reset", this.render)
	},

	onRender:function()
	{
		if (this.collection.length == 1)
		{
			this.showSingleArtefact(this.collection.first().id);		
		}
	},

	onThumbClick:function(e)
	{		
		e.preventDefault();		
		var id = $(e.currentTarget).attr('href').substr(1);				
		this.showSingleArtefact(id);
	},

	showSingleArtefact:function(id)
	{
		var a = this.collection.get(id);
		var type = a.get('type');

		if (type == 'photo')
		{
			var url = a.get('url');
			this.ui.showall.css({"background-image":'url('+url+')'});	
			this.ui.showall.empty();
			this.ui.showall.append('<a class="btn-close"><span class="icon icon-close"></span></a>');
		}

		if (type == 'video')
		{
			var close = this.ui.showall.find('.btn-close').detach();
			this.ui.showall.empty();

			var html = $(a.get("html"));
			var wid = html.attr('width');
			var hei = html.attr('height');
			var rat = (hei/wid)*100;		
			html.removeAttr('width');
			html.removeAttr('height');			
			var cont = $('<div class="embed-container"></div>').css({'padding-top':rat+'%'});
			cont.append($(html).removeAttr('width').removeAttr('height'));
			this.ui.showall.append(cont);
			this.ui.showall.append(close);

			var she = this.ui.showall.height();
			var swi = this.ui.showall.width();
			var vhi = swi*(rat/100);		
			if (she > vhi) cont.css({'margin-top':((she-vhi)/2)});			
		}

		if (type == 'rich')
		{
			var close = this.ui.showall.find('.btn-close').detach();
			this.ui.showall.empty();

			var html = $(a.get("html"));
			// console.log(a.get('html'));		
			var cont = $('<div class="embed-container"></div>');

			cont.append(html);
			this.ui.showall.append(cont);
			this.ui.showall.append(close);
		}
		
		this.ui.showall.show();
	},

	onShowAllClick:function(e)
	{
		e.preventDefault();		
		var close = this.ui.showall.find('.btn-close').detach();
		this.ui.showall.empty();
		this.ui.showall.css({"background-image":'none'});	
		this.ui.showall.append(close);
		this.ui.showall.hide();
	},

});
