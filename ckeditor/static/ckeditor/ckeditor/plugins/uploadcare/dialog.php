<?php
error_reporting(E_ERROR);
include dirname(__FILE__).'/config.php';
include dirname(__FILE__).'/uploadcare-php/uploadcare/lib/5.2/Uploadcare.php';

$public_key = UC_PUBLIC_KEY;
$secret_key = UC_SECRET_KEY;
$api = new Uploadcare_Api($public_key, $secret_key);

$editor_name = $_REQUEST['editor_name'];

//POST
$file = null;
$scale_crop_default_width = 800;
$scale_crop_default_height = 634;
if ($_POST['save']) {
	$file_id = $_POST['file_id'];
	$file = $api->getFile($file_id);
	$file->scaleCrop($scale_crop_default_width, $scale_crop_default_height);
	$file->op('stretch/off');
	$file->store();
}
if ($_GET['file_id']) {
	$file_id = $_GET['file_id'];
	$file = $api->getFile($file_id);
	$file->scaleCrop($scale_crop_default_width, $scale_crop_default_height);
	$file->op('stretch/off');
	$file->store();
}
$is_insert = false;
$is_preview = false;
if ($_POST['insert'] or $_POST['_preview']) {
	$file_id = $_POST['file_id'];
	$file = $api->getFile($file_id);
	$original = clone $file;

	if (isset($_POST['crop'])) {
		$crop_width = $_POST['crop_width'];
		$crop_height = $_POST['crop_height'];
		$crop_center = isset($_POST['crop_center']) ? true : false;
		$crop_fill_color = $_POST['crop_fill_color'];
		$file = $file->crop($crop_width, $crop_height, $crop_center, $crop_fill_color);
	}

	if (isset($_POST['resize'])) {
		$resize_width = $_POST['resize_width'];
		$resize_height = $_POST['resize_height'];
		$file = $file->resize($resize_width, $resize_height);
	}

	if (isset($_POST['scale_crop'])) {
		$scale_crop_width = $_POST['scale_crop_width'];
		$scale_crop_height = $_POST['scale_crop_height'];
		$scale_crop_center = isset($_POST['scale_crop_center']) ? true : false;
		$file = $file->scaleCrop($scale_crop_width, $scale_crop_height, $scale_crop_center);
	} else {
		$scale_crop_width = $scale_crop_default_width;
		$scale_crop_height = $scale_crop_default_height;
		$scale_crop_center = false;
	}

	if (isset($_POST['effect_flip'])) {
		$file = $file->effect('flip');
	}

	if (isset($_POST['effect_grayscale'])) {
		$file = $file->effect('grayscale');
	}

	if (isset($_POST['effect_invert'])) {
		$file = $file->effect('invert');
	}

	if (isset($_POST['effect_mirror'])) {
		$file = $file->effect('mirror');
	}

	if (isset($_POST['stretch_off'])) {
		$file->op('stretch/off');
	}

	$is_insert = true;

	if ($_POST['_preview']) {
		$is_insert = false;
		$is_preview = true;
	}
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Uploadcare</title>
</head>
<body>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script type="text/javascript">
        google.load("jquery", "1.7");
</script>
<?php if ($is_preview): ?>
<?php echo $file->getImgTag($file->data['original_filename']); ?>
<?php die();?>
<?php endif;?>
<?php if ($is_insert): ?>
<script type="text/javascript">
/* <![CDATA[ */
window.parent.CKEDITOR.instances['<?php echo $editor_name; ?>'].insertHtml('<?php echo $file->getImgTag(); ?>');
window.parent.CKEDITOR.dialog.getCurrent().hide()
/* ]]> */
</script>
<?php die();?>
<?php endif;?>

<?php if ($file): ?>
<div id="media-items">
<div class="media-item">
<form enctype="multipart/form-data" method="post" action="" id="uploadcare_form">
	<input type="hidden" name="file_id" id="file_id" value="<?php echo $file_id; ?>" />
	<input type="hidden" name="editor_name" id="editor_name" value="<?php echo $editor_name; ?>" />


	<table class="slidetoggle describe startclosed" style="display: table;">
		<thead class="media-item-info">
		<tr>
			<td colspan="2">
				<p><strong>File name:</strong> <?php echo $file->data['original_filename']; ?></p>
				<p><strong>File type:</strong> <?php echo $file->data['mime_type']; ?></p>
				<p><strong>Upload date:</strong> <?php echo $file->data['upload_date']; ?></p>
			</td>
		</tr>
		</thead>
		<tbody>

			<tr align="left">
				<td colspan="2"><input type="checkbox" name="crop" id="crop" />&nbsp;<strong><label for="crop">Crop</label></strong></td>
			</tr>
			<tr align="left"><th class="label"><label for="crop_width">Width:</label></th><td><input type="text" name="crop_width" id="crop_width" /></td></tr>
			<tr align="left"><th class="label"><label for="crop_height">Height:</label></th><td><input type="text" name="crop_height" id="crop_height" /></td></tr>
			<tr align="left"><th class="label"><label for="crop_center">Center:</label></th><td><input type="checkbox" name="crop_center" id="crop_center" /></td></tr>
			<tr align="left"><th class="label"><label for="crop_fill_color">Fill color:</label></th><td><input type="text" name="crop_fill_color" id="crop_fill_color" /></td></tr>

			<tr align="left">
				<td colspan="2"><input type="checkbox" name="resize" id="resize" />&nbsp;<strong><label for="resize">Resize</label></strong></td>
			</tr>
			<tr align="left"><th class="label"><label for="resize_width">Width:</label></th><td><input type="text" name="resize_width" id="resize_width" /></td></tr>
			<tr align="left"><th class="label"><label for="resize_height">Height:</label></th><td><input type="text" name="resize_height" id="resize_height" /></td></tr>

			<tr align="left">
				<td colspan="2"><input type="checkbox" name="scale_crop" checked="checked" id="scale_crop" />&nbsp;<strong><label for="scale_crop">Scale crop</label></strong></td>
			</tr>
			<tr align="left"><th class="label"><label for="scale_crop_width">Width:</label></th><td><input type="text" name="scale_crop_width" id="scale_crop_width" value="<?php echo $scale_crop_default_width;?>" /></td></tr>
			<tr align="left"><th class="label"><label for="scale_crop_height">Height:</label></th><td><input type="text" name="scale_crop_height" id="scale_crop_height" value="<?php echo $scale_crop_default_height; ?>" /></td></tr>
			<tr align="left"><th class="label"><label for="scale_crop_center">Center:</label></th><td><input type="checkbox" name="scale_crop_center" id="scale_crop_center" checked="checked"/></td></tr>

			<tr align="left">
				<td colspan="2"><strong>Effects</strong></td>
			</tr>
			<tr align="left"><th class="label" colspan="2"><input type="checkbox" name="effect_flip" id="effect_flip" />&nbsp;<label for="effect_flip">Flip</label></th></tr>
			<tr align="left"><th class="label" colspan="2"><input type="checkbox" name="effect_grayscale" id="effect_grayscale" />&nbsp;<label for="effect_grayscale">Grayscale</label></th></tr>
			<tr align="left"><th class="label" colspan="2"><input type="checkbox" name="effect_invert" id="effect_invert" />&nbsp;<label for="effect_invert">Invert</label></th></tr>
			<tr align="left"><th class="label" colspan="2"><input type="checkbox" name="effect_mirror" id="effect_mirror" />&nbsp;<label for="effect_mirror">Mirror</label></th></tr>
			<tr align="left"><th class="label" colspan="2"><input type="checkbox" name="stretch_off" id="stretch_off" checked="checked" />&nbsp;<label for="stretch">Stretch Off?</label></th></tr>


			<tr valign="top">
				<td class="A1B1" colspan="2">
					<p><strong>Preview:</strong></p>
					<div id="uploadcare_preview" style="width: 750px; overflow-x: scroll;">
						<?php echo $file->getImgTag($file->data['original_filename']); ?>
					</div>
				</td>
			</tr>

		</tbody>
		</table>
		<input type="submit" value="Insert" name="insert" class="cke_dialog_ui_button" />
</form>
</div>
</div>
<script type="text/javascript">
jQuery(function() {
	jQuery('#uploadcare_form :input').change(function() {
		var form = jQuery('#uploadcare_form');
		var data = form.serialize();
		data += '&_preview=true';
		jQuery.post(
				form.attr('action'),
				data,
				function (html) {
					jQuery('#uploadcare_preview').html(html);
				}
		);
		return false;
	});
});
</script>
<?php else: ?>
<?php echo $api->widget->getScriptTag(); ?>
<form enctype="multipart/form-data" method="post" action="" id="uploadcare_form">
	<input type="hidden" name="editor_name" id="editor_name" value="<?php echo $editor_name; ?>" />
	<h3 class="media-title">Use Uploadcare widget to upload file.</h3>
	<?php echo $api->widget->getInputTag('file_id'); ?>
	<p class="savebutton ml-submit">
	<input type="submit" value="Store File" name="save" class="cke_dialog_ui_button" />
	</p>
</form>

<script type="text/javascript">
jQuery(function() {
	jQuery('#uploadcare_form').submit(function() {
		var form = jQuery(this);
		var file_id = form.find('input[name=file_id]').val();
		if (!file_id) {
			return false;
		}
	});
});
</script>
<?php endif; ?>
</body>
</html>
