<?php

$type = "tag";

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
			die('only request a note with an ID');
		}
	break;
 
 	// create
	case "POST":
		$post = json_decode(file_get_contents('php://input'));	
		$bean = R::dispense($type);
		
		$bean->import($post);
		$bean->created = R::isoDateTime();
		$bean->modified = R::isoDateTime();
		$bean->tag = strtolower($bean->tag);

		$block = R::load('block',$bean->block_id);

		$block->ownTagList[] = $bean;
		$user->ownTagList[] = $bean;

		R::storeAll([$block,$user]);		

		echo json_encode($bean->export());	    
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
				'message'=>'note deleted',
				'id'=>$id,
				));
		} else die('need the second param');
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>