<?php

$type = "artefact";

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

		$block = R::load('block',$bean->block_id);
		$block->sharedArtefactList[] = $bean;

		$user->ownArtefactList[] = $bean;
				
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
		// if (isset($params[1]))
		// {
		// 	$id = $params[1];
		// 	$bean = R::load($type,$id); // Retrieve
		// 	R::trash($bean);
		// } else die('need the second param');
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>