<?php

$KEYS = array('alertme15min');
include_once('lib/tempo/tempodb.php');
$tdb = new TempoDB("a5adb981f51546ff881cc038fac3e2fc", "f0fc1173e6f241a8a05bcd17b7cd146c");

$ZONE = new DateTimeZone('Europe/London');

switch($params[1])
{
    case "rainwater":
        $d = rand(0,200)/100;
        $f = ($d > 1);
        $data = array("status"=>$f,'num'=>$d);
        $json = json_encode($data);
        echo $json;
    break;

    case "hotwatertank":
        $data = array(20,20,22,24,28,36,52,60,65,64,63,62,61,60,59,58,57,56,55,54);
        $json = json_encode(array('data'=>$data));
        echo $json;
    break;

    case "now":
        $data = array();
        $d = rand(0,500)/100;
        $json = json_encode(array('readings'=>array($d)));
        echo $json;
    break;

    case "day":

        switch($params[2])
        {            
            /*
                DON'T THINK THIS IS USED ANYMORE SINCE IT'S INCLUDED IN THE AVERAGE CASE.
            */
            case "yesterday":
                if ($json = getCache(60*24)) echo $json;
                else {
                    // echo 'SOURCE';
                    $date = date('Y-m-d',time()+(-1*60*60*24));
                    $start = new DateTime($date,$ZONE);
                    $end = new DateTime(date('Y-m-d',time()+(0*60*60*24)),$ZONE);
                    $interval = '1day';
                    $d = $tdb->read($start,$end,array('keys'=>$KEYS,'interval'=>$interval,'function'=>''));
                    $json = json_encode(array(                            
                        'date' => $d[0]->data[0]->ts->format('U'),
                        'value' => $d[0]->data[0]->value
                        ));
                    cacheData($json);
                    echo $json;
                }                
            break;

            case "average":
                if ($json = getCache(60*24)) echo $json;
                else {
                    // start and end dates for measuring the averages.                    
                    $start = new DateTime("2013-12-19", $ZONE); // the first day we have data for.
                    $end = new DateTime(date('Y-m-d',time()+(1*60*60*24)), $ZONE); // tomorrow (well midnight tonight)                

                    // the period we'd like to wrap up data for.
                    $interval = '1day';

                    // function - we have to get a total for each 15mins (not just a representative number).
                    $function = 'sum';

                    // get data from tempo.
                    $d = $tdb->read($start,$end,array('keys'=>$KEYS,'interval'=>$interval,'function'=>$function));

                    // get the array key for yesterday and grab that value.
                    $y = count($d[0]->data) - 2;
                    $yesterday = $d[0]->data[$y]->value;

                    // work out the average
                    $average = ($d[0]->summary->data['sum']/count($d[0]->data));

                    // gather up the data to send back
                    $data = array(
                        // 'today' => $today,
                        'yesterday' => $yesterday,
                        'average' => $average
                        );

                    $json = json_encode($data);
                    cacheData($json);
                    echo $json;
                } 
            break; 

            // basically if they've passed a date string.
            default:
                if ($json = getCache(15)) echo $json;
                else {
                    
                    // echo "fishing is great<br />";
                    $time = strtotime($params[2]);
                    
                    // set up date range.
                    $start = new DateTime(date('Y-m-d',$time),$ZONE); // var_dump($start->format('c'));
                    $end = new DateTime(date('Y-m-d',$time+(1*60*60*24)),$ZONE); // var_dump($end->format('c'));

                    // tell tempo how to group the results.
                    $interval = '15min';

                    // function - we have to get a total for each 15mins (not just a representative number).
                    $function = 'sum';

                    // get results from tempo.
                    $d = $tdb->read($start,$end,array('keys'=>$KEYS,'interval'=>$interval,'function'=>$function));

                    $data = array(); $c = 0; 
                    foreach($d[0]->data as $dt)
                    {
                        $time = $dt->ts->format('h:ia');
                        $val = max(0,$dt->value); // if it's below zero it's a mistake.
                        array_push($data, array('num'=>$val,'time'=>$time));
                        $c++;
                    }
                    $total = $d[0]->summary->data['sum'];
                    $json = json_encode(array('total'=>$total,'series'=>$data));
                    cacheData($json);
                    echo $json;
                }
            break;           
        }
        
    break;

    case "month":
        case "this":
            if ($json = getCache(1*60)) echo $json;
            else {
                include('month_this.php');
            }
        break;
    break;
}

?>