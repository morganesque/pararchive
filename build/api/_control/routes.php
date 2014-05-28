<?php

switch($params[1])
{
    case "nonessential":

        sleep(1.5);
    	echo controlRequest($_SERVER['REQUEST_METHOD'],"control/nonessential.json");

    break;

    case "waterheating":

        sleep(1.5);
    	echo controlRequest($_SERVER['REQUEST_METHOD'],"control/waterheating.json");

    break;

    case "housealarm":

        sleep(1.5);
    	echo controlRequest($_SERVER['REQUEST_METHOD'],"control/housealarm.json");

    break;    

    case "airflow":

        sleep(1.5);
    	echo controlRequest($_SERVER['REQUEST_METHOD'],"control/airflow.json");

    break;

    case "heatingboost":

        sleep(1.5);
        echo controlRequest($_SERVER['REQUEST_METHOD'],"control/heatingboost.json");
    	if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            if ($_POST['status'] == 'on')
            {
                echo putdata("warmth/status.json",array('status'=>'heating (boosted)'));
            } else {
                echo putdata("warmth/status.json",array('status'=>'neutral'));
            }
        }

    break;

    case "all":
    	$data = array();
    	$data['nonessential'] = json_decode(controlRequest('GET',"control/nonessential.json"));
    	$data['waterheating'] = json_decode(controlRequest('GET',"control/waterheating.json"));
    	$data['housealarm'] = json_decode(controlRequest('GET',"control/housealarm.json"));
    	$data['airflow'] = json_decode(controlRequest('GET',"control/airflow.json"));
    	$data['heatingboost'] = json_decode(controlRequest('GET',"control/heatingboost.json"));
    	echo json_encode($data);
    break;

    case "reset":
        $data = array();
        echo putdata("control/nonessential.json",array('status'=>'off'));
        echo putdata("control/waterheating.json",array('status'=>'off'));
        echo putdata("control/housealarm.json",array('status'=>'off'));
        echo putdata("control/airflow.json",array('target'=>'16'));
        echo putdata("control/heatingboost.json",array('status'=>'off'));
    break;

}

function controlRequest($method,$datafile)
{
	switch($method)
	{
		case "GET":
			if (file_exists($datafile))
			{
				return file_get_contents($datafile);	
			} else {
				return '{}';
			}
			
		break;

		case "POST":
        case "PUT": 
            $data = file_get_contents('php://input');
			return putData($datafile,json_decode($data));
		break;
	}
}

function putData($datafile,$data)
{
    $json = json_encode($data);
    if (file_put_contents($datafile, $json));
    return $json;
}

?>