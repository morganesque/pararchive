<div class="show-notes">
	<% if (authors.note) { %>
		<div class="show-notes__note media author">
			<a href="#" class="pull-left"><img src="http://www.gravatar.com/avatar/<%= authors.gravatar %>?d=identicon" class="media-object"/></a>
			<div class="media-body">
				<p><%= authors.note %></p>				
				<p><a href="#" class="user"><%= authors.firstname %> <%= authors.surname %></a> (author) &mdash; <a href="#" class="date"><%= authors.created %></a></p>
			</div>	
		</div>	
	<% } %>
	<% if (items.length == 0){ %> <p>There are no notes for this block yet.</p> <% } %>
	<% _.each(items, function(item){ %>
		
		<% var classname = (item.user.username == authors.username) ? 'author' : '' ; %>
		<% var authorlabel = (item.user.username == authors.username) ? '(author) ' : '' ; %>

		<div class="show-notes__note media <%= classname %>">
			<a href="#" class="pull-left"><img src="http://www.gravatar.com/avatar/<%= item.user.gravatar %>?d=identicon" class="media-object"/></a>
			<div class="media-body">
				<p><%= item.note %></p>				
				<p><a href="#" class="user"><%= item.user.firstname %> <%= item.user.surname %></a> <%= authorlabel %>&mdash; <a href="#" class="date"><%= item.created %></a></p>
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