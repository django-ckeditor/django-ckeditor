<?php
/**
 * @file
 *
 * Uploadcare_Widget
 */

class Uploadcare_Widget {
  /**
   * Uploadcare_Api instance
   *
   * @var Uploadcare_Api
   */
  private $api = null;

  /**
   * Uploadcare widget version
   * @var string
   */
  private $version = '0.6.3';

  /**
   * Constructor
   *
   * @param Uploadcare_Api $api
   */
  public function __construct(Uploadcare_Api $api) {
    $this->api = $api;
  }

  /**
   * Returns <script> sections to include Uploadcare widget
   *
   * @param string $version Uploadcare version
   * @return string
   */
  public function getScriptTag($version = null) {
    $result = sprintf('<script>UPLOADCARE_PUBLIC_KEY = "%s";</script>', $this->api->getPublicKey());
    $result .= sprintf('<script async="async" src="%s"></script>', $this->getScriptSrc($version));
    return $result;
  }

  /**
   * Return url for javascript widget.
   * If no version is provided method will use default(current) version
   *
   * @param string $version Version of Uploadcare.com widget
   * @return string
   */
  public function getScriptSrc($version = null) {
    if (!$version) {
      $version = $this->version;
    }
    return sprintf('https://ucarecdn.com/widget/%s/uploadcare/uploadcare-%s.min.js', $version, $version);
  }

  /**
   * Gets input tag to use with widget
   *
   * @param string $name Input name
   * @param array $attribs Custom attributes to include
   * @return string
   */
  public function getInputTag($name, $attribs = array()) {
    $to_compile = array();
    foreach ($attribs as $key => $value) {
      $to_compile[] = sprintf('%s="%s"', $key, $value);
    }
    return sprintf('<input type="hidden" role="uploadcare-uploader" name="%s" data-upload-url-base="" %s />', $name, join(' ', $to_compile));
  }
}
