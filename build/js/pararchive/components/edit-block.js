var EditBlockView = Marionette.LayoutView.extend(
{
	template:'#editblock-template',
	block:undefined,
	className:'edit-block',
	rendered:false,

	regions:{
		tags:'.show-tags'
	},

	ui: {
		what_field:'#what-text',
		arte_field:'.file__name',
		authornote:'#author_note',

		// help:'.help',
		
		artefacts:'.show-artefacts',
		arteexam:'.artfacts-example',
		addarte:'.add-artefact',

		tagdesc:'.tags-desc',
			
	},

	behaviors:{
		EdittingBlock:{},
	},

	events:{
		
	},

	initialize:function()
	{			
		this.listenTo(this.model,'block',this.onBlock);		
	},

	onBlock:function()
	{
		// console.log("EditBlockView\tonBlock");		
		this.block = this.model.getBlock();
		this.listenTo(this.block,'artefacts',this.updateArtefacts);
		this.listenTo(this.block.artefacts, "reset", this.updateArtefacts);
		this.listenTo(this.block.artefacts, "change", this.updateArtefacts);		
		this.listenTo(this.block, "tags", this.checkTags);		
		this.render();

		var showtags = new EditBlockTagsView({
            collection:this.block.tags,
            block:this.block,
        });
        this.tags.show(showtags);

		var taginput = new EditBlockTagInputView({
			el:$('.block-details'),
			block:this.block,
		});
		taginput.render();
	},

	onRender:function()
	{
		if (!this.block) 
		{
			this.block = this.model.getBlock();
		}

		this.ui.what_field.val(this.block.get('what'));
		this.ui.authornote.val(this.block.get('author_note'));
	},

	checkTags:function()
	{
		if (this.block.tags.length) this.ui.tagdesc.hide();
		else this.ui.tagdesc.show();
	},

	addTags:function(type)
	{
		$('.'+type+' .tags').empty();
		var tags = this.block.tags.where({type:type});
		_.each(tags,function(a,i)
		{		
			var t = $();
			$('.'+type+' .tags').append(t);
		});
	},

	updateArtefacts:function()
	{
		// console.log("EditBlockView\tupdateArtefacts");		
		this.ui.artefacts.empty();

		var dd = $('<div class="display"></div>');

		if (this.block.artefacts.length)
		{	
			this.ui.arteexam.hide();
			this.ui.artefacts.show();
		} else {
			this.ui.arteexam.show();
			this.ui.artefacts.hide();
		}

		this.block.artefacts.each(function(a,b,c)
		{	
			var url = a.get('thumbnail_url');
			if (!url) url = a.get('url');
			var link = $('<a/>');

			link.css({'background-image': 'url('+url+')'});
			link.attr({href:'/arte/edit/'+a.get('id')+'/'});

			var dc = dd.clone();
			dc.append(link);
			this.ui.artefacts.append(dc);
		},this);
	},

});