

</div><!-- #outer-wrap -->
</div><!-- #inner-wrap -->

<?php /*
<script src="js/main.js"></script>
<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
<script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='//www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-XXXXX-X');ga('send','pageview');
</script>    
*/ ?>    

<?php if ($_CONFIG['reload'] === true): ?>
<script defer src="//localhost:3000/socket.io/socket.io.js"></script>
<script defer src="//localhost:3001/client/browser-sync-client.0.9.1.js"></script>
<?php endif; ?>
</body>
</html>