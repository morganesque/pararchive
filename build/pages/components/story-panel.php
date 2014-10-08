<div class="container-fluid">
	<div class="row">
		<div class="col-xs-8">
			<h4 class="story"><span class="story-name"></span></h4>
		</div>		
		<div class="col-xs-4">
			<p class="story-panel__btns">				
				<% if (typeof meta !== "undefined") { %>
					<a href="/me/story/<%= meta.id %>/edit/" class="btn-edit-story btn btn-sm btn-primary">change details</a>
					<a href="/view/<%= meta.slug %>/" class="btn-view-story btn btn-sm btn-primary">preview</a>
				<% } %>
			</p>
		</div>
	</div><!-- .row -->
	<div class="row">
		<div class="col-xs-10">
			<ul class="story-panel__blocks">
				<% _.each(items, function(item,a){ %>
				<% if (!item.id) item.id = item.cid; %>
					<li class="block block_<%= item.id %>"><a href="#<%= item.id %>" class="block__link" draggable="true"><%= a+1 %></a></li>
				<% }); %>
				<!-- <a href="#" class="plus btn btn-default"><span class="icon icon-plus"></span></a>			 -->
			</ul>
		</div>
		<div class="col-xs-2">
			<p class="story-panel__btns"><a href="#" class="btn-new-block btn btn-sm btn-primary"><span class="icon icon-plus"></span> block</a></p>
		</div>
	</div>
</div>