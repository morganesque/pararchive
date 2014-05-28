<?php
    // set start and end dates for this data we're after.
    $first_day_this_month = new DateTime(date('Y-m-02',time()), new DateTimeZone('Europe/London'));
    $end_of_today = new DateTime(date('Y-m-d',time()+(1*60*60*24)), new DateTimeZone('Europe/London'));

    // grab this month's data.
    $this_month = getMonthInDays($first_day_this_month,$end_of_today);

    // work out what the first day of last month is.
    $year = date('Y',time());
    $last_month_number = (string)(date('n',time()) - 1); // last month
    if ($last_month_number < 1) 
    {
        $last_month_number = '12'; // check it's not January
        $year -= 1;
    }
    if (strlen($last_month_number) < 2) $last_month_number = '0'.$last_month_number; // add leading zeros.

    // set start and end dates for this data we're after.
    $first_day_last_month = new DateTime(date($year.'-'.$last_month_number.'-02',time()), $ZONE);
    $last_day_last_month = new DateTime(date($year.'-m-01',time()), $ZONE);

    // grab this month's data.
    $last_month = getMonthInDays($first_day_last_month,$last_day_last_month);

    // -- HACK -- just do something with last month's total.
    $average = $last_month['total'] * (1 - rand(0,100)/500);

    // gather the data for sending back.
    $data = array(
        'this' => $this_month['data'],
        'last' => $last_month['data'],
        'sums' => array(
            'average' => $average,
            'this' => $this_month['total'],
            'last' => $last_month['total']
            )                    
        );

    $json = json_encode($data);
    cacheData($json);
    echo $json;

    function getMonthInDays($start,$end)
    {
        global $tdb, $KEYS;

        // tell tempo how to group the data.
        $interval = '1day';

        // function - we have to get a total for each day (not just a representative number).
        $function = 'sum';

        // get data from tempo.
        $d = $tdb->read($start,$end,array('keys'=>$KEYS,'interval'=>$interval,'function'=>$function));
        // var_dump($d);

        // grab the average it also returns.
        $average = $d[0]->summary->data['mean'];

        // set up an array for this month's data.
        $this_month = array();     

        // push a friendly date and the data value into $now
        foreach($d[0]->data as $dt)
        {
            // if ($dt->ts->format('M') == $month) // only if it's this month.
            array_push($this_month, array(
                'date' => $dt->ts->format('jS M Y'),
                'num' => max(0,$dt->value)
                ));
        }

        // work out a grand total for this month.
        $month_total = 0;
        foreach($this_month as $l) $month_total += $l['num'];

        // send it all back.
        return array(
            'data' => $this_month,
            'average' => $average,
            'total' => $month_total
            );
    }
?>