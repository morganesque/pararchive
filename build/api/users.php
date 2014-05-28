<?php

if (!isset($params[1]))
{
    switch($_SERVER['REQUEST_METHOD'])
    {
        case 'PUT':
        case 'POST':
            $data = json_decode(file_get_contents('php://input'));
            $u = R::findOne('user',"username = ?",[$data->username]);

            if (!$u) die(json_encode(array("status"=>'no user with that name')));

            $user = $u->export();

            if ($user['password'] === $data->password)
            {
                $_SESSION['user'] = $user;
                echo json_encode($user);
            } else {
                die(json_encode(array("status"=>'wrong password')));
            }

        break;

        case 'GET':
        default:
            if (isset($_SESSION['user']))
            {
                echo json_encode($_SESSION['user']);

            } else {

                $response = array("status"=>'logged out');
                echo json_encode($response);
            }
        break;
    }
    exit;

} else {

    if (session_destroy()) echo 'logged out';

}

?>