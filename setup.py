from setuptools import setup, find_packages

setup(
    name='django-ckeditor',
    version='dev',
    description='Attempt at better Django admin RTE integration.',
    author='Shaun Sephton',
    author_email='shaunsephton@gmail.com',
    url='http://github.com/shaunsephton/django-ckeditor',
    packages = find_packages(),
    include_package_data=True,
)
