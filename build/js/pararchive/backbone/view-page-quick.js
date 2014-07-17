var PageQuick = PageView.extend({
	
	frag: '',
	className: 'page page_quick',

	initialize:function(options)
	{		
		if (options && options.frag) this.frag = options.frag;
		else alert('you need to pass a frag boyo!');
	},

	setup:function()
	{

	}

});