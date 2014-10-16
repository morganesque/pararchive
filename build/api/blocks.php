<?php

$type = "block";

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$id = $params[1];
			if (isset($params[2])) 
			{
				// returning a collection of notes or tags
				$type = $params[2];
				$stuff = R::findAll($type, "block_id = ?", [$id]);
				$out = []; 
				foreach($stuff as $s) 
				{
					if ($type == 'note')
					{
						$u = R::load('user',$s->user_id);
						$u->gravatar = md5($u->email);
						$s->user = $u;	
					}
					$out[] = $s->export();
				}
				echo json_encode($out);
				
			} else {

				// returning a single block
				$bean = R::load($type,$id); //Retrieve 
				echo json_encode($bean->export());	
			}
			

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
 
 	// create
	case "POST":
		$post = json_decode(file_get_contents('php://input'));	
		$bean = R::dispense($type);		
		
		$bean->import($post);		
		$bean->created = R::isoDateTime();
		$bean->modified = R::isoDateTime();

		$user->ownStoryList[] = $bean;
		$id = R::store($user);	

		// $bean->id = $id;
		echo json_encode($bean->export());
	break;
 
 	// update
	case "PUT":
		$post = json_decode(file_get_contents('php://input'));
		$bean = R::dispense($type);		
		
		$bean->import($post);
		$bean->modified = R::isoDateTime();

		R::store($bean); // Update
		echo json_encode($bean->export());
	break;
 
	case "DELETE":
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); // Retrieve
			R::trash($bean);
			echo json_encode(array(
				'message'=>'block deleted',
				'id'=>$id,
				));
 
		} else die('need the second param');
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>