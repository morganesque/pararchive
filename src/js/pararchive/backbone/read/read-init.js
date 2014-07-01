// console.log('init');		
// just to be safe.
if (typeof(pararchive) == "undefined") pararchive = {};

/*
	First thing is to create a User model and 
	fetch some data. If I get some we're in, if 
	not show the login screen.
*/		
$(document).on("ready",function(e)
{		
	pararchive = new App({el:$('#inner-wrap')});
	Backbone.history.start({pushState:true});
});