var ViewBlockNotesView = Marionette.ItemView.extend(
{
	// model = the current story block,

	template:'#blocknotesview-template',
	block:undefined,
	className:'view-block__notes',

	ui: {
		addnotes:'.add-notes',
		newnote: '#new-note',
	},

	events: {
		'click @ui.addnotes .show-button': 	 'onAddNotesShow',
		'click @ui.addnotes .cancel-button': 'onAddNotesShow',		
		'click @ui.addnotes .submit-button': 'onNoteSubmit',		
	},

	behaviors:{

	},

	initialize:function()
	{
		this.listenTo(this.collection, "reset",  this.render)
		this.listenTo(this.collection, "change", this.render)
	},

	onRender:function()
	{	
		console.log("Notes onRender");		
	},

	onNotes:function()
	{
		console.log('onNotes');		
	},

	onAddNotesShow:function(e)
	{
		e.preventDefault();
		this.ui.addnotes.toggleClass('out');
	},	

	onNoteSubmit:function(e)
	{
		e.preventDefault();
		var note = this.ui.newnote.val();
		this.collection.addNote(note);
	},

});
