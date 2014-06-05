<?php
	include('../config.php'); 
	include('../pages/inc/read-top.php');
?>
	<div id="readblock">
		
	</div>

	<div id="navblock">
		<a href="#" id="navleft" class="nav"><div id="triangle-left" class="triangle"></div></a>
		<a href="#" id="navright" class="nav"><div id="triangle-right" class="triangle"></div></a>
	</div>

	<script id="block-template" type="text/x-template">
		<?php include("../js/templates/read-main.html"); ?>
	</script>            
<?
    include('../pages/inc/read-bottom.php'); 
?>