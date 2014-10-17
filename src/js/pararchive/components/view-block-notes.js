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

	initialize:function()
	{
		this.listenTo(this.collection, "reset",  this.render)
		this.listenTo(this.collection, "change", this.render)
	},

	onRender:function()
	{	
		// console.log("Notes onRender");		
		// this.ui.frame.on('scroll',_.bind(function()
		// {
		// 	console.log('scrolling: '+this.ui.frame.scrollTop());		
		// 	console.log('scrolling: '+this.$el.scrollTop());		
		// },this));
		var r = this.ui.frame.scrollTop(0).scrollTop(300);
		// console.log(r.scrollTop());		
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
