var PageSearchArtefact = PageView.extend({
	
	type:'arte',
	frag: '/pages/arte-search.php',
	className: 'page page_arte_search',

	events: {
		// 'click .next__button':  'onNextClick',
		// "click .skip__button":  'onClick',
		// "click .media__button":  'onClick',
		"click .use__this": 'onUseThisClick'
	},

	initialize:function(options)
	{				
		this.query = options.query;
		// this.events = _.extend(_.clone(this.events), PageView.prototype.events);
		// this.delegateEvents();	
		// var html = this.$el.find('#searchResultsTemplate').html();
		
		// this.template = _.template(html);
	},

	setup:function()
	{
		this.queryShow = this.$el.find('.search_query');		
		this.resultsShow = this.$el.find('.search_results');

		var html = this.$el.find('#searchResultsTemplate').html();
		this.template = _.template(html);
	},

	update:function()
	{		
		// console.log("PageSearchArtefact update");		
		this.queryShow.text(this.query);

		var results = [
			{
				name: 'Bute museum',
				url: 'http://www.butemuseum.org.uk/wp-content/uploads/2013/02/slide21.jpg',
				desc: 'Quo solum justo principes ut, stet blandit torquatos cu eum, ad verear luptatum usu. Purto nullam cu mei. Ad solet iudico ocurreret nec, ad simul virtute sed, sed hendrerit suscipiantur id. Viris everti torquatos mel ex...',
				source: 'bbc',
			},
			{
				name: '5th Marquess of Bute, John Crichton-Stuart',
				url: 'http://www.mountstuart.com/files/cache/597224d1baab13f369a8815f77cb8a5e.jpg',
				desc: 'Quo solum justo principes ut, stet blandit torquatos cu eum, ad verear luptatum usu. Purto nullam cu mei. Ad solet iudico ocurreret nec, ad simul virtute sed, sed hendrerit suscipiantur id. Viris everti torquatos mel ex...',
				source: 'scie',
			},
			{
				name: 'Mount Stuart',
				url: 'http://www.mountstuart.com/files/cache/da54176719e8b916a9ac23fa9b256181_f1217.jpg',
				desc: 'Quo solum justo principes ut, stet blandit torquatos cu eum, ad verear luptatum usu. Purto nullam cu mei. Ad solet iudico ocurreret nec, ad simul virtute sed, sed hendrerit suscipiantur id. Viris everti torquatos mel ex...',
				source: 'euro',
			},
			{
				name: 'Bute boat in floating shock',
				url: 'http://www.s1bute.com/files/photo/max-845885.jpg',
				desc: 'Quo solum justo principes ut, stet blandit torquatos cu eum, ad verear luptatum usu. Purto nullam cu mei. Ad solet iudico ocurreret nec, ad simul virtute sed, sed hendrerit suscipiantur id. Viris everti torquatos mel ex...',
				source: 'scie',
			},
			{
				name: 'Glenburn Hotel',
				url: 'http://upload.wikimedia.org/wikipedia/commons/7/7a/Glenburn_Hotel_Rothesay.JPG',
				desc: 'Quo solum justo principes ut, stet blandit torquatos cu eum, ad verear luptatum usu. Purto nullam cu mei. Ad solet iudico ocurreret nec, ad simul virtute sed, sed hendrerit suscipiantur id. Viris everti torquatos mel ex...',
				source: 'bbc',
			},
		];
		this.resultsShow.html(this.template({data:results}));
	},	

	onUseThisClick:function(e)
	{
		e.preventDefault();
		
		var url = $(e.currentTarget).attr('href').substr(1);		
		var name = $(e.currentTarget).closest('.row').find('.name').text().trim();		

		var exists = pararchive.artefacts.where({url:url});
		if (exists.length)		
		{
			alert("You've already added that one.");
			return;
		} else {
			var arte = pararchive.artefacts.add(
			{
				block_id: pararchive.story.blockID,
				url: url,
				type: 'photo',
				title: name,
			});			
			arte.save({},{success:function(a,b,c)
			{			
				console.log(a);		

			},error:function(){alert('Error - bad return value!');}});
		}
	},

});