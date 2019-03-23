from __future__ import absolute_import

import os.path
from time import sleep

from django.contrib.staticfiles.finders import find
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.test.utils import override_settings

from selenium import webdriver

from .utils import get_upload_directory, remove_upload_directory, sha1

CHROMIUM = 'chromium'
FIREFOX = 'firefox'
SELENIUM_BROWSER = CHROMIUM


class TestAdminPanelWidget(StaticLiveServerTestCase):
    fixtures = ['test_admin.json']

    @classmethod
    def setUpClass(cls):
        if SELENIUM_BROWSER == CHROMIUM:
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')
            options.add_argument('--disable-gpu')
            cls.selenium = webdriver.Chrome(chrome_options=options)
        elif SELENIUM_BROWSER == FIREFOX:
            cls.selenium = webdriver.Firefox()
        super(TestAdminPanelWidget, cls).setUpClass()

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super(TestAdminPanelWidget, cls).tearDownClass()

    def setUp(self):
        remove_upload_directory()

    def test_admin_panel_widget(self):
        self._login_to_admin()
        self._go_to_demo_application_in_admin()
        self._assert_editor_loaded()
        self._focus_cursor_in_editor()
        self._enter_test_text()
        self._open_image_upload_widget()
        self._go_to_upload_tab()
        self._switch_to_form_iframe()
        self._upload_image()
        self._assert_image_uploaded()

    def _login_to_admin(self):
        self.selenium.get('%s%s' % (self.live_server_url, '/admin/'))
        username_input = self.selenium.find_element_by_name("username")
        username_input.send_keys('test')
        password_input = self.selenium.find_element_by_name("password")
        password_input.send_keys('test')
        self.selenium.find_element_by_xpath('//input[@value="Log in"]').click()

    def _go_to_demo_application_in_admin(self):
        self.selenium.get('%s%s' % (self.live_server_url, '/admin/demo_application/examplemodel/add/'))

    def _assert_editor_loaded(self):
        sleep(2)
        self.selenium.find_element_by_id("cke_id_content")

    def _focus_cursor_in_editor(self):
        self.frame = self.selenium.find_element_by_class_name('cke_wysiwyg_frame')
        self.frame.click()

    def _enter_test_text(self):
        self.frame.send_keys('test')

    def _open_image_upload_widget(self):
        self.selenium.find_element_by_css_selector("span.cke_button_icon.cke_button__image_icon").click()
        sleep(1)

    def _go_to_upload_tab(self):
        self.selenium.find_element_by_css_selector("a[title='Upload']").click()
        sleep(1)

    def _switch_to_form_iframe(self):
        iframe = self.selenium.find_element_by_css_selector('iframe.cke_dialog_ui_input_file')
        self.selenium.switch_to.frame(iframe)

    def _upload_image(self):
        input = self.selenium.find_element_by_css_selector("input[type=file]")
        input.send_keys(self._get_upload_file())
        self.selenium.switch_to.default_content()
        self.selenium.find_element_by_class_name("cke_dialog_ui_fileButton").click()
        sleep(2)

    def _get_upload_file(self):
        return find('ckeditor/ckeditor/skins/moono/images/hidpi/close.png')

    def _assert_image_uploaded(self):
        upload_directory = get_upload_directory()
        expected_image_path = os.path.join(upload_directory, 'close.png')
        expected_thumbnail_path = os.path.join(upload_directory, 'close_thumb.png')
        self.assertTrue(os.path.isfile(expected_image_path))
        self.assertTrue(os.path.isfile(expected_thumbnail_path))
        self._assert_uploaded_image_did_not_changed(expected_image_path)
        self._assert_thumbnail_is_not_empty(expected_thumbnail_path)
        os.remove(expected_image_path)
        os.remove(expected_thumbnail_path)

    def _assert_uploaded_image_did_not_changed(self, path):
        expected_sha = sha1(self._get_upload_file())
        uploaded_sha = sha1(path)
        self.assertEqual(expected_sha, uploaded_sha)

    def _assert_thumbnail_is_not_empty(self, path):
        size = os.path.getsize(path)
        assert size > 0


@override_settings(CKEDITOR_IMAGE_BACKEND=None)
class TestAdminPanelWidgetForDummyImageBackend(TestAdminPanelWidget):

    def _assert_image_uploaded(self):
        upload_directory = get_upload_directory()
        expected_image_path = os.path.join(upload_directory, 'close.png')
        expected_thumbnail_path = os.path.join(upload_directory, 'close_thumb.png')
        self.assertTrue(os.path.isfile(expected_image_path), expected_image_path)
        self.assertFalse(os.path.exists(expected_thumbnail_path), expected_thumbnail_path)
        self._assert_uploaded_image_did_not_changed(expected_image_path)
        os.remove(expected_image_path)
