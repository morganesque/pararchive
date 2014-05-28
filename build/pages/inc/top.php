    <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js show-righto"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>pararchive</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->        
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="icon" href="apple-touch-icon-precomposed.png">
    <link rel="apple-touch-icon-precomposed apple-touch-icon" href="apple-touch-icon-precomposed.png">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">    
    <link rel="stylesheet" live="<?php echo $live; ?>" href="/css/styles.css">

    <!-- let modernizr do it's thing (OPTIMIZE THIS LATER!) -->
    <script src="/js/modernizr.js"></script>

    <!-- get fonts from Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,900italic' rel='stylesheet' type='text/css'>
    
    <!-- load all the libraries -->
    <script type="text/javascript" src="/js/all.min.js"></script>    

    <!-- load any other plugins and stuff -->
    <!-- <script type="text/javascript" src="/js/pararchive/loginForm.js"></script>-->
    
    <!-- load all the backbone models -->
    <script type="text/javascript" src="/js/pararchive/backbone/sync.js"></script>            
    <script type="text/javascript" src="/js/pararchive/backbone/router.js"></script>            
    <script type="text/javascript" src="/js/pararchive/backbone/model.js"></script>            
    <script type="text/javascript" src="/js/pararchive/backbone/model-story.js"></script>            

    <!-- load all the backbone page views -->
    <script type="text/javascript" src="/js/pararchive/backbone/view-page.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-page-login.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-page-quick.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-page-home.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-page-what.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-page-when.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-page-where.js"></script>    
    
    <!-- load all the backbone component views -->
    <script type="text/javascript" src="/js/pararchive/backbone/view-component.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-control.js"></script>    
    <script type="text/javascript" src="/js/pararchive/backbone/view-storypanel.js"></script>    
 
    <!-- load all the d3 scripts -->  

    <!-- kick things off -->
    <script type="text/javascript" src="/js/pararchive/backbone/init.js"></script>    
</head>
<body class="colours-body">

<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<div id="outer-wrap">
<div id="inner-wrap">