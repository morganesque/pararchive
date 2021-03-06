<?php
	include('config.php');
	include('pages/top.php');
?>
	<header id="header" class="sidepad header navbar">
		<?php include('pages/components/header.php');?>		
	</header>

	<div id="top" class="sidepad"></div>
	<div id="main" class="sidepad"></div>

	<footer id="footer" class="sidepad footer"></footer>

	<script type="text/template" id="login-template"><?php include('pages/components/login.php');?></script>
	<script type="text/template" id="panel-template"><?php include('pages/components/story-panel.php'); ?></script>
	<script type="text/template" id="stories-template"><?php include('pages/components/your-stories.php'); ?></script>
	<script type="text/template" id="story-template"><?php include('pages/components/edit-story.php'); ?></script>
	<script type="text/template" id="editblock-template"><?php include('pages/components/edit-block.php'); ?></script>
	<script type="text/template" id="editblocktag-template"><?php include('pages/components/edit-block-tags.php'); ?></script>
	<script type="text/template" id="savedblock-template"><?php include('pages/components/saved-block.php'); ?></script>
	<script type="text/template" id="viewfooter-template"><?php include('pages/components/view-footer.php'); ?></script>
	<script type="text/template" id="storyfront-template"><?php include('pages/components/view-story.php'); ?></script>
	<script type="text/template" id="blockview-template"><?php include('pages/components/view-block.php'); ?></script>
	<script type="text/template" id="blockartefactsview-template"><?php include('pages/components/view-block-artefacts.php'); ?></script>
	<script type="text/template" id="blocknotesview-template"><?php include('pages/components/view-block-notes.php'); ?></script>
	
	<script type="text/template" id="allstories-template"><?php include('pages/components/all-stories.php'); ?></script>

<?
    include('pages/bottom.php'); 
?>
