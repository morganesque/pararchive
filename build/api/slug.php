<?php

$type = "story";

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$slug = $params[1];
			$story = R::findOne($type, "slug = ? ", [$slug]);
			
			echo json_encode($story->export());


			// $bean = R::load($type,$id); //Retrieve
			// $story = $bean->export();

		} else {

			
		}
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>