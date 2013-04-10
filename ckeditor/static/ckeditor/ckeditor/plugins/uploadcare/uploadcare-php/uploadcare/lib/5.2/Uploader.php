<?php
/**
 * @file
 *
 * Uploadcare_Uploader
 */

class Uploadcare_Uploader {
  /**
   * Base upload host
   *
   * @var string
   */
  private $host = 'upload.uploadcare.com';

  /**
   * Api instance
   *
   * @var Uploadcare_Api
   */
  private $api = null;

  /**
   * Constructor
   */
  public function __construct(Uploadcare_Api $api) {
    $this->api = $api;
  }

  /**
   * Check file status.
   * Return array of json data
   *
   * @param string $file_id
   * @return array
   */
  public function status($token) {
    $data = array(
      'token' => $token,
    );
    $ch = $this->__initRequest('status', $data);
    $this->__setHeaders($ch);
    $data = $this->__runRequest($ch);
    return $data;
  }

  /**
   * Upload file from url and get Uploadcare_File instance
   *
   * @param string $url An url of file to be uploaded.
   * @return Uploadcare_File
   */
  public function fromUrl($url, $check_status = true, $timeout = 1, $max_attempts = 5) {
    $data = array(
      '_' => time(),
      'source_url' => $url,
      'pub_key' => $this->api->getPublicKey(),
    );
    $ch = $this->__initRequest('from_url', $data);
    $this->__setHeaders($ch);

    $data = $this->__runRequest($ch);
    $token = $data->token;

    if ($check_status) {
      $success = false;
      $attempts = 0;
      while (!$success) {
        $data = $this->status($token);
        if ($data->status == 'success') {
          $success = true;
        }
        if ($attempts == $max_attempts) {
          throw new Exception('Cannot store file, max attempts reached, upload is not successful');
        }
        sleep($timeout);
        $attempts++;
      }
    } else {
      return $token;
    }
    $file_id = $data->file_id;

    return new Uploadcare_File($file_id, $this->api);
  }

  /**
   * Upload file from local path.
   *
   * @param string $path
   * @return Uploadcare_File
   */
  public function fromPath($path) {
    $data = array(
      'UPLOADCARE_PUB_KEY' => $this->api->getPublicKey(),
      'file' => '@'.$path,
    );
    $ch = $this->__initRequest('base');
    $this->__setRequestType($ch);
    $this->__setData($ch, $data);
    $this->__setHeaders($ch);

    $data = $this->__runRequest($ch);
    $file_id = $data->file;
    return new Uploadcare_File($file_id, $this->api);
  }

  /**
   * Upload file from file pointer
   *
   * @param resourse $fp
   * @return Uploadcare_File
   */
  public function fromResource($fp) {
    $tmpfile = tempnam(sys_get_temp_dir(), 'ucr');
    $temp = fopen($tmpfile, 'w');
    while (!feof($fp)) {
      fwrite($temp, fread($fp, 8192));
    }
    fclose($temp);
    fclose($fp);

    $data = array(
      'UPLOADCARE_PUB_KEY' => $this->api->getPublicKey(),
      'file' => '@'.$tmpfile,
    );
    $ch = $this->__initRequest('base');
    $this->__setRequestType($ch);
    $this->__setData($ch, $data);
    $this->__setHeaders($ch);

    $data = $this->__runRequest($ch);
    $file_id = $data->file;
    return new Uploadcare_File($file_id, $this->api);
  }

  /**
   * Upload file from string using mime-type.
   *
   * @param string $content
   * @param string $mime_type
   * @return Uploadcare_File
   */
  public function fromContent($content, $mime_type) {
    $tmpfile = tempnam(sys_get_temp_dir(), 'ucr');
    $temp = fopen($tmpfile, 'w');
    fwrite($temp, $content);
    fclose($temp);

    $data = array(
      'UPLOADCARE_PUB_KEY' => $this->api->getPublicKey(),
      'file' => sprintf('@%s;type=%s', $tmpfile, $mime_type),
    );
    $ch = $this->__initRequest('base');
    $this->__setRequestType($ch);
    $this->__setData($ch, $data);
    $this->__setHeaders($ch);

    $data = $this->__runRequest($ch);
    $file_id = $data->file;
    return new Uploadcare_File($file_id, $this->api);
  }

  /**
   * Init upload request and return curl resource
   *
   * @param array $data
   * @return resource
   */
  private function __initRequest($type, $data = null) {
    $url = sprintf('https://%s/%s/', $this->host, $type);
    if (is_array($data)) {
      $url = sprintf('%s?%s', $url, http_build_query($data));
    }
    $ch = curl_init($url);
    return $ch;
  }

  /**
   * Set request type for curl resrouce
   *
   * @param resource $ch
   * @return void
   */
  private function __setRequestType($ch) {
    curl_setopt($ch, CURLOPT_POST, true);
  }

  /**
   * Set all the headers for request and set returntrasfer.
   *
   * @param resource $ch. Curl resource.
   * @return void
   */
  private function __setHeaders($ch) {
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'User-Agent: PHP Uploadcare Module '.$this->api->version,
    ));
  }

  /**
   * Set data to be posted on request
   *
   * @param resource $ch. Curl resource
   * @param array $data
   * @return void
   */
  private function __setData($ch, $data = array()) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
  }

  /**
   * Run prepared curl request.
   * Throws Exception of not 200 http code
   *
   * @param resource $ch. Curl resource
   * @throws Exception
   * @return array
   */
  private function __runRequest($ch) {
    $data = curl_exec($ch);
    $ch_info = curl_getinfo($ch);
    if ($ch_info['http_code'] != 200) {
      throw new Exception('Request returned unexpected http code '.$ch_info['http_code'].'. '.$data);
    }
    curl_close($ch);
    return json_decode($data);
  }
}
