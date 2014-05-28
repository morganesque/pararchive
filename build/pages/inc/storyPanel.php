
<div class="container-fluid" id="storyPanel">
	
	<h3 class="story__name"><span class="content">Storyname</span>&nbsp;<a class="btn btn-xs" id="edit" href="#edit">edit</a></h3>

	<div class="row">
		
		<div class="story__blocks col-xs-10">

			<a href="#" class="block">1</a>

		</div>

		<div class="story__actions text-right col-xs-2">

			<a href="#" class="btn btn-primary btn-lg">Finish Story</a>

		</div>

	</div>
</div>

<script>
	
	$(document).on('ready',function()
	{
		$('#edit').on('click',function(e)
		{
			e.preventDefault();
			console.log('flipper');		
			$('.story__name .content').attr({"contenteditable":"true"});
			$('.story__name .content').textrange('fish');		
		});
	});
</script>