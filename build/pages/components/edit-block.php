<div class="container-fluid">

	<!-- <div class="page-header help"></div> -->

	<div class="row">
		
		<div class="col-xs-4">
			<div class="form-group">
				<label for="what-text">What happened?</label>
				<textarea class="edit-block__what form-control" id="what-text" class="input"></textarea>
				<p class="example">(e.g. My Mum was born)</p>				
			</div>						
		</div>

		<div class="col-xs-4">			
			<div class="form-group">				
				<label>2. Add artefacts?</label>
				<div class="grey-block">
					<div class="show-artefacts"></div>
					<p class="example artfacts-example">If you want you can add pictures, sounds, video or documents to this part of the story.</p>
					<div class="artefact-button">
						<button id="artefacts" class="btn btn-default btn-primary">Add artefacts</button>
					</div>
				</div>
			</div>							
		</div>

		<div class="col-xs-4">
			<div class="form-group block-details">
				<label>3. Add details</label>
				<div class="grey-block">
					<p class="tags-desc example">Help others find your story by adding people, places and dates.</p>
					
					<div class="show-tags"></div>

					<div class="details-form input-group">
						<span class="input-group-addon" title="click to change"><span class="icon icon-user"></span></span>
						<input class="detail-input form-control" />	
						<span class="input-group-btn"><button class="btn btn-default details-add" type="button">add</button></span>
				    </div>

				    <div class="details-buttons">
				    	<a href="#person" class="btn btn-xs btn-primary">Add people</a>
				    	<a href="#place" class="btn btn-xs btn-primary">Add places</a>
				    	<a href="#date" class="btn btn-xs btn-primary">Add dates</a>
				    </div>
			    </div><!-- .grey-block -->
			</div>
			<div class="form-group">
				<label for="when-text">4. Add a note</label>
				<textarea class="edit-block__note form-control" id="author_note" class="input"></textarea>
				<p class="example">(e.g. Your comments on the block, or a question you'd like to ask people to answer about it.)</p>
			</div>			
		</div>

		<div class="add-artefact">
			<div class="add-artefact__input">			
				<h2>Adding an artefact <small>(your file must already be online)</small></h2>
				<div class="form-group">
					<p>Paste a web address below:</p>
					<p><input type="text" class="input file__name" /></p>
					<button id="save-artefact" class="btn btn-default btn-success">Submit</button>
					<button id="cancel-artefact" class="btn btn-default">Cancel</button>
				</div>			
			</div>		
		</div>

	</div><!-- .row -->

	<div class="row row--submit">
		<div class="col-xs-4">
			<div class="form-group">	
				<a href="/next/" class="btn btn-lg btn-success btn-block next__button" type="submit" id="login_submit">Save This Block &amp; Continue</a>		
			</div>
		</div>
		<div class="col-xs-8">
			<div class="form-group text-right">				
				<button id="delete-block" class="btn btn-xs btn-danger">delete block</button>
			</div>
		</div>
	</div>

</div>