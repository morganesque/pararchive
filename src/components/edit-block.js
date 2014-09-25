var EditBlockPage = PageView.extend({

	type: 'what',	
	frag: '/pages/edit-block.php',
	className: 'page edit-block',

	fields:{},

	events: {
		'click .next__button':  	'saveAndGo',
		'click #artefacts':  		'addArtefact',
		'click #save-artefact':  	'saveArtefact',
		"click #delete-block": 		'onDeleteBlock',
		
		// 'change #what-text': 	'onTextChange',
		// 'paste #what-text': 	'onTextChange',
		// 'keyup #what-text': 	'onTextChange',
		// 'blur #what-text': 		'onTextChange',
	},

	initialize:function()
	{			
		// console.log("initialize");							
	},

	setup:function()
	{
		console.log("EditBlockPage setup");		

		this.fields['what'] = this.$el.find('#what-text');
		this.fields['when'] = this.$el.find('#when-text');
		this.fields['where'] = this.$el.find('#where-text');

		this.fields['artefact'] = this.$el.find('.file__name');		

		this.help = this.$el.find('.help');
		this.artefacts = this.$el.find('.show-artefacts');
		this.arteexam = this.$el.find('.artfacts-example');

		this.listenTo(pararchive.artefacts, "reset", this.updateArtefacts);
		this.listenTo(pararchive.artefacts, "change", this.updateArtefacts);
		this.listenTo(pararchive.artefacts, "reset", this.updateArtefacts)
	},

	update:function()
	{
		console.log("EditBlockPage update");		

		this.storyBlock = pararchive.story.getBlock();

		this.updateTextField('what');
		this.updateTextField('when');
		this.updateTextField('where');

		this.updateHelpText();
		this.updateArtefacts();
	},

	/*
		Updating the form fields with content from the model.
	*/		
	updateTextField:function(type)
	{
		if (this.storyBlock)
		if (this.storyBlock.has(type))
		{
			this.fields[type].val(this.storyBlock.get(type));
		} else {

			var data = pararchive.story.getLastWhenWhere();

			if (data && data[type]) this.fields[type].val(data[type]);
			else this.fields[type].val('');
		}
	},

	updateHelpText:function()
	{
		var c = pararchive.story.length; 
		var b = pararchive.story.getBlock();
		var i = pararchive.story.indexOf(b);
		var t = '';		

		if (b)
		if (b.isNew())
		{
			if (c==1) t = "<h3>First block</h3>";
			else t = "<h3>New block</h3>";
		} else {
			t = "<h3>Edit block <small>(remember to save your changes!)</small></h3>";
		}		

		if (i == 0) $("label[for='what-text']").text("What happened first?");
		else $("label[for='what-text']").text("What happened next?");

		this.help.html(t);
	},

	saveAndGo:function(e)
	{
		e.preventDefault();
		e.stopPropagation();		

		this.saveStoryBlock(function(model)
		{
			var bid = model.get('id');
			var sid = model.get('story_id');			
			pararchive.router.navigate('/story/'+sid+'/block/'+bid+'/saved/',{trigger:true});
		});	
	},

	saveStoryBlock:function(callback)
	{
		var data = {
			"what": this.fields['what'].val(),
			"when": this.fields['when'].val(),
			"where": this.fields['where'].val(),
		}

		this.storyBlock.save(data,{success:function(model,response,options)
		{		
			// make sure you set the newly saved block ID (replace the temp one).
			var bid = model.get('id');
			pararchive.story.setBlock(bid); 
			callback(model);
			
		},error:function()
		{
			if (response.responseText) alert(response.responseText);
			else alert('error - bad return value!');
		}});		
	},

	addArtefact:function(e)
	{
		e.preventDefault();
		/*
			First save the block so you've got a proper ID to attach artefacts to.
		*/		
		this.saveStoryBlock(function(model) 
		{
			pararchive.state.set('state','artefacts');	
		});	
	},

	saveArtefact:function(e)
	{
		e.preventDefault();		

		if (this.fields['artefact'].val() == '')
		{
			pararchive.state.set('state','edit-block');
			return;		
		}

		var arte = pararchive.artefacts.add({
			block_id: pararchive.story.blockID,
			url: this.fields['artefact'].val(),
			type: 'photo',
		});

		this.fields['artefact'].val('');
		// this.useThisButton.text('Saving...');

		var self = this;

		arte.save({},{success:function(a,b,c)
		{			
			// var href = '/arte/edit/'+a.get('id')+'/';
			// pararchive.router.navigate(href,{trigger:true});			
			pararchive.state.set('state','edit-block');

		},error:function(model,response) 
		{
			if (response.responseText) alert(response.responseText);
			else alert('error - bad return value!');

			pararchive.artefacts.remove(model);

			self.fields['artefact'].val(model.get('url'));
			// self.useThisButton.text('Use This');
		}});
		
	},

	updateArtefacts:function()
	{
		// console.log("updateArtefacts");		

		this.artefacts.empty();

		var dd = $('<div class="display"></div>');

		if (pararchive.artefacts.length)
		{	
			this.arteexam.hide();
			this.artefacts.show();
		} else {
			this.arteexam.show();
			this.artefacts.hide();
		}

		pararchive.artefacts.each(function(a,b,c)
		{	
			var url = a.get('url');
			var link = $('<a/>');

			link.css({'background-image': 'url('+url+')'});
			link.attr({href:'/arte/edit/'+a.get('id')+'/'});

			var dc = dd.clone();
			dc.append(link);
			this.artefacts.append(dc);
		},this);
	},

	onDeleteBlock:function(e)
	{
		e.preventDefault();
		if (window.confirm('Are you sure you want to delete?'))
		{
			this.storyBlock.destroy({success:function(model,response,options)
			{
				console.log('success',model,response,options);		
				// model.
				pararchive.story.remove(model);
				pararchive.story.setBlock();
				pararchive.story.startEditting(function()
				{
					console.log('done deleteing');		
					pararchive.router.navigate('/story/'+pararchive.story.storyID+'/',{trigger:true});
				});

			},error:function(model,response,options)
			{
				console.log('error',model,response,options);		
			}});
		}
	},

});