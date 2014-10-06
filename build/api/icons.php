<?php

$type = "icons";
$out = array();

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		$file = "../../src/sass/_icons.scss";
		$cont = file($file);
		foreach($cont as $c)
		{			
			if (preg_match('/^\.icon-/',$c))
			{
				$s = strpos($c,':before');
				$t = substr($c,1,$s-1);
				$out[] = $t;
			}
		}
	break;
 
 	// create
	case "POST":		
	break;
 
 	// update
	case "PUT":
	break;
 
	case "DELETE":
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js show-righto"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>pararchive</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="icon" href="/apple-touch-icon-precomposed.png">
    <link rel="apple-touch-icon-precomposed apple-touch-icon" href="/apple-touch-icon-precomposed.png">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <!-- <link rel="stylesheet" href="http://i.icomoon.io/public/temp/069a4c5316/Pararchive/style.css"> -->
    <link rel="stylesheet" href="/css/styles.css">
    <style type="text/css">
		body {
			margin:50px;
		}
		p {
			display:inline-block;			
			margin:20px;
			text-align:center;
		}
		p .icon {
			font-size:4em;
		}
    </style>
</head>
<body>
<?php
	foreach($out as $o)
	{
		echo '<p><span class="icon '.$o.'"></span><br />'.$o.'</p>'."\n";
	}
?>
</body>
</html>