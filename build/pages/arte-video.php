
<div class="container-fluid">
	
	<div class="page-header"><h1><span class="icon icon-camera2"></span> A video?</h1></div>
	
	<p>You can upload if from your computer or add a link if it's already online:</p>

	<form class="upload__form">
		<input type="file" class="input-file" />
		<p><button class="upload__trigger btn btn-sm btn-default">Choose a file to upload</button> <small>or paste a link below:</small></p>
		<p><input type="text" class="input file__name" /></p>
	</form>

	<div class="row">
		<div class="col-xs-6">
			<a href="/arte/" class="btn btn-lg btn-info btn-block" type="submit">Back</a>
		</div>
		<div class="col-xs-6">
			<button class="btn btn-lg btn-primary btn-block use__this" type="submit">Use This</button>
		</div>
	</div>

</div>

<script>
	$(function()
	{
		$('.input-file').hide();
		$('.use__this').hide();

		$('.upload__trigger').on('click',function(e)
		{
			e.preventDefault();
			$('.input-file').trigger('click');
		})

		$('.input-file').on("change",function()
		{
			var chosen = $(this).val().replace(/^.*[\\\/]/, '');		
			$('.file__name').val(chosen).trigger('change');			
		});

		$('.file__name').on('change paste keyup',function()
		{
			if ($(this).val()) $('.use__this').fadeIn(1500);
			else {
				$('.use__this').hide();
				$('.upload__form').get(0).reset();
				console.log($('.input-file').val());		
			}
		});
	})
</script>