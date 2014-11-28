<?php
$result = 0;
if (isset($_POST['user']))
{
	$_POST['user']['username'] = strtolower($_POST['user']['username']);


	$u = R::find('user',"username = ?",[$_POST['user']['username']]);
	if (sizeof($u))
	{
		echo 'Ooops! That username has been used before, please press BACK and pick another!';
		die;
	}	

	$bean = R::dispense('user');
	$bean->import($_POST['user']);
	$bean->created = R::isoDateTime();
	$bean->updated = R::isoDateTime();	

	$result = R::store($bean); 
}
?>
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]> <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]> <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>pararchive</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <link rel="shortcut icon" href="favicon.ico?v2">
    <link rel="icon" href="/apple-touch-icon-precomposed.png">
    <link rel="apple-touch-icon-precomposed apple-touch-icon" href="/apple-touch-icon-precomposed.png">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="stylesheet" href="/css/styles.css">

    <!-- let modernizr do it's thing (OPTIMIZE THIS LATER!) -->
    <script src="/js/modernizr.js"></script>

    <!-- get fonts from Google Fonts -->
    <!-- <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,900italic' rel='stylesheet' type='text/css'> -->
    <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,700|Merriweather' rel='stylesheet' type='text/css'>
</head>
<body class="colours-body">

<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div>
<![endif]-->

<div id="outer-wrap"><div id="inner-wrap" class="">

	<header id="header" class="sidepad header navbar">
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-3">
					<a href="/" class="logo navbar-brand">Pararchive Home</a>
				</div>		
				<div class="col-xs-9">	
					<ul id="identity" style="display:none" class="nav navbar-nav navbar-right">	
						<li class="navbar-text"><span class="username">Roger</span></li>	
						<li><a class="my-stories navbar-link" href="#">My stories</a></li>
						<li><a class="logout navbar-link" href="#">Sign out</a></li>
					</ul>
				</div>
			</div>
		</div>		
	</header>	
	
	<div id="main" style="width:480px; margin:50px auto;">
	<?php if ($result): ?>
		<p class="bg-success" style="padding:0.5em;font-family:monospace">
			New user created:<br />
			&nbsp;&nbsp;&nbsp;username: <b><?php echo $_POST['user']['username']; ?></b><br />
			&nbsp;&nbsp;&nbsp;password: <b><?php echo $_POST['user']['password']; ?></b><br />
			Happy storytelling!
		</p>
	<?php endif; ?>
	<h2>New User</h2>
		<form method="post" action="/api/newuser/" role="form" class="form-horizontal">
			<div class="form-group">
				<label for="username" class="col-sm-4 control-label">username</label>
				<div class="col-sm-8">
					<input class="form-control" type="text" value="" id="username" name="user[username]" placeholder="enter a username"/>
				</div>
			</div>
			<div class="form-group">
				<label for="firstname" class="col-sm-4 control-label">first name</label>
				<div class="col-sm-8">
				<input class="form-control" type="text" value="" id="firstname" name="user[firstname]" placeholder="enter user's first name"/>
				</div>
			</div>
			<div class="form-group">
				<label for="surname" class="col-sm-4 control-label">surname</label>
				<div class="col-sm-8">
				<input class="form-control" type="text" value="" id="surname" name="user[surname]" placeholder="enter user's surname"/>
				</div>
			</div>	
			<div class="form-group">
				<label for="email" class="col-sm-4 control-label">email address</label>
				<div class="col-sm-8">
				<input class="form-control" type="text" value="" id="email" name="user[email]"placeholder="enter user's email (optional)" />
				</div>
			</div>			
			<input type="hidden" id="type" name="user[type]" value="admin-added"/>
			<input type="hidden" id="status" name="user[status]" value="logged in"/>
			<input type="hidden" id="password" name="user[password]" value="pass765"/>
			<div class="col-sm-8 col-sm-offset-4" style="margin-top:10px;">
				<input type="submit" class="btn btn-primary"/>
			</div>
		</form>
	</div>

</div></div>
</body>
