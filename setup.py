import os.path
from setuptools import setup, find_packages


def get_source_files():
    for dirname, _, files in os.walk('ckeditor/static/ckeditor/ckeditor/_source'):
        for filename in files:
            yield os.path.join('/'.join(dirname.split('/')[1:]), filename)

setup(
<<<<<<< HEAD
    name='django-ckeditor-updated',
    version='4.2.6',
=======
    name='django-ckeditor',
    version='4.2.8',
>>>>>>> d9c2ec94efcd9a8e36f849116ea88c1dba445c0b
    description='Django admin CKEditor integration.',
    long_description=open('README.rst', 'r').read() + open('AUTHORS.rst', 'r').read() + open('CHANGELOG.rst', 'r').read(),
    author='Piotr Malinski',
    author_email='riklaunim@gmail.com',
    url='https://github.com/riklaunim/django-ckeditor',
    packages=find_packages(exclude=["*.demo"]),
    install_requires=[
        'Django',
    ],
    include_package_data=True,
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
)
