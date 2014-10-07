from setuptools import setup, find_packages

setup(
    name='django-ckeditor',
    version='0.0.9',
    description='Django admin CKEditor integration.',
    long_description = open('README.rst', 'r').read() + open('AUTHORS.rst', 'r').read() + open('CHANGELOG.rst', 'r').read(),
    author='Shaun Sephton',
    author_email='shaunsephton@gmail.com',
    url='http://github.com/shaunsephton/django-ckeditor',
    packages = find_packages(),
    dependency_links = [
        'http://dist.plone.org/thirdparty/',
    ],
    install_requires = [
        'Pillow',
    ],
    include_package_data=True,
    test_suite="setuptest.SetupTestSuite",
    tests_require=[
        'django-setuptest>=0.0.6',
    ],
    classifiers=[
        "Programming Language :: Python",
        "License :: OSI Approved :: BSD License",
        "Development Status :: 4 - Beta",
        "Operating System :: OS Independent",
        "Framework :: Django",
        "Intended Audience :: Developers",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
    zip_safe=False,
)
