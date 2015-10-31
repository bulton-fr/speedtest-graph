<?php

//--- Check Config ---
if(!property_exists($config, 'fileLog'))
{
	throw new Exception('fileLog config not defined.');
}

if(!property_exists($config, 'daysInterval'))
{
	throw new Exception('daysInterval config not defined');
}

if(!file_exists($config->fileLog))
{
	throw new Exception($config->fileLog.' not exists.');
}

if(!is_readable($config->fileLog))
{
	throw new Exception($config->fileLog.' not readable.');
}
//--- End Check Config ---

$lines = file($config->fileLog, FILE_SKIP_EMPTY_LINES);
$datas = array(
	'datetime' => array(),
	'ping'     => array(),
	'down'     => array(),
	'up'       => array()
);

$regexDate = '\[([0-9]{2}-[0-9]{2}-[0-9]{4} [0-9]{2}:[0-9]{2}:[0-9]{2})\]';
$regexData = '/'.$regexDate.' Ping: ([0-9\.]+) ms \| Download: ([0-9\.]+) Mbit\/s \| Upload: ([0-9\.]+) Mbit\/s/';
$regexSav  = '/'.$regexDate.' (.*)/';

$datatimeNow  = new DateTime;

foreach($lines as $line)
{
	$matches = array();
	$match   = preg_match($regexData, $line, $matches);
	
	if($match === 0)
	{
		$match = preg_match($regexSav, $line, $matches);
		
		$matches = array(
			0 => $matches[0],
			1 => $matches[1],
			2 => 0,
			3 => 0,
			4 => 0
		);
	}
	
	$datetime = DateTime::createFromFormat('d-m-Y H:i:s', $matches[1]);
	$diff = $datatimeNow->diff($datetime);
	
	if($diff->days > $config->daysInterval)
	{
		continue;
	}
	
	$datas['datetime'][] = $datetime;
	$datas['ping'][]     = (float) $matches[2];
	$datas['down'][]     = (float) $matches[3];
	$datas['up'][]       = (float) $matches[4];
}

$firstDate = $datas['datetime'][0];
