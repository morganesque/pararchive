<?php

$type = "artefact";

function getMimeType($url)
{
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_exec($ch);

	# get the content type
	return curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
}

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); //Retrieve 
			echo json_encode($bean->export());

		} else {

			$id = $_GET['block_id'];
			$block = R::load('block',$id);
			$artefacts = $block->sharedArtefactList;

			$out = [];
			foreach($artefacts as $a)
			{
				array_push($out,$a->export());
			}
			echo json_encode($out);
		}
	break;
 
 	// create
	case "POST":
		$post = json_decode(file_get_contents('php://input'));	
		$bean = R::dispense($type);
		
		$bean->import($post);
		$bean->created = R::isoDateTime();
		$bean->modified = R::isoDateTime();

		// $mime = getMimeType($bean->url);
		// $mime_true = strpos($mime,"image");

		$ext = strtolower(pathinfo($bean->url, PATHINFO_EXTENSION));
		
		if (in_array($ext, array('jpg','jpeg','png','gif','svg','tiff','webp'))) $mime_true = true;
		else $mime_true = false;

		// $mime_true = true;
		if ($mime_true !== false)
		{
			$block = R::load('block',$bean->block_id);
			$block->sharedArtefactList[] = $bean;

			$user->ownArtefactList[] = $bean;
					
			R::storeAll([$block,$user]);		
			echo json_encode($bean->export());
		} else {
			header('HTTP/1.1 500 Internal Server Error');
			echo "I'm sorry but that doesn't seem to be an image. Please only paste addresses of actual images.";
		}
	break;
 
 	// update
	case "PUT":
		$post = json_decode(file_get_contents('php://input'));
		$bean = R::dispense($type);
		$bean->import($post);
		$bean->modified = R::isoDateTime();
		R::store($bean); 
		echo json_encode($bean->export());
	break;
 
	case "DELETE":
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); // Retrieve
			R::trash($bean);
			echo json_encode(array(
				'message'=>'artefact deleted',
				'id'=>$id,
				));
		} else die('need the second param');
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>