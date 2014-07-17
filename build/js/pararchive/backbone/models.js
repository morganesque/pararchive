// just to be safe.
if (typeof(actuate) == "undefined") actuate = {};

/*
    --------------
    ALL THE MODELS
    --------------
*/        
(function(actuate)
{
	actuate.models = {};
	
	/*
		Temperatures		
	*/			

	var InsideTemp = new ActuateModel;
	InsideTemp.urlRoot = '/api/warmth/temperature/inside';	

	var OutsideTemp = new ActuateModel;
    OutsideTemp.urlRoot = '/api/warmth/temperature/outside';

    var BothTemp = new Backbone.Model;
    BothTemp.set({
        inside: InsideTemp,
        outside: OutsideTemp
    })

    actuate.models.temperature = {
        inside:  InsideTemp,
        outside: OutsideTemp,
        both:    BothTemp,
    };

    /*
    	Security 
    */	

    var Security = new ActuateModel;
    Security.urlRoot = '/api/security/all';

    actuate.models.security = Security;

    /*
    	Electricity
    */		
    
    // var E_MonthlyUsage = new MonthlyModel('electricity');

    var E_MonthlyUsage = new ActuateModel;
    E_MonthlyUsage.urlRoot = '/api/electricity/month/this/';

    var E_DayUsage = new ActuateModel;
    E_DayUsage.urlRoot = '/api/electricity/day/';
    // E_DayUsage.urlRoot = 'http://api.staging.actuatedfutures.com/electricity/';

    var E_DayCompare = new ActuateModel;
    E_DayCompare.urlRoot = '/api/electricity/day/average/';

    var c = 0;

    var E_NowUsage = new ActuateModel;
    E_NowUsage.urlRoot = '/api/electricity/now/';
    E_NowUsage.parse = function(response,options)
    {       
        c++;
        if (this.has("readings"))
        {
            var j = this.get('readings');
            j.push(response.readings[0]);        
            if (j.length > 20) j.shift();
            return {readings:j,change:c};
        } else {
            return response;
        }
    };

    actuate.models.electricity = {
        month:      E_MonthlyUsage,
        day:        E_DayUsage,
        day_compare:E_DayCompare,
        now:        E_NowUsage
    };

	/*
		Water
	*/

    // var W_MonthlyUsage = new MonthlyModel('electricity'); 
    var W_MonthlyUsage = new ActuateModel;
    W_MonthlyUsage.urlRoot = '/api/electricity/month/this/';

	var W_DayUsage = new ActuateModel;
    W_DayUsage.urlRoot = '/api/water/day/';

    var W_DayCompare = new ActuateModel;
    W_DayCompare.urlRoot = '/api/water/day/average/';

    var RainWaterStatus = new ActuateModel;
    RainWaterStatus.urlRoot = '/api/water/rainwater/';

    var HotWaterTankStatus = new ActuateModel;
    HotWaterTankStatus.urlRoot = '/api/water/hotwatertank/';

    actuate.models.water = {
        month:          W_MonthlyUsage,
        day:            W_DayUsage,
        day_compare:    W_DayCompare,
        rainwater:      RainWaterStatus,    
        hotwatertank:   HotWaterTankStatus,
    };

    /*
        Control
    */        
    var Nonessential = new ActuateModel;
    // Nonessential.urlRoot = 'http://api.staging.actuatedfutures.com/master-switch/';
    Nonessential.urlRoot = '/api/control/nonessential';

    var WaterHeatBoost = new ActuateModel;
    WaterHeatBoost.urlRoot = '/api/control/waterheating';

    var AirFlowStatus = new ActuateModel;
    AirFlowStatus.urlRoot = '/api/control/airflow';
    
    var HouseAlarm = new ActuateModel;
    HouseAlarm.urlRoot = '/api/control/housealarm/';

    var ControlAll = new ActuateModel;
    ControlAll.urlRoot = '/api/control/all/';

    actuate.controls = {
        all:          ControlAll,
        nonessential: Nonessential,
        waterheating: WaterHeatBoost,        
        housealarm:   HouseAlarm,
        airflow:      AirFlowStatus,
    };   

})(actuate)

