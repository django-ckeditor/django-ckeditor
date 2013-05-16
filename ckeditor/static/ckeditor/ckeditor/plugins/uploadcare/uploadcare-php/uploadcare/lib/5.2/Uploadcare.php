<?php
/**
 * @file
 *
 * Uploadcare Constants
 */

define('API_TYPE_RAW', 'raw');
define('API_TYPE_ACCOUNT', 'account');
define('API_TYPE_FILES', 'files');
define('API_TYPE_FILE', 'file');
define('API_TYPE_STORE', 'store');

define('REQUEST_TYPE_POST', 'post');
define('REQUEST_TYPE_PUT', 'put');
define('REQUEST_TYPE_DELETE', 'delete');
define('REQUEST_TYPE_GET', 'get');
define('REQUEST_TYPE_HEAD', 'head');
define('REQUEST_TYPE_OPTIONS', 'options');

define('UC_PARAM_FILE_ID', 'file_id');

require_once dirname(__FILE__).'/Api.php';
require_once dirname(__FILE__).'/File.php';
require_once dirname(__FILE__).'/Widget.php';
require_once dirname(__FILE__).'/Uploader.php';
