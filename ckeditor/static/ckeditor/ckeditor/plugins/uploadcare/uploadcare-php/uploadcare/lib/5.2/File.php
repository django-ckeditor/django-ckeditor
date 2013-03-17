<?php
/**
 * @file
 *
 * Uploadcare_File
 */

class Uploadcare_File
{
  /**
   * Uploadcare cdn host
   *
   * @var string
   */
  private $cdn_host = 'ucarecdn.com';

  /**
   * Uploadcare file id
   *
   * @var string
   */
  private $file_id = null;

  /**
   * Operations and params for operations: crop, resize, scale_crop, effect.
   *
   * @var array
   */
  private $operations = array();

  /**
   * Uploadcare class instance.
   *
   * @var Uploadcare_Api
  */
  private $api = null;

  /**
   * Operations list
   */
  private $operation_list = array('crop', 'resize', 'scale_crop', 'effect');

  /**
   * Cached data
   *
   * @var array
  */
  private $cached_data = null;

  /**
   * Constructs an object for CDN file with specified ID
   *
   * @param string $file_id Uploadcare file_id
   * @param Uploadcare_Uploadcare $api Uploadcare class instance
   */
  public function __construct($file_id, Uploadcare_Api $api)
  {
    $this->file_id = $file_id;
    $this->api = $api;
  }

  public function __get($name)
  {
    if ($name == 'data') {
      if (!$this->cached_data) {
        $this->cached_data = (array)$this->api->__preparedRequest(API_TYPE_FILE, REQUEST_TYPE_GET, array('file_id' => $this->file_id));
      }
      return $this->cached_data;
    }
  }

  /**
   * @return string
   */
  public function __toString()
  {
    return $this->getUrl();
  }

  /**
   * Return file_id for this file
   *
   * @return string
   */
  public function getFileId()
  {
    return $this->file_id;
  }

  /**
   * Try to store file.
   *
   * @param boolean $check_status Check upload status?
   * @return array
   */
  public function store()
  {
    return $this->api->__preparedRequest(API_TYPE_STORE, REQUEST_TYPE_POST, array('file_id' => $this->file_id));
  }

  /**
   * Delete file
   *
   * @return array
   */
  public function delete()
  {
    return $this->api->__preparedRequest(API_TYPE_FILE, REQUEST_TYPE_DELETE, array('file_id' => $this->file_id));
  }

  /**
   * Get url of original image
   *
   * @param string $postfix
   * @return string
   */
  public function getUrl($postfix = null)
  {
    $url = sprintf('https://%s/%s/', $this->cdn_host, $this->file_id);

    $operations = array();

    foreach ($this->operations as $i => $operation_item) {
      $part = array();
      foreach (array_keys($operation_item) as $operation_type) {
        $operation_params = $operation_item[$operation_type];
        $part[] = $operation_type;
        switch ($operation_type) {
          case 'crop':
            $part = $this->__addPartSize($part, $operation_params);
            $part = $this->__addPartCenter($part, $operation_params);
            $part = $this->__addPartFillColor($part, $operation_params);
            break;
          case 'resize':
            $part = $this->__addPartSize($part, $operation_params);
            break;
          case 'scale_crop':
            $part = $this->__addPartSize($part, $operation_params);
            $part = $this->__addPartCenter($part, $operation_params);
            break;
          case 'effect':
            $part = $this->__addPartEffect($part, $operation_params);
            break;
          case 'custom':
            $part = array($operation_params);
            break;
        }
        $part_str = join('/', $part);
        $operations[] = $part_str;
      }
    }

    if (count($operations)) {
      $operations_part = join('/-/', $operations);
      return $url.'-/'.$operations_part.'/'.$postfix;
    } else {
      return $url.$postfix;
    }
  }

  /**
   * Get image tag
   *
   * @param string $postfix File path postfix
   * @param array $attrs additional attributes
   * @return string
   */
  public function getImgTag($postfix = null, $attribs = array())
  {
    $to_compile = array();
    foreach ($attribs as $key => $value) {
      $to_compile[] = sprintf('%s="%s"', $key, $value);
    }
    return sprintf('<img src="%s" %s />', $this->getUrl(), join(' ', $to_compile));
  }

  /**
   * Get object with cropped parameters.
   *
   * @param integer $width Crop width
   * @param integer $height Crop height
   * @param boolean $center Center crop? true or false (default false).
   * @param string $fill_color Fill color. If nothig is provided just use false (default false).
   * @return Uploadcare_File
   */
  public function crop($width, $height, $center = false, $fill_color = false)
  {
    $result = clone $this;
    $result->operations[]['crop'] = array(
        'width' => $width,
        'height' => $height,
        'center' => $center,
        'fill_color' => $fill_color,
    );
    return $result;
  }

  /**
   * Get object with resized parameters.
   * Provide width or height or both.
   * If not width or height are provided exceptions will be thrown!
   *
   * @param integer $width Resized image width. Provide false if you resize proportionally.
   * @param integer $height Resized image height. Provide false if you resize proportionally.
   * @throws Exception
   * @return Uploadcare_File
   */
  public function resize($width = false, $height = false)
  {
    $result = clone $this;
    if (!$width && !$height) {
      throw new Exception('Please, provide at least width or height for resize');
    }
    $result->operations[]['resize'] = array(
        'width' => $width,
        'height' => $height,
    );
    return $result;
  }

  /**
   * Get object with cropped parameters.
   *
   * @param integer $width Crop width
   * @param integer $height Crop height
   * @param boolean $center Center crop? true or false (default false).
   * @return Uploadcare_File
   */
  public function scaleCrop($width, $height, $center = false)
  {
    $result = clone $this;
    $result->operations[]['scale_crop'] = array(
        'width' => $width,
        'height' => $height,
        'center' => $center,
    );
    return $result;
  }

  /**
   * Apply effect
   *
   * @param string $effect Effect name
   * @return File
   */
  public function effect($effect)
  {
    $result = clone $this;
    $result->operations[]['effect'] = $effect;
    return $result;
  }

  /**
   * Add any custom operation.
   *
   * @param string $operation
   */
  public function op($operation)
  {
    $result = clone $this;
    $result->operations[]['custom'] = $operation;
    return $result;
  }

  /**
   * Adds part with size for operations
   *
   * @param array $part
   * @param array $params
   * @return array
   */
  private function __addPartSize($part, $params)
  {
    $part[] = sprintf('%sx%s', $params['width'], $params['height']);
    return $part;
  }

  /**
   * Adds part with center for operations
   *
   * @param array $part
   * @param array $params
   * @return array
   */
  private function __addPartCenter($part, $params)
  {
    if ($params['center'] !== false) {
      $part[] = 'center';
    }
    return $part;
  }

  /**
   * Adds part with fill color for operations
   *
   * @param array $part
   * @param array $params
   * @return array
   */
  private function __addPartFillColor($part, $params)
  {
    if ($params['fill_color'] !== false) {
      $part[] = $params['fill_color'];
    }
    return $part;
  }

  /**
   * Adds part with effect for operations
   *
   * @param array $part
   * @param string $effect
   * @return array
   */
  private function __addPartEffect($part, $effect)
  {
    $part[] = $effect;
    return $part;
  }
}
