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
		this.ui.numnotes.text(num+" notes");
		this.ui.numnotes.parent().toggleClass('gotsome',!!num);
	},

	showArtefacts:function()
	{
		var showartefacts = new ViewBlockArtefactsView({
			collection:this.block.artefacts,
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
		var shownotes = new ViewBlockNotesView({
			collection:this.block.notes,
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
