<?php

$type = "embed";

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
    	$url = 'https://www.youtube.com/watch?v=K4NRJoCNHIs';
    	// $url = 'http://www.ihd-wallpapers.com/wp-content/uploads/2014/08/Skyscraper-3.jpg';
    	// $url = 'https://www.flickr.com/photos/1fphotos/15218298548/';
    	// $url = 'http://morganesque.com/';
    	

        // if (isset($params[1]))
        // {
        // 	$url = $params[1];
        // 	var_dump($url);

        // } 
    break;

    default: echo $_SERVER['REQUEST_METHOD'];
}

?>
