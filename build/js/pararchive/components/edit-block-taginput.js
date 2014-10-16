var EditBlockTagInputView = Marionette.ItemView.extend({

	template:false,

	ui: {
		detail: '.details-form',
		add: 	'.details-add',	
		input: 	'.detail-input',	
		button: '.details-buttons'
	},

	events:{
		'blur @ui.input': 		'onDetailBlur',
		'keypress @ui.input': 	'onDetailKey',	
		"mousedown @ui.add": 	'onDetailAdd',
		"click @ui.button a": 	'onButtonClick',
	},

	initialize:function(options)
	{
		this.block = options.block;
	},

	onRender:function()
	{
		this.ui.detail.hide();
	},

	onButtonClick:function(e)
	{
		e.preventDefault();
		this.type = $(e.currentTarget).attr('href').substr(1);
		this.ui.detail.find('.icon').attr('class','icon icon-'+this.convert(this.type));
		this.ui.detail.show();
		this.ui.button.hide();
		this.ui.input.focus();
	},

	convert:function(type)
	{
		if (type == 'person') return 'user';
		if (type == 'place') return 'map';
		if (type == 'date') return 'calendar';
	},

    onDetailAdd:function(e)
    {
        e.preventDefault();
        
        var type = this.type;
        var val = this.ui.input.val();

        if (val)
        {
            this.ui.input.val('');
            this.ui.input.focus();
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

	onDetailBlur:function(e)
	{
		e.preventDefault();
		this.ui.detail.hide();
		this.ui.button.show();
	},	
});