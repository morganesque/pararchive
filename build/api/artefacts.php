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

		include_once('lib/essence/bootstrap.php');
		$Essence = Essence\Essence::instance( );

		$url = $bean->url;
		$Media = $Essence->embed($url);

		if ( $Media ) {
			// echo 'got media!';
		    $bean->import($Media);	
		    $block = R::load('block',$bean->block_id);
			$block->sharedArtefactList[] = $bean;
			$user->ownArtefactList[] = $bean;							
			R::storeAll([$block,$user]);		
			echo json_encode($bean->export());	    
		} else {			
			// echo 'no media!';
			$urls = $Essence->extract($url);			
			if ($urls)
			{
				header('HTTP/1.1 500 Internal Server Error');
				echo "I'm sorry that URL isn't compatible right now, we're working on it honest!";
				// echo 'got urls!';
				/*	
				$array = $bean->export();
				$array['suggestions'] = $urls;
				echo json_encode($array);
				*/
			} else {
				// echo 'no urls!';
				$ext = strtolower(pathinfo($bean->url, PATHINFO_EXTENSION));	
				if (in_array($ext, array('jpg','jpeg','png','gif','svg','tiff','webp'))) $mime_true = true;
				else $mime_true = false;

				if ($mime_true !== false)
				{
					$bean->type = 'photo';
					$block = R::load('block',$bean->block_id);
					$block->sharedArtefactList[] = $bean;
					$user->ownArtefactList[] = $bean;							
					R::storeAll([$block,$user]);		
					echo json_encode($bean->export());
				} else {
					header('HTTP/1.1 500 Internal Server Error');
					echo "I'm sorry but that web address isn't one I recognise.\n\nPlease try a different one.";
				}
			}
		}

		return;

		

		// $mime_true = true;
		
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