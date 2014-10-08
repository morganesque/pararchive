<div class="container-fluid">

	<div class="row">
		<div class="col-xs-4">			
			<% if (items.length > 1) { %>			
				<div class="some-blocks">
					<p class="lead">Your story has <%= items.length %> blocks.</p>					
					<p class="text-primary">{ Click above to edit one. }</p>
				</div>
			<% } else if (items.length == 1) { %>
				<div class="some-blocks">
					<p class="lead">Your story has <%= items.length %> block.</p>					
				</div>
			<% } else if (items.length == 0) { %>
				<% if (typeof meta !== "undefined") { %>
					<% if (meta.name == 'My Story') { %>
						<div class="new-story">
							<p class="lead first-name text-right">1. Give your story a name <span class="icon icon-arrow-right"></span></p>		
							<p class="lead first-blurb text-right">2. Write a little introduction <span class="icon icon-arrow-right"></span></p>		
						</div>
					<% } %>	
				<% } %>
			<% }  %>
		</div>
		<div class="col-xs-4 details-edit">
			<div class="notify"><p>Story details saved</p></div>
			<h3>Story details</h3>
			<div class="form-group">
				<label>Story name</label>
				<% if (typeof meta !== "undefined") { %>
				<input class="form-control" id="story-name" value="<%= meta.name %>"/>
				<% } %>
			</div>
			<div class="form-group">
				<label>Story blurb</label>
				<p class="example">A brief introduction to your story (optional).</p>
				<% if (typeof meta !== "undefined") { %>
				<textarea class="form-control story-blurb" id="story-blurb"><%= meta.blurb %></textarea>
				<% } %>
			</div>
			<div class="form-group">
				<% if (items.length) { %>
					<button class="save-story-meta btn btn-lg btn-primary">Save Changes</button>
				<% } else { %>
					<button class="save-story-meta btn btn-lg btn-primary">Next</button>					
				<% } %>
				
			</div>
		</div>
		<div class="col-xs-4">
			
		</div>
	</div>

</div>

<!--
	

	<div class="no-blocks">
		<h1 class="start-message">Your story contains no blocks.</h1>
		<p class="h3">Creat a block to start telling your story.</p>
		<p class="h3"><a href="#" class="btn btn-sm btn-primary new-block">create a new block</a></p>
	</div>

	
-->