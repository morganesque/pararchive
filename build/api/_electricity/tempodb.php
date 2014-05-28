<pre>
<?php

$THE_KEY = 'alertme15min';

function deleteAll()
{
    global $THE_KEY;

    include_once('lib/tempo/tempodb.php');
    $tdb = new TempoDB("a5adb981f51546ff881cc038fac3e2fc", "f0fc1173e6f241a8a05bcd17b7cd146c");
    $summary = $tdb->delete_all_series(array());
    var_dump($summary);
}

function createSeries()
{
    global $THE_KEY;

    include_once('lib/tempo/tempodb.php');
    $tdb = new TempoDB("a5adb981f51546ff881cc038fac3e2fc", "f0fc1173e6f241a8a05bcd17b7cd146c");
    $series1 = $tdb->create_series($THE_KEY);
    var_dump($series1);
}

function getAlertMeData()
{
    include_once('alertmeAPI.php');
    $alertme = new AlertmeAPI();
    $json = $alertme->getEnergyUsage();
    // $json = $alertme->getCostUsage();
    // $json = $alertme->getDeviceStatus('MeterReader','00-0D-6F-00-00-7F-CD-CE');
    $data = json_decode($json);
    return $data->electricity->soFarToday;
}

function putDataIntoTempo($time,$val)
{
    global $THE_KEY;

    include_once('lib/tempo/tempodb.php');
    $tdb = new TempoDB("a5adb981f51546ff881cc038fac3e2fc", "f0fc1173e6f241a8a05bcd17b7cd146c");
    // $series1 = $tdb->create_series("alertme15min");

    $data = array(
        // new DataPoint(new DateTime("2012-01-01T01:00:00"), 12.34),
        new DataPoint(new DateTime($time), $val)
    );

    $tdb->write_key($THE_KEY, $data);
}

function getLastValue()
{
    global $THE_KEY;

    include_once('lib/tempo/tempodb.php');
    $tdb = new TempoDB("a5adb981f51546ff881cc038fac3e2fc", "f0fc1173e6f241a8a05bcd17b7cd146c");
    // $keys = array("alertme15min");
    // $series_list = $tdb->get_series(array("keys" => $keys));

    $stime = date('Y-m-d',time()); // var_dump($stime);
    $etime = date('Y-m-d',time()+(60*60*24)); //var_dump($etime);

    $start = new DateTime($stime);
    $end = new DateTime($etime);
    $keys = array($THE_KEY);

    // $data = $tdb->read_key($THE_KEY,$start,$end);
    $d = $tdb->read($start,$end,array('keys'=>$keys,'interval'=>'1min','function'=>'sum'));
    // $d = $tdb->read($start,$end,array('keys'=>$keys,'interval'=>'1min'));

    // var_dump($d[0]->data[0]->value);

    if (empty($d[0]->data))
    {
        return 0;
    } else {
        $data = $d[0]->data[0];
        return $data->value;
    }
}

function putStuffIn()
{
    $val = getAlertMeData();    // the soFarToday electricity reading 
    var_dump(array('value from Alertme',$val));
    $time = date('c',time());   // the time right now.

    $last = getLastValue();
    var_dump(array('sum of values in TempoDB',$val));
    $val -= $last;
    var_dump(array('remaining amount to enter as new value',$val));

    var_dump(array('putting in the following data',$val,$time));

    putDataIntoTempo($time,$val);
}

putStuffIn();
// createSeries();
// deleteAll();
// putStuffIn();
// putDataIntoTempo(date('c',time()),1);
// getLastValue();

?>
</pre>