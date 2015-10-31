var Charts = (function(jQuery)
{
	'use strict';
	
	function Charts(options)
	{
		//Check if function has been instancied by new for use the right this keyword.
		if(!(this instanceof Charts))
		{
			throw Error('Charts bad instance');
		}
		
		
		var options = options || {};
		
		this.divID     = options.divID || '';
		this.color     = options.color || '#7cb5ec';
		this.title     = options.title || '';
		this.yTitle    = options.yTitle || '';
		this.firstDate = options.firstDate || Date.UTC();
		
		options.highcharts = options.highcharts || {};
		options.highcharts.tickInterval  = options.highcharts.tickInterval || (24 * 3600 * 1000);
		options.highcharts.pointInterval = options.highcharts.pointInterval || 60;
		
		this.highchartsOptions = options.highcharts;
	}
	
	Charts.prototype.highcharts = function highcharts(data)
	{
		if(typeof data != 'object')
		{
			data = [];
		}
		
		if(this.divID === '')
		{
			throw Error('divID not defined');
		}
		
		var jqDivID = jQuery(this.divID);
		if(jqDivID.length === 0)
		{
			throw Error('#'+this.divID+' not found by jQuery');
		}
		
		jqDivID.highcharts({
			colors: [this.color],
			chart: {type: 'area'},
			title: {text: this.title},
			xAxis: {
				allowDecimals: false,
				type: "datetime",
				tickInterval: this.highchartsOptions.tickInterval
			},
			yAxis: {
				title: {text: this.yTitle},
				labels: {formatter: function () {return this.value;}}
			},
			series: [{
				pointInterval: this.highchartsOptions.pointInterval,
				pointStart: this.firstDate,
				showInLegend: false,
				data: data
			}]
		});
	}
	
	return Charts;
})(jQuery);
