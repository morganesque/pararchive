<div class="your-stories container-fluid central">

	<div class="page-header">
		<h1>Hello <span class="author-name"></span>!</h1>				
	</div>

	<h3>You can&hellip; <a href="#" class="create-new-story btn btn-lg btn-primary">Create new story</a> &hellip;or choose a story below.</h3>
	<div class="edit-story">		
		<% _.each(items, function(item){ %>
			<div class="edit-story__item">
				<a href="/view/<%= item.slug %>/" class="edit-story__view btn btn-sm btn-primary pull-right">view this story</a>
				<a href="/me/story/<%= item.id %>/edit/" class="edit-story__edit btn btn-sm btn-success pull-right">edit this story</a>
				<h3><%= item.name %></h3>
			</div>
		<% }); %>
	</div>
	
</div>