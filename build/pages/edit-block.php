<div class="edit-block container-fluid">

	<div class="page-header help"></div>

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
				<label for="when-text">When did it happen?</label>
				<input class="form-control" id="when-text" />
				<p class="example">(e.g. 3rd March 1956, Summer 1920, The 1950s)</p>
			</div>
			<div class="form-group">
				<label for="when-text">Where did it happen?</label>
				<input class="form-control" id="where-text" />
				<p class="example">(e.g. a postcode, Alf's Shop, Leeds)</p>
			</div>
			<div class="form-group">	
				<a href="/next/" class="btn btn-lg btn-success btn-block next__button" type="submit" id="login_submit">Save This Block &amp; Continue</a>		
				</div>
		</div>

		<div class="col-xs-4">			
			<div class="form-group">				
				<label>Add artefacts?</label>
				<div class="show-artefacts"></div>
				<p class="example artfacts-example">If you want you can add pictures, sounds,<br />video or documents to this part of the story.</p>
				<button id="artefacts" class="btn btn-default btn-warning">Add artefacts</button>
			</div>	
			<div class="form-group text-right">				
				<button id="delete-block" class="btn btn-xs btn-danger">delete block</button>
			</div>
		</div>

	</div>

	<div class="add-artefact">
		<div class="add-artefact__input">			
			<h2>Adding an artefact <small>(your file must already be online)</small></h2>
			<div class="form-group">
				<p>Paste a web address below:</p>
				<p><input type="text" class="input file__name" /></p>
				<button id="save-artefact" class="btn btn-default btn-success">Submit</button>
			</div>			
		</div>		
	</div>

</div>