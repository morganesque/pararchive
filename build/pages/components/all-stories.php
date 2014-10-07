<div class="container-fluid central">

	<div class="page-header">
		<h1>Everyone's Stories</h1>
	</div>

	<div class="all-stories__list">
		<% _.each(items, function(item){ %>
			<div class="all-stories__item">
				<a href="/view/<%= item.slug %>/" class="all-stories__view btn btn-sm btn-primary pull-right">view this story</a>
				<% if (isUser(item.user_id)) { %>
					<a href="/edit/story/<%= item.id %>/" class="all-stories__edit btn btn-sm btn-success pull-right">edit this story</a>
				<% } %>
				<h3><%= item.name %></h3>
			</div>
		<% }); %>
	</div>
	
</div>