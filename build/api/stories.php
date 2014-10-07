<?php

$type = "story";

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$id = $params[1];
			if ($id == 'all')
			{
				$stories = R::findAll($type);
				outputStories($stories);	
			} else {
				$bean = R::load($type,$id); //Retrieve
				echo json_encode($bean->export());	
			}

		} else {

			$stories = R::findAll($type, "user_id = ? ", [$user->id]);
			outputStories($stories);
		}
	break;
 
	case "POST":
		$post = json_decode(file_get_contents('php://input'));
		$bean = R::dispense($type);
		
		$bean->import($post);
		$bean->created = R::isoDateTime();

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

function outputStories($stories)
{
	// $stories = R::findAll($type);
	$out = [];			
	foreach($stories as $s)
	{		
		$user = R::load('user',$s->user_id);
		$s->author = $user->firstname.' '.$user->surname;
		$out[] = $s->export();
	}
	echo json_encode($out);
}

?>