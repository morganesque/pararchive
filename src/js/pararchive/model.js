/*
    A base model to inculcate a sense of abandonment and monetary union.
*/
var Model = Backbone.Model.extend({

    fetching: false,
    fetched: 0,
    diff: 60*60*1000, // milliseconds = 1 hr

    initialize:function()
    {
            
    },

    /*
        This function is instead of fetch and prevents the model 
        getting new data all the time (only when it's expired) and
        means we can call it on every page view without worrying about
        creating loads of new http requests.
    */
    getData:function(callback,force)
    {
        var n = _.now();
        var self = this; 

        if (typeof callback == 'boolean')
        {
            force = callback;
            callback = undefined;
        }

        if (!this.urlRoot && !this.collection) {
            // console.log('No urlRoot set not fetching.');        
            return;
        }

        if (n - this.fetched > this.diff)
        {            
            if (!this.fetching)
            {
                // console.log('fetching new data: '+this.urlRoot);       
                this.fetching = true;
                this.fetch({success:function(a,b,c)
                {
                    // console.log('got new data: '+self.urlRoot);        
                    self.fetched = _.now();                            
                    self.fetching = false;
                    
                    // console.log('changed: '+self.urlRoot+' - '+!$.isEmptyObject(self.changed));        
                    if ($.isEmptyObject(self.changed)) self.trigger('change'); // this is a HACK becuase the control.all initially sets for other control.* models (and that is a HACK)
                    
                    if (typeof callback !== 'undefined') callback();
                }});    
            }
            
        } else {

            // console.log('already got data: '+this.urlRoot+' - '+force);        
            if (force) this.trigger('change');
        }        
    },

    log:function(m)
    {
        if (false)
        {
            // console.log(m);        
        }
    },
});