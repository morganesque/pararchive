var EditBlockView = Marionette.ItemView.extend(
{
	template:'#editblock-template',

	ui: {
		what_field:'#what-text',
		when_field:'#when-text',
		where_field:'#where-text',
		arte_field:'.file__name',
		help:'.help',
		artefacts:'.show-artefacts',
		arteexam:'.artfacts-example',
	},

	behaviors:{
		EdittingBlock:{},
	},

	initialize:function()
	{			
		this.listenTo(pararchive.artefacts, "reset", this.updateArtefacts);
		this.listenTo(pararchive.artefacts, "change", this.updateArtefacts);
		this.listenTo(pararchive.artefacts, "reset", this.updateArtefacts)
	},

	fields:function()
	{
		return {
			what:this.ui.what_field,
			when:this.ui.when_field,
			where:this.ui.where_field,
		};
	},

	onRender:function()
	{
		console.log("EditBlockView onRender");		

		// this.model = pararchive.story.getBlock();

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
		if (this.model)
		if (this.model.has(type))
		{
			this.fields()[type].val(this.model.get(type));
		} else {

			var data = pararchive.story.getLastWhenWhere();

			if (data && data[type]) this.fields()[type].val(data[type]);
			else this.fields()[type].val('');
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

		this.ui.help.html(t);
	},

	updateArtefacts:function()
	{
		// console.log("updateArtefacts");		

		this.ui.artefacts.empty();

		var dd = $('<div class="display"></div>');

		if (pararchive.artefacts.length)
		{	
			this.ui.arteexam.hide();
			this.ui.artefacts.show();
		} else {
			this.ui.arteexam.show();
			this.ui.artefacts.hide();
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

});