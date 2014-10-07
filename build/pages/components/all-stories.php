<div class="container-fluid central">

	<div class="page-header">
		<h1>Everyone's Stories</h1>
		<br />
		<p>Here are all the stories currently in Pararchive. You can view them and edit your own.</p>
	</div>

	<div class="all-stories__list">
		<% _.each(items, function(item){ %>
			<div class="all-stories__item">
				<a href="/view/<%= item.slug %>/" class="all-stories__view btn btn-sm btn-primary pull-right">view this story</a>
				<% if (isUser(item.user_id)) { %>
					<a href="/edit/story/<%= item.id %>/" class="all-stories__edit btn btn-sm btn-success pull-right">edit this story</a>
				<% } %>
				<h3><%= item.name %> <small>by <%= item.author %></small></h3>
			</div>
		<% }); %>
	</div>
	
</div>