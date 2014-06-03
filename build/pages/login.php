
<div class="container-fluid">

	<div class="page-header"><h1>Login</h1></div>

	<p class="lead text--center">Please log in.</p>

	<div class="module login">    
	    <form class="form-signin" id="login-form" method="post" action="/in/">
	        <input class="form-control" tabindex="1" name="username" id="username" type="text" value="" placeholder="Username" autocorrect="off" autocapitalize="off"/>
	        <input class="form-control"  tabindex="2" name="password" id="password" type="password" value="" placeholder="Password" autocorrect="off" autocapitalize="off"/>
	        <label class="checkbox">
	          <input type="checkbox" value="remember-me"> Remember me
	        </label>
	        <button class="btn btn-lg btn-success btn-block" type="submit" id="login_submit">Sign in</button>
	    </form><!-- .login__form -->
	</div><!-- .login-form -->

</div>