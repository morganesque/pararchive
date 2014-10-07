<div class="container-fluid view-story">
	<div class="row">
		<div class="col-xs-offset-2 col-xs-8 text-center">
			<h1 class="view-story__name"><%= name %></h1>
			<% if (typeof blurb !== "undefined") { %>
			<p class="view-story__blurb"><%= blurb %></p>
			<% } %>
			<% if (blocks > 0) { %>
			<p><button class="view-story__start btn btn-primary btn-lg">Start reading</button></p>
			<% } else { %>
			<p class="text-primary">{ This story currently has no blocks }</p>
			<% }  %>
		</div>
	</div>
</div>