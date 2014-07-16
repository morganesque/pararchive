<?php

$type = "story";

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); //Retrieve
			echo json_encode($bean->export());

		} else {

			$stories = R::findAll($type, "user_id = ? ", [$user->id]);
			// $stories = R::findAll($type);
			$out = [];
			foreach($stories as $s)
			{
				$out[] = array(
					"id"=>$s->id,
					"name"=>$s->name
				);
			}
			echo json_encode(array('stories'=>$out));
		}
	break;
 
	case "POST":
		$post = json_decode(file_get_contents('php://input'));
		$bean = R::dispense($type);
		$bean->import($post);

		$user->ownStoryList[] = $bean;
		$id = R::store($user);	

		// $bean->id = $id;
		echo json_encode($bean->export());
	break;
 
	case "PUT":
		$post = json_decode(file_get_contents('php://input'));
		$bean = R::dispense($type);
		$bean->import($post);
		$id = R::store($bean); // Create or Update
		$bean->id = $id;
		echo json_encode($bean->export());
	break;
 
	case "DELETE":
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); // Retrieve
			R::trash($bean);
 
		} else die('need the second param');
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>