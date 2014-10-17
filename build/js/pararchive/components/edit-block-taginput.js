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
		console.log("EditBlockTagInputView init");		
		this.block = options.block;
		this.parent = options.parent;
	},

	onRender:function()
	{		
		this.ui.detail.hide();
	},

	onButtonClick:function(e)
	{
		e.preventDefault();
		this.type = $(e.currentTarget).attr('href').substr(1);

		if (this.block.isNew())
		{
			this.parent.edittingTags = this.type;
			this.parent.saveStoryBlock(_.bind(function(model)
			{
				var sid = model.get("story_id");
				var bid = model.get("id");
				var user = pararchive.user.get('username');
				pararchive.router.navigate('/'+user+'/story/'+sid+'/block/'+bid+'/edit/');
				
			},this));
		} else {
			this.showTagInput();
		}
	},

	showTagInput:function()
	{
		console.log("showTagInput");				
		console.log(this.ui.detail);		
		this.ui.detail.find('.icon').attr('class','icon icon-'+this.convert(this.type));
		this.ui.detail.show();
		this.ui.button.hide();
		this.ui.input.focus();		
		console.log(this.el);		
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
        var val = this.ui.input.val().toLowerCase();

        if (val)
        {
            this.ui.input.val('');
            this.ui.input.focus();
            if (this.block.isNew())
            {
            	alert("Can't add a tag to an unsaved block.")
            } else {
            	this.block.tags.addTag(val,type);	
            }
            
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