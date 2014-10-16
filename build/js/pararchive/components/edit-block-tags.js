var EditBlockTagsView = Marionette.ItemView.extend(
{
	template:'#editblocktag-template',
	type:undefined,
	block:undefined,
	showdetail:false,

	ui:{
		tag: 	 '.tag',				
	},

	events:{
		"click @ui.tag": 'onTagClick',
	},

	initialize:function(options)
	{
		this.block = options.block;
		this.listenTo(this.block, 'tags', this.render);
	},

	onTagClick:function(e)
	{
		e.preventDefault();
		var id = $(e.currentTarget).attr('href').substr(1);
		var t = this.block.tags.get(id);
		t.destroy({success:_.bind(function()
		{
			console.log('destroyed the tag');		
			this.block.trigger('tags');
		},this)});
	},	

});