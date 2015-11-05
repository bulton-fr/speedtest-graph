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
		options.highcharts.yAxisType     = options.highcharts.yAxisType || 'linear';
		options.highcharts.tickInterval  = options.highcharts.tickInterval || (24 * 3600 * 1000);
		options.highcharts.pointInterval = options.highcharts.pointInterval || 60;
		
		this.highchartsOptions = options.highcharts;
		
		this.chart = null;
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
		
		var highchartsDefaultMenu = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
		//var highchartsMenu = Object.clone(highchartsDefaultMenu); //Not work in chrome
		//var highchartsMenu = jQuery.extend(true, {}, highchartsDefaultMenu); //Create a object, not a array
		var highchartsMenu = JSON.parse(JSON.stringify(highchartsDefaultMenu));
		
		highchartsMenu.push({separator: true});
		highchartsMenu.push({
			text: 'Logarithme',
			onclick: jQuery.proxy(this.HClog, this)
		});
		highchartsMenu.push({
			text: 'Linear',
			onclick: jQuery.proxy(this.HClin, this)
		});
		
		this.chart = jqDivID.highcharts({
			colors: [this.color],
			chart: {type: 'area'},
			title: {text: this.title},
			xAxis: {
				allowDecimals: false,
				type: "datetime",
				tickInterval: this.highchartsOptions.tickInterval
			},
			yAxis: {
				type: this.highchartsOptions.yAxisType,
				title: {text: this.yTitle},
				labels: {formatter: function () {return this.value;}}
			},
			series: [{
				pointInterval: this.highchartsOptions.pointInterval,
				pointStart: this.firstDate,
				showInLegend: false,
				data: data
			}],
			exporting: {
				buttons: {
					contextButton: {
						menuItems : highchartsMenu
					}
				}
			}
		});
	}
	
	Charts.prototype.HClog = function HClog()
	{
		var yAxis = this.chart.highcharts().yAxis[0];
		yAxis.update({type: 'logarithmic'});
	};
	
	Charts.prototype.HClin = function HClin()
	{
		var yAxis = this.chart.highcharts().yAxis[0];
		yAxis.update({type: 'linear'});
	};
	
	return Charts;
})(jQuery);
