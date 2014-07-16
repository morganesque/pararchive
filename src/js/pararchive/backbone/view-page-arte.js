/*
	For the page where you 
	a) choose which Artefact you want to add.
	b) see how many Artefacts you've added.
*/		
var PageArte = PageView.extend({
	
	type:'arte',
	frag: '/pages/arte.php',
	className: 'page page_arte',

	events: {
		// 'click .next__button':  'onNextClick',
		"click .skip__button":  'onClick',
		"click .cont__button":  'onClick',
		"click .media__button": 'onClick',
		"click .input_submit":  "onSearchSubmit",
	},

	initialize:function()
	{				
		// console.log("initialize");		
		// this.events = _.extend(_.clone(this.events), PageView.prototype.events);
		// this.delegateEvents();	
		this.listenTo(pararchive.artefacts, "reset", this.render);
	},

	setup:function()
	{
		// console.log("setup");		
		this.searchbox = this.$el.find('.archive__search');
		this.contBtn = this.$el.find('.cont__button').hide();
		this.skipBtn = this.$el.find('.skip__button'); 
		this.message = this.$el.find('.message');

		// console.log("setup running update");		
		// this.update();
	},

	update:function()
	{				
		var l = pararchive.artefacts.length;
		if (l)
		{
			this.skipBtn.hide();			
			if (l == 1) 
			{
				this.contBtn.show().css('display','block');//.text('Done');
				this.message.html('You have included <b>'+l+'</b> artefact');
			} else { 
				this.contBtn.show().css('display','block');//.text('Done');
				this.message.html('You have included <b>'+l+'</b> artefacts');
			}
		} else {
			this.skipBtn.show().css('display','block');
			this.contBtn.hide();
			this.message.html("No artefacts yet.");
		}
	},	

	onSearchSubmit:function(e)
	{
		e.preventDefault();
		var query = encodeURI(this.searchbox.val().replace(/[?#\s]/g,'+'));
		if (query !== '')
		{
			pararchive.router.navigate('/arte/search/'+query+'/',{trigger:true});
		} else {
			alert('Please enter a search term.');
		}
		// 
	},

});