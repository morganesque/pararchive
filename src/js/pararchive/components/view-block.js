var ViewBlockView = Marionette.LayoutView.extend(
{
	// model:pararchive.story,
	template:'#blockview-template',
	block:undefined,
	className:'view-block',

	regions: {
		media:'.view-block__media',
	},

	ui: {
		body:'.view-block__body',
		media:'.view-block__media',		
		extras:'.view-block__extras',				

		exarte:'.view-block__extras .artefacts',
		exnote:'.view-block__extras .notes',

		numarte:'.view-block__extras .artefacts .num',
		numnotes:'.view-block__extras .notes .num',

		editblock:'.view-block__edit',
	},

	events: {				
		"click @ui.exarte": "onShowArtefacts",
		"click @ui.exnote": "onShowNotes",
	},

	behaviors:{
		EditBlock:{},
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
		this.listenTo(this.block, 'artefacts', this.onArtefacts);
		this.listenTo(this.block, 'notes', this.onNotes);
		this.listenTo(this.block.notes, 'change', this.onNotes);
		this.render();
	},

	onRender:function()
	{
		// console.log("ViewBlockView\tonRender");		
		if (this.block) 
		{
			this.ui.body.text(this.block.get('what'))
			this.showArtefacts();
		}
		this.onWindowResize();				
	},

	onArtefacts:function()
	{
		var num = this.block.artefacts.length;
		this.ui.numarte.text(num+" artefacts");
		this.ui.numarte.parent().toggleClass('gotsome',!!num);
	},

	onNotes:function()
	{
		var num = this.block.notes.length;
		if (this.block.get('author_note')) num++;		
		this.ui.numnotes.text(num+" notes");
		this.ui.numnotes.parent().toggleClass('gotsome',!!num);
	},

	showArtefacts:function()
	{
		var showartefacts = new ViewBlockArtefactsView({
			collection:this.block.artefacts,
			author:this.block.get('user_id'),
		});
		this.media.show(showartefacts);
	},

	onShowArtefacts:function(e)
	{
		e.preventDefault();
		this.showArtefacts();
	},
	
	showNotes:function()
	{
		console.log("ViewBlockView\tshowNotes");		
		var shownotes = new ViewBlockNotesView({
			collection:this.block.notes,
			authors:{
				gravatar:this.block.get('user').gravatar,
				note:this.block.get('author_note'),
				firstname:this.block.get('user').firstname,
				surname:this.block.get('user').surname,
				username:this.block.get('user').username,
				created:this.block.get('modified'),
			},
		});
		this.media.show(shownotes);
	},

	onShowNotes:function(e)
	{
		e.preventDefault();
		this.showNotes();
	},

	onWindowResize:function(e)
	{
		var wh = $(window).height()-(53+73+32);
		this.ui.media.css("height",wh+'px');
		// this.ui.extras.css("height",wh+'px');
		// this.ui.body.css("height",wh+'px');
	},	

});
