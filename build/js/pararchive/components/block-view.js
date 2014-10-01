var BlockView = Marionette.ItemView.extend(
{
	template:'#blockview-template',
	block:undefined,

	ui: {
		body:'.body',
		artefacts:'.artfacts',
	},

	events: {

	},

	behaviors:{

	},

	initialize:function()
	{
		this.listenTo(this.model, "block", this.onBlock)
	},

	onBlock:function()
	{
		this.block = this.model.getBlock();
		this.render();
	},

	onRender:function()
	{
		if (this.block) this.ui.body.text(this.block.get('what'))
	},
});
