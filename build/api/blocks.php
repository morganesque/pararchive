<?php

$type = "block";

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); //Retrieve 
			echo json_encode($bean->export());

		} else {

			$id = $_GET['story_id'];

			$stories = R::findAll($type, "story_id = ? ", [$id]);
			$out = [];
			foreach($stories as $s)
			{
				array_push($out,$s->export());
			}

			echo json_encode($out);
		}
	break;
 
	case "POST":
		$post = json_decode(file_get_contents('php://input'));	
		$bean = R::dispense($type);
		$bean->import($post);
		$user->ownStoryList[] = $bean;
		$id = R::store($user);	
		$bean->id = $id;
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