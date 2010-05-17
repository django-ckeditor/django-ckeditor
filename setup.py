from setuptools import setup, find_packages

setup(
    name='django-ckeditor',
    version='dev',
    description='Django admin CKEditor integration.',
    author='Shaun Sephton',
    author_email='shaunsephton@gmail.com',
    url='http://github.com/shaunsephton/django-ckeditor',
    packages = find_packages(),
    dependency_links = [
        'http://dist.repoze.org/',
    ],
    install_requires = [
        'PIL>=1.1.6',
    ],
    include_package_data=True,
)
