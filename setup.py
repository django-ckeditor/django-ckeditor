import os.path
from setuptools import setup, find_packages


def get_source_files():
    for dirname, _, files in os.walk('ckeditor/static/ckeditor/ckeditor/_source'):
        for filename in files:
            yield os.path.join('/'.join(dirname.split('/')[1:]), filename)

setup(
    name='django-ckeditor-updated',
    version='4.2.2',
    description='Django admin CKEditor integration.',
    long_description=open('README.rst', 'r').read() + open('AUTHORS.rst', 'r').read() + open('CHANGELOG.rst', 'r').read(),
    author='Piotr Malinski',
    author_email='riklaunim@gmail.com',
    url='https://github.com/riklaunim/django-ckeditor',
    packages=find_packages(exclude=['project', ]),
    install_requires=[
        'Pillow',
        'Django',
    ],
    include_package_data=True,
    exclude_package_data={
        'ckeditor': list(get_source_files()),
    },
    test_suite="setuptest.setuptest.SetupTestSuite",
    tests_require=[
        'django-setuptest>=0.1.1',
    ],
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3.3",
        "License :: OSI Approved :: BSD License",
        "Development Status :: 4 - Beta",
        "Operating System :: OS Independent",
        "Framework :: Django",
        "Intended Audience :: Developers",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
    zip_safe=False,
)
