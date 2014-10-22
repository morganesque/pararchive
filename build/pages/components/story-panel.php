<div class="container-fluid">
	<div class="row">
		<div class="col-xs-8">
			<h4 class="story"><span class="story-name"></span></h4>
		</div>		
		<div class="col-xs-4">
			<div class="story-panel__btns story-panel__btns--top">				
				<% if (typeof meta !== "undefined") { %>					
					<div class="block-edit-buttons">
						<a href="/me/story/<%= meta.id %>/edit/" class="btn-edit-story btn btn-sm btn-primary">change details</a>										
						<span class="preview">Preview</span>
						<div class="btn-group block-edit">						
							<a href="/view/<%= meta.slug %>/" class="btn-view-story btn btn-sm btn-primary">story</a>
							<a href="/view/<%= meta.slug %>/block/id/" class="btn-view-block btn btn-sm btn-primary">block</a>
						</div>
					</div>
					<div class="story-edit-buttons">
						<a href="/view/<%= meta.slug %>/" class="btn-view-story btn btn-sm btn-primary">preview story</a>
					</div>

				<% } %>
			</div>
		</div>
	</div><!-- .row -->
	<div class="row">
		<div class="col-xs-10">
			<ul class="story-panel__blocks">
				<% _.each(items, function(item,a){ %>
				<% if (!item.id) item.id = item.cid; %>
					<% 
						var sneek = String(item.what).substr(0,62); 
						if (String(item.what).length > 62) sneek+='&hellip;';
					%>
					<li class="block block_<%= item.id %>">
						<a href="#<%= item.id %>" class="block__link" draggable="true"><%= a+1 %></a>
						<div class="sneek"><%= sneek %></div>
					</li>
				<% }); %>
				<!-- <a href="#" class="plus btn btn-default"><span class="icon icon-plus"></span></a>			 -->
			</ul>
		</div>
		<div class="col-xs-2">
			<p class="story-panel__btns"><a href="#" class="btn-new-block btn btn-sm btn-primary"><span class="icon icon-plus"></span> block</a></p>
		</div>
	</div>
</div>