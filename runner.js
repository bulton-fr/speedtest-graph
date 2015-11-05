jQuery(document).ready(function()
{
	/*
			  bleu       noir       vert       orange     violet     rose       jaune      bleu vert  rose       bleu clair
	colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1']
	*/
	
	var ChartPing = new Charts({
		divID: '#graph_ping',
		title: 'Ping',
		yTitle: 'ms',
		firstDate: firstDate,
		highcharts: {
			yAxisType: yAxisType
		}
	});
	ChartPing.highcharts(PingData);
	
	var ChartDown = new Charts({
		divID: '#graph_down',
		color: '#90ed7d',
		title: 'Download',
		yTitle: 'Mbit/s',
		firstDate: firstDate,
		highcharts: {
			yAxisType: yAxisType
		}
	});
	ChartDown.highcharts(DownloadData);
	
	var ChartUp = new Charts({
		divID: '#graph_up',
		color: '#f45b5b',
		title: 'Upload',
		yTitle: 'Mbit/s',
		firstDate: firstDate,
		highcharts: {
			yAxisType: yAxisType
		}
	});
	ChartUp.highcharts(UploadData);
});
