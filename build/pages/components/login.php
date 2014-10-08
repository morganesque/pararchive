<div class="container-fluid central">

	<div class="page-header"><h1>Login</h1></div>

	<p class="lead text--center">Please log in.</p>

	<div class="module">    
	    <form class="form-signin" id="login-form" method="post" action="/in/">
	    	<div class="form-group">
		        <input class="form-control" tabindex="1" name="username" id="username" type="text" value="" placeholder="Username" autocorrect="off" autocapitalize="off"/>
	        </div>
	        <div class="form-group">
		        <input class="form-control"  tabindex="2" name="password" id="password" type="password" value="" placeholder="Password" autocorrect="off" autocapitalize="off"/>
		    </div>
		    <div class="checkbox">
		        <label><input type="checkbox" value="remember-me">Remember me</label>
	        </div>
	        <div class="form-group">
		        <button class="btn btn-lg btn-primary btn-block" type="submit" id="login_submit">Sign in</button>
	        </div>
	    </form><!-- .login__form -->
	</div><!-- .login-form -->

</div>