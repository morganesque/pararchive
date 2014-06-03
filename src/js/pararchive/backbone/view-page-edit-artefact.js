var PageEditArtefact = PageView.extend({
	
	frag: '/pages/arte-edit.php',
	className: 'page page_edit_artifact',

	events: {
		"click .use__this": 'onUseThisClick'
	},

	initialize:function(options)
	{
		if (options.id) this.arteID = options.id;
	},  

	setup:function()
	{
		// console.log("PageEditArtefact setup");		
		// console.log(pararchive.artefacts.length);		

		this.listenTo(pararchive.artefacts,'artefacts',this.showMedia);

		this.display = this.$el.find('.artefact__display');
		this.type = this.$el.find('.type__label');

		this.desc = this.$el.find('.arte__description');

		this.useThisButton = this.$el.find('.use__this');

		this.update();
	},

	showMedia:function()
	{
		// console.log("PageEditArtefact showMedia");	

		this.arte = pararchive.artefacts.get(this.arteID);		

		var type = this.arte.get('type');
		this.type.text(type);

		this.display.html('<img src="'+this.arte.get('url')+'" width="100%" height="100" alt="" />');
	},

	update:function()
	{			
		if (pararchive.artefacts.length || pararchive.artefacts.fetched)
		{
			this.showMedia();
		} else {
			pararchive.artefacts.getData();
		}
	},

	onUseThisClick:function(e)
	{
		e.preventDefault();
		this.arte.set({'description':this.desc.val()});				
		this.arte.save({},{success:function()
		{
			pararchive.router.navigate('/arte/',{trigger:true});
		}});
	},

});