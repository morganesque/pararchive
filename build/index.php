<?php
	include('config.php'); 

	include('pages/inc/top.php');
?>
	<div class="left-col">
		
		<div class="container-fluid"></div>

	</div>
	<div class="right-col">		
	
		<div class="top-col" id="top"></div>
		<div id="main"></div>	

	</div>

	<script type="text/template" id="identity-template"><?php include('pages/identity.php');?></script>
	<script type="text/template" id="login-template"><?php include('pages/login.php');?></script>
	<script type="text/template" id="panel-template"><?php include('pages/inc/story-panel.php'); ?></script>
	<script type="text/template" id="stories-template"><?php include('pages/your-stories.php'); ?></script>
	<script type="text/template" id="story-template"><?php include('pages/story-list.php'); ?></script>
	<script type="text/template" id="editblock-template"><?php include('pages/edit-block.php'); ?></script>
	<script type="text/template" id="savedblock-template"><?php include('pages/saved-block.php'); ?></script>

<?
    include('pages/inc/bottom.php'); 
?>