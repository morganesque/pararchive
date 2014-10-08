<div class="container-fluid">
	<div class="row">
		<div class="col-xs-7">
			<ul class="story-panel__blocks">
				<% _.each(items, function(item,a){ %>
				<% if (!item.id) item.id = item.cid; %>
					<li class="block block_<%= item.id %>"><a href="#<%= item.id %>" class="block__link" draggable="true"><%= a+1 %></a></li>
				<% }); %>
				<!-- <a href="#" class="plus btn btn-default"><span class="icon icon-plus"></span></a>			 -->
			</ul>
		</div>
		<div class="col-xs-5">
			<p class="story-panel__btns">
				<a href="#" class="btn-new-block btn btn-sm btn-primary"><span class="icon icon-plus"></span> block</a>
				<% if (typeof meta !== "undefined") { %>
					<a href="/me/story/<%= meta.id %>/edit/" class="btn-edit-story btn btn-sm btn-primary">edit story</a>
					<a href="/view/<%= meta.slug %>/" class="btn-view-story btn btn-sm btn-primary">view story</a>
				<% } %>
			</p>
		</div>
	</div>
</div>