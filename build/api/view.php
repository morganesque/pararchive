<?php

$type = "story";

switch($_SERVER['REQUEST_METHOD'])
{
	case 'GET':
		if (isset($params[1]))
		{
			$id = $params[1];
			$bean = R::load($type,$id); //Retrieve
			$story = $bean->export();			

			$bmp = R::findAll('block', "story_id = ? ", [$id]);
			$blocks = [];
			foreach($bmp as $s)
			{
				array_push($blocks,$s->export());
			}

			$story['blocks'] = $blocks;
			
			foreach($blocks as $k=>$b)
			{
				$artefacts = [];
				$amp = R::findAll('artefact',"block_id = ? ",[$b['id']]);
				foreach($amp as $a)
				{
					array_push($artefacts, $a->export());					
				}

				$story['blocks'][$k]['artefacts'] = $artefacts;
			}

			echo json_encode($story);

		} else {

			
		}
	break;
 
	default: echo $_SERVER['REQUEST_METHOD'];
}

?>