<?php
require_once 'config.php';
require_once '../uploadcare/lib/5.3-5.4/Uploadcare.php';
use \Uploadcare;
$file_id = $_POST['qs-file'];
$uc_handler = new Uploadcare\Api(UC_PUBLIC_KEY, UC_SECRET_KEY);
$file = $uc_handler->getFile($file_id);
try {
  $file->store();
} catch (Exception $e) {
  echo $e->getMessage()."<br />";
  echo nl2br($e->getTraceAsString());
  die();
}
?>
<!DOCTYPE html>
<html>
<head>
<meta encoding='utf-8'>
<title>Uploadcare</title>
<link
	href="// ucarecdn.com/assets/application-68fbe95c430b7646b16aef33e1ad2824.css"
	media="screen" rel="stylesheet" type="text/css" />
<link
	href="https://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic|PT+Sans+Caption&amp;subset=latin,cyrillic"
	media="screen" rel="stylesheet" type="text/css" />
<script
	src="// ucarecdn.com/assets/application-241564109602bb3ae298c344abff83a7.js"
	type="text/javascript"></script>
</head>
<body class='welcome quick_start  docs'>
	<div class='wrap'>
		<header class='header'>
			<div class='logo hide-till-loaded'>
				<a href="/" class="pic"><img alt="Logo"
					src="// ucarecdn.com/assets/logo-07ad940955c42489ffac0a2c2f0c5d62.png" />
				</a> <a href="/">Uploadcare</a>
			</div>
			<div class='logo logo-animated show-till-loaded'>
				<a href="/" class="pic"><img alt="Loading"
					src="// ucarecdn.com/assets/loading-04f291b2aa39cf277186c36d18d9217f.png" />
				</a> <a href="/">Uploadcare</a>
			</div>
		</header>

		<div class='page-content-placeholder'></div>
		<div class='page-content'>
			<section class='content text-content' style="width: 100%;">
				<article class='content-block'>
					<ul class="instructions" style="list-style-type: none;">
						<li id="step1">
							<div class="item-header" role="foldable-folder">
								<h2 class="upload">Here is a cropped image size 400x400. Click
									cropped image to see original one.</h2>
								<p>
									Would you like to <a href="../sample-project">upload more</a>?
								</p>
							</div>
							<div class="hinted">
								<a href="<?php echo $file->getUrl(); ?>" target="_blank"><img
									src="<?php print $file->resize(400, 400)->getUrl(); ?>" /> </a>
							</div>
						</li>
					</ul>

				</article>
			</section>
		</div>
	</div>
</body>
</html>
