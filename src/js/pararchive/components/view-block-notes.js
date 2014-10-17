var ViewBlockNotesView = Marionette.ItemView.extend(
{
	// model = the current story block,

	template:'#blocknotesview-template',
	block:undefined,
	className:'view-block__notes',

	ui: {
		addnotes:'.add-notes',
		newnote: '#new-note',
		frame: '.show-notes',
	},

	events: {
		'click @ui.addnotes .show-button': 	 'onAddNotesShow',
		'click @ui.addnotes .cancel-button': 'onAddNotesShow',		
		'click @ui.addnotes .submit-button': 'onNoteSubmit',		
	},

	behaviors:{

	},

	initialize:function(options)
	{
		this.listenTo(this.collection, "reset",  this.render)
		this.listenTo(this.collection, "change", this.render)
		this.authors = options.authors;
		console.log(this.authors);		
	},

	serializeData:function()
	{
		return {
			items:this.collection.toJSON(),
			authors:this.authors,
		}
	},

	onRender:function()
	{		
		// console.log("ViewBlockNotesView\tonRender");		
		var r = this.ui.frame.scrollTop(0).scrollTop(300);
	},

	onNotes:function()
	{
		// console.log('onNotes');		
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
		if (note !== '') this.collection.addNote(note);
		else this.onAddNotesShow(new Event('asdk'));
	},

});
