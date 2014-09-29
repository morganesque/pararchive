<?php
	include('config.php'); 

	include('pages/inc/top.php');
?>
	<header id="header" class="sidepad header navbar">
		<div class="container-fluid">
			<nav>
			<a href="/" class="navbar-brand">Pararchive</a>		
			<?php include('pages/identity.php'); ?>
			</nav>
		</div>
	</header>

	<div id="top" class="sidepad"></div>
	<div id="main" class="sidepad"></div>	
	
	<footer id="footer" class="sidepad footer out"></footer>

	<script type="text/template" id="login-template"><?php include('pages/login.php');?></script>
	<script type="text/template" id="panel-template"><?php include('pages/inc/story-panel.php'); ?></script>
	<script type="text/template" id="stories-template"><?php include('pages/your-stories.php'); ?></script>
	<script type="text/template" id="story-template"><?php include('pages/story-list.php'); ?></script>
	<script type="text/template" id="editblock-template"><?php include('pages/edit-block.php'); ?></script>
	<script type="text/template" id="savedblock-template"><?php include('pages/saved-block.php'); ?></script>
	<script type="text/template" id="viewfooter-template"><?php include('pages/view-footer.php'); ?></script>
	<script type="text/template" id="storyfront-template"><?php include('pages/story-front.php'); ?></script>
	<script type="text/template" id="blockview-template"><?php include('pages/block-view.php'); ?></script>

<?
    include('pages/inc/bottom.php'); 
?>