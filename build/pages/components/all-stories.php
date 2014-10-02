<div class="container-fluid central">

	<div class="page-header">
		<h1>Everyone's Stories</h1>
	</div>

	<div class="all-stories__list">
		<% _.each(items, function(item){ %>
			<div class="all-stories__item">
				<a href="#<%= item.slug %>" class="all-stories__view pull-right">view this story</a>
				<h3><%= item.name %></h3>
			</div>
		<% }); %>
	</div>
	
</div>