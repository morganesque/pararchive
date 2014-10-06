<div class="thumbs">
	<% _.each(items, function(item){ %><div class="display">
			<% if (!item.thumbnail_url) item.thumbnail_url = item.url; %>
			<a href="#<%= item.id %>" style="background-image:url(<%= item.thumbnail_url %>);" />
		</div><% }); %>
</div>
<div class="show-all">
	<a class="btn-close"><span class="icon icon-close"></span></a>
</div>