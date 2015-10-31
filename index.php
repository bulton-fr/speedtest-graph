<?php

$config = new stdClass;

require_once(__DIR__.'/config.php');
require_once(__DIR__.'/datas.php');

function generateJsonUtcData(&$datas, $type)
{
	$return = '';
	
	foreach($datas['datetime'] as $key => $datetime)
	{
		if($key > 0) {$return .= ',';}
		
		$return .= '['.
			'Date.UTC('.
				$datetime->format('Y').','.
				($datetime->format('m')-1).','.
				$datetime->format('d,H,i,s').
			'), '.$datas[$type][$key].
		']';
	}
	
	return $return;
}
?>
<html lang="fr">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Graph Speedtest</title>
	
	<script>
		var firstDate = Date.UTC(<?php
			echo $firstDate->format('Y').','.
				 ($firstDate->format('m')-1).','.
				 $firstDate->format('d,H,i,s');
		?>);
		
		var PingData     = [<?php echo generateJsonUtcData($datas, 'ping'); ?>];
		var DownloadData = [<?php echo generateJsonUtcData($datas, 'down'); ?>];
		var UploadData   = [<?php echo generateJsonUtcData($datas, 'up'); ?>];
	</script>
	
	<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>
	
	<script src="charts.js"></script>
	<script src="runner.js"></script>
</head>
<body>
	<div id="graph_ping" style="min-width: 310px; height: 260px; margin: 0 auto"></div>
	<div id="graph_down" style="min-width: 310px; height: 260px; margin: 0 auto"></div>
	<div id="graph_up"   style="min-width: 310px; height: 260px; margin: 0 auto"></div>
</body>
</html>