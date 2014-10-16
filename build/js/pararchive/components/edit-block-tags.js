var EditBlockTagsView = Marionette.ItemView.extend(
{
	template:'#editblocktag-template',
	type:undefined,
	block:undefined,
	showdetail:false,

	ui:{
		tag: 	 '.tag',
		detail:  '.details-form',
		trigger: '.trigger',	
		add: 	 '.details-add',	
		input: 	 '.detail-input',	
	},

	events:{
		"click @ui.tag": 'onTagClick',

		'focus @ui.detail .form-control': 'onDetailFocus',
		'blur @ui.detail .form-control': 'onDetailBlur',
		'keypress @ui.detail .form-control': 'onDetailKey',		

		"click @ui.trigger":    'onTrigger',
        "mousedown @ui.add": 	'onDetailAdd',
	},

	initialize:function(options)
	{},

	onRender:function()
	{
		// if (!this.showdetail) this.ui.detail.hide();
		// else this.ui.input.focus();
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

	onTrigger:function(e)
    {
        e.preventDefault();
        this.showdetail = true;
        this.ui.detail.show();
        this.ui.input.focus();
    },

    onDetailAdd:function(e)
    {
        e.preventDefault();
        
        var t = $(e.currentTarget);
        var type = t.data('type');
        var val = this.ui.input.val();

        if (val)
        {
            this.ui.input.val('');
            this.block.tags.addTag(val,type);
            this.block.trigger('tags');
        } else {
            alert('You have to type something.');
        }  
    },    

	onDetailKey:function(e)
	{
		if (e.charCode == 13) 
		{
			// e.preventDefault();
			this.ui.add.trigger('mousedown');
		}
	},

	onDetailFocus:function(e)
	{
		e.preventDefault();		
	},

	onDetailBlur:function(e)
	{
		console.log("blur");		
		e.preventDefault();
		this.ui.detail.hide();
	},		
});