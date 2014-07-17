// (function()
// {
// 	var originalSync = Backbone.sync;

// 	// var auth_token = $.cookie('auth'); // console.log(['auth_token',auth_token]);

// 	Backbone.sync = function (method, model, options)
// 	{
// 		// console.log([method,model,options]);		
// 		options = options || {};
// 		options.headers = options.headers || {};

// 		// add the Auth header
//       	// _.extend(options.headers, {'Authorization': 'Basic ' + auth_token} );

//       	// console.log(['options.headers',options.headerers]);		
	    
// 	    // Perform the sync
// 	    return originalSync.call(this, method, model, options);
// 	}

// 	Backbone.emulateHTTP = true;
	
// })();