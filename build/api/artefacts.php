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
 
	case "POST":
		$post = json_decode(file_get_contents('php://input'));	
		$bean = R::dispense($type);
		$bean->import($post);

		$block_id = $bean->block_id;

		$block = R::load('block',$block_id);
		$block->sharedArtefactList[] = $bean;

		$user->ownArtefactList[] = $bean;
				
		R::storeAll([$block,$user]);	
		
		echo json_encode($bean->export());
	break;
 
	case "PUT":
		$post = json_decode(file_get_contents('php://input'));
		$bean = R::dispense($type);
		$bean->import($post);
		R::store($bean); // Update
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