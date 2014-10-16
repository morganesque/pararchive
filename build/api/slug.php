<?php

$type = "story";

switch($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
        if (isset($params[1]))
        {
            $slug = $params[1];
    odelb        $story = R::findOne($type, "slug = ? ", [$slug]);

            echo json_encode($story->export());

        } else { }
    break;

    default: echo $_SERVER['REQUEST_METHOD'];
}

?>
