<div class="show-notes">
	<% _.each(items, function(item){ %>
		<div class="show-notes__note media">
			<a href="#" class="pull-left"><img src="http://www.gravatar.com/avatar/<%= item.user.gravatar %>.png" class="media-object"/></a>
			<div class="media-body">
				<p><%= item.note %></p>				
				<p><a href="#" class="user"><%= item.user.username %></a> &mdash; <a href="#" class="date"><%= item.created %></a></p>
			</div>	
		</div>		
	<% }); %>					
</div><!-- .show-notes -->
<div class="add-notes out">
	<div class="form-group show-button"><button class="btn btn-md btn-white">Add a note</button></div>
	<h4>Add a note:</h4>
	<div class="form-group"><textarea id="new-note" class="new-note form-control"></textarea></div>
	<div class="form-group">
		<button class="btn btn-md btn-white submit-button">Submit</button>
		<button class="btn btn-md btn-white pull-right cancel-button">Cancel</button>
	</div>
</div>