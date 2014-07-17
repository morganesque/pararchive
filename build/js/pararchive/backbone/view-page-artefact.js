/*
	For the pages where you add Photos, Video or Audio URLs.
*/		
var PageArtefact = PageView.extend({
	
	type:'arte',
	frag: undefined,
	className: 'page page_artefact',

	events: {
		'click .use__this':  	  'onUseThisClick',
		"click .back__button":    'onClick',
		"click .upload__trigger": 'onTriggerClick',
		
		// 'change .input-file': 	  "onInputChange",
  
		'change .file__name': 	  "onFileNameChange",
		'paste .file__name': 	  "onFileNameChange",
		'keyup .file__name': 	  "onFileNameChange",
	},

	initialize:function(options)
	{
		if (options.slug) this.slug = options.slug;
		this.frag = '/pages/arte-'+this.slug+'.php';               
	},  

	setup:function()
	{
		this.fileInput = this.$el.find('.input-file');
		this.fileInput.hide();

		this.useThisButton = this.$el.find('.use__this');
		// this.useThisButton.hide();
		this.useThisButton.css('opacity',0.5);
		this.useThisButton.text('Use This');

		this.uploadTriggerButton = this.$el.find('.upload__trigger');

		this.fileNameInput = this.$el.find('.file__name');

		this.form = this.$el.find('.upload__form');
	},

	update:function()
	{
		// this.storyBlock = pararchive.story.getBlock();
		// console.log('udpate');		
		// console.log(this.storyBlock);		
		this.fileNameInput.val('');
	},

	onUseThisClick:function(e)
	{
		console.log("onUseThisClick");		

		if (pararchive.story.getBlock().isNew())
		{
			alert("The block hasn't been saved yet. Add a What, When or Where before adding artefacts");
			return;
		}

		if (this.fileNameInput.val() == '') return;		

		var arte = pararchive.artefacts.add({
			block_id: pararchive.story.blockID,
			url: this.fileNameInput.val(),
			type: this.slug,
		});

		this.fileNameInput.val('');
		this.useThisButton.text('Saving...');

		var self = this;

		arte.save({},{success:function(a,b,c)
		{			
			var href = '/arte/edit/'+a.get('id')+'/';
			pararchive.router.navigate(href,{trigger:true});			

		},error:function(model,response) 
		{
			if (response.responseText) alert(response.responseText);
			else alert('error - bad return value!');

			pararchive.artefacts.remove(model);

			self.fileNameInput.val(model.get('url'));
			self.useThisButton.text('Use This');
		}});

		// console.log("onNextClick");		
		// e.preventDefault();
		// e.stopPropagation();	
		// var href = $(e.currentTarget).attr('href');
		
		// this.storyBlock.save({'where':this.text.val()},{success:function()
		// {
		// 	pararchive.router.navigate(href,{trigger:true});
		// }});
	},

	onTriggerClick:function(e)
	{
		e.preventDefault();
		this.fileInput.trigger('click');
	},

	onInputChange:function()
	{
		var chosen = this.fileInput.val().replace(/^.*[\\\/]/, '');		
		this.fileNameInput.val(chosen).trigger('change');	
	},

	onFileNameChange:function()
	{
		if (this.fileNameInput.val()) this.useThisButton.css('opacity',1);
		else {
			this.useThisButton.css('opacity',0.5);
			this.form.get(0).reset();		
		}
	},

});