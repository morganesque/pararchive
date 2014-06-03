<?php

session_start();

/*
    Grab the URL structure.
*/
if (isset($_GET['url']))
{
    $params = preg_split('@/@', $_GET['url'], NULL, PREG_SPLIT_NO_EMPTY);
} else {
    $params = array('index');
}

/*
    If there's no pararmeters then don't go futher.
*/
if (!isset($params[0])) die('I say, this is an error don\'t you know. Tallyho!');

/*
    If there're not logged in (and not trying) go no further.
*/
if ($params[0] !== 'users' && !isset($_SESSION['user']))
{
    http_response_code(401);
    die('Authentication Error 401');
} 
    
include('config.php');
include('lib/rb.phar');
R::setup('mysql:host=localhost;dbname='.$database,$username,$password);

if (isset($_SESSION['user'])) $user = R::load('user',$_SESSION['user']['id']); // loads Jane

/*
    Deal with request.
*/
switch($params[0])
{
    case 'users':
        include_once('users.php');
    break;       

    case 'stories':
        include_once('story.php');
    break;

    case 'blocks':
        include_once('blocks.php');
    break;

    case 'artefacts':
        include_once('artefacts.php');
    break;

    case 'test':
        include_once('test.php');
    break;

    default:
        die('Fell at the first hurdle old bean.');
    break;
}

// function getCache($time)
// {
//     global $params;
//     $filename = 'cache/'.implode('-',$params).'.cache';
//     $t = 0; 
//     if (file_exists($filename)) 
//     {
//         $t = filemtime($filename);
//         if (time() - $t < 60*$time)
//         {
//             return file_get_contents($filename);

//         } else return false;
//     } else return false;
// }

// function cacheData($json)
// {
//     global $params;
//     $filename = 'cache/'.implode('-',$params).'.cache';
//     file_put_contents($filename, $json);
// }

?>