/*
    A base model to inculcate a sense of abandonment and monetary union.
*/
var Model = Backbone.Model.extend({

    fetched: 0,
    diff: 60*60*1000, // milliseconds = 1 hr

    getData:function(callback)
    {
        var n = _.now();
        var self = this;

        // console.log([n, this.fetched, this.diff]);       
        // console.log([n - this.fetched, this.diff]);     

        if (n - this.fetched > this.diff)
        {
            // console.log('fetching new data');       
            this.fetch({success:function(a,b,c)
            {

                // console.log([a,b,c]);        
                // console.log('got new data')  ;        
                self.fetched = _.now();
                if (typeof callback !== 'undefined') callback();
            },error:function(e)
            {
                console.log(e);        
            }});
        } else {
            // console.log('already got data');        
            this.trigger('change');
        }
    },
});