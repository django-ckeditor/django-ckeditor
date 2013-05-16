# Uploadcare PHP

This is a set of libraries to work with [Uploadcare][1].

## Install

**Note**: php-curl must be installed.

Just clone source code anywhere you like inside your project:

    git clone git://github.com/uploadcare/uploadcare-php.git

If you like, define some constants with Public and Secret keys within your project:

    define('UC_PUBLIC_KEY', 'demopublickey');
    define('UC_SECRET_KEY', 'demoprivatekey');

If you are using PHP 5.3+ or 5.4+ it will be much better to use library with namespaces.
Just include one file to start using Uploadcare inside your PHP project and use namespace "\Uploadcare":

    require_once '../uploadcare/lib/5.3-5.4/Uploadcare.php';
    use \Uploadcare;

If you are using PHP 5.2+, then you should include Uploadcare PHP libraries like this:

    require_once '../uploadcare/lib/5.2/Uploadcare.php';

Now, we are ready. Create an object of Uploadcare\Api class:

    $api = new Uploadcare\Api(UC_PUBLIC_KEY, UC_SECRET_KEY);

For PHP 5.2 it will be:

    $api = new Uploadcare_Api(UC_PUBLIC_KEY, UC_SECRET_KEY);

This is a main object your should work with. It has everything you need.

## Widgets and simple example

Let's start with widgets.

If you want to get Javascript's url for widget, just call:

    print $api->widget->getScriptSrc()

You can easily get all contents and &lt;script&gt; sections to include in your HTML:

    <head>
    <?php print $api->widget->getScriptTag(); ?>
    </head>

Create some form to use with widget:

    <form method="POST" action="upload.php">
      <?php echo $api->widget->getInputTag('qs-file'); ?>
      <input type="submit" value="Save!" />
     </form>

You will see an Uploadcare widget. After selecting file the "file_id" parameter will be set as value of hidden field.

The last thing left is to store file:

    $file_id = $_POST['qs-file'];
    $api = new Uploadcare\Api(UC_PUBLIC_KEY, UC_SECRET_KEY);
    $file = $api->getFile($file_id);
    $file->store();

Now you have an Uploadcare\File object to work with. You can show an image like this:

    <img src="<?php echo $file->getUrl(); ?>" />

Or just:

    <img src="<?php echo $file; ?>" />

Or you can even call a getImgTag method. This will return a prepared <img> tag:

    echo $file->getImgTag('image.jpg', array('alt' => 'Image'));

## API and requests

You can do any simple request if you like by calling:

    $api->request($method, $path, $data = array(), $headers = array());

Don't forget, that each API url has it's own allowed methods.

If method is not allowed exceptions will be thrown.

Ok, lets do some requests. This is request to index (http://api.uploadcare.com).

This will return an stdClass with information about urls you can request.

This is not really valuable data.

    $data = $api->request('GET', '/');

Lets request account info.

This will return just some essential data inside stdClass such as: username, pub_key and email

    $account_data = $api->request('GET', '/account/');

Now lets get file list.

This request will return stdClass with all files uploaded and some information about files.

Each files has:

- size
- upload_date
- last_keep_claim
- on_s3
- made_public
- url
- is_image
- file_id
- original_filename
- removed
- mime_type
- original_file_url


    $files_raw = $api->request('GET', '/files/');


Previous request is just some raw request and it will return raw data from json.

There's a better way to handle all the files by using method below.

It will return an array of \Uploadcare\File objects to work with.

This objects provide ways to display the file and to use methods such as resize, crop, etc

    $files = $api->getFileList();

getFileList called without any params will return just an array of first 20 files objects (first page).

But you can supply a page you want to see:

    $page = 2;
    $files = $api->getFileList($page);

You can get some information about pagination.

You will get an array with params:

- page: current page
- next: uri to request next page
- per_page: number of files per page
- pages: number of pages
- previous: uri to request previous page

Use "per_page" and "pages" information to create pagination inside your own project

    $pagination_info = $api->getFilePaginationInfo();

If you have a file_id (for example, it's saved in your database) you can create object for file easily.

Just use request below:

    $file_id = '5255b9dd-f790-425e-9fa9-8b49d4e64643';
    $file = $api->getFile($file_id);

You can access raw data like this:

    $file->data['size'];

Trying to access "data" parameter will fire GET request to get all that data once.
It will be a cached array if you will try to access "data" parameter again.

## File operations

Using object of \Uploadcare\File class we can get url for the file

    echo $file->getUrl();

Now let's do some crop.

    $width = 400;
    $height = 400;
    $is_center = true;
    $fill_color = 'ff0000';
    echo $file->crop($width, $height, $is_center, $fill_color)->getUrl();

And here's some resize with width and height

    echo $file->resize($width, $height)->getUrl();

Width only

    echo $file->resize($width)->getUrl();

Height only

    echo $file->resize(false, $height)->getUrl();

We can also use scale crop

    echo $file->scaleCrop($width, $height, $is_center)->getUrl();

And we can apply some effects.

    echo $file->effect('flip')->getUrl();
    echo $file->effect('grayscale')->getUrl();
    echo $file->effect('invert')->getUrl();
    echo $file->effect('mirror')->getUrl();

We can apply more than one effect!

    echo $file->effect('flip')->effect('invert')->getUrl();

We can combine operations, not just effects.

Just chain methods and finish but calling "getUrl()".

    echo $file->resize(false, $height)->crop(100, 100)->effect('flip')->effect('invert')->getUrl();

getUrl() returns a string with the resulting URL.

However, it's optional – the object itself becomes a string when treated as such.

An example below will print an url too:

    echo $file->resize(false, $height)->crop(100, 100)->effect('flip')->effect('invert');

The way you provide operations matters.

We can see the same operations below, but result will be a little bit different because of order:

    echo $file->crop(100, 100)->resize(false, $height)->effect('flip')->effect('invert')->getUrl();

You can run any custom operations like this:

    echo $file->op('effect/flip');
    echo $file->op('resize/400x400')->op('effect/flip');

You can call getUrl with postfix parameter. This is will add some readable postfix.

    echo $file->getUrl('image.jpg');

The result will be like this one:

    http://ucarecdn.com/85b5644f-e692-4855-9db0-8c5a83096e25/-/crop/970x500/center/he.jpg

[More information on file operations can be found here][2]

## Uploading files
Let's have some fun with uploading files.

First of all, we can upload file from url. Just use construction below.

This will return Uploadcare\File instance.

    $file = $api->uploader->fromUrl('http://www.baysflowers.co.nz/Images/tangerine-delight.jpg');
    $file->store();

By using default params of "fromUrl" method you tell Uploader to check file to be uploaded.

By default, Uploader will make 5 checks max with 1 second wait. You can change these params:

    $file = $api->uploader->fromUrl('http://www.baysflowers.co.nz/Images/tangerine-delight.jpg', true, $timeout, $max_attempts);

If file is not uploaded an Exception will be thrown.

You can just get token and check status manually later any time:

    $token = $api->uploader->fromUrl('http://www.baysflowers.co.nz/Images/tangerine-delight.jpg', false);
    $data = $api->uploader->status($token);
    if ($data->status == 'success') {
      $file_id = $data->file_id
      // do smth with a file
    }

You can do any operations with this file now.

    echo $file->effect('flip')->getUrl();

You can upload file from path.

    $file = $api->uploader->fromPath(dirname(__FILE__).'/test.jpg');
    $file->store();
    echo $file->effect('flip')->getUrl();

Or even just use a file pointer.

    $fp = fopen(dirname(__FILE__).'/test.jpg', 'r');
    $file = $api->uploader->fromResource($fp);
    $file->store();
    echo $file->effect('flip')->getUrl();

The last thing you can do is upload a file just from it's contents. But you will have to provide mime-type.

    $content = "This is some text I want to upload";
    $file = $api->uploader->fromContent($content, 'text/plain');
    $file->store();
    echo $file->getUrl();

If you want to delete file, just call delete() method on Uploadcare\File object.

    $file->delete();

## Tests

Inside "tests" directory you can find test for PHP 5.2 and PHP 5.3.

This tests are based on PHPUnit, so you must have PHPUnit installed on your system to use them.

To execute tests just run this for PHP 5.3:

    cd tests/5.3/
    phpunit ApiTest.php

or for PHP 5.2:

    cd tests/5.2/
    phpunit ApiTest.php

ApiTest is divided is sections/methods.

Here's descriptions of methods:

### testConstantValid

Just some basic unit test to test, that constants are not misspelled.

### testChildObjectsValid

Test that Api object has proper child objects.

### testPublicKeyValid

Test for public key is correct.

### testFileList

Test that getFilesList mehtod returns array and each item of array is an object of Uploadcare\File class

### testRequestsRaw

Test different request types to url https://api.uploadcare.com/.

Some requests must throw an exception, some must not.

Checks for some result returned.

### testRequestsAccount

The same as "testRequestsRaw" but with https://api.uploadcare.com/account/ url.

### testRequestsFiles

Makes raw request to get an array of files.

Check's if each file has essentials parameters.

### testFile

Tests Uploadcare\File object to work correctly.

Test runs different operations and checks url is returned correctly for each of them.

### testUploadAndDelete

Tests all four types of uploading.

None of them should throw exception while uplaoding and storing.

Checks text file is uploaded correctly.

Checks for file deletions. No exceptions must be thrown.

[1]: https://uploadcare.com/
[2]: https://uploadcare.com/documentation/reference/basic/cdn.html
