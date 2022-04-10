#!/usr/bin/env python3

import os
import sys

from setuptools import find_packages, setup


version = __import__("ckeditor").__version__

if sys.argv[-1] == "publish":
    os.system("python setup.py sdist upload")
    os.system("python setup.py bdist_wheel upload")
    sys.exit()

if sys.argv[-1] == "tag":
    os.system(f"git tag -a {version} -m 'version {version}'")
    os.system("git push --tags")
    sys.exit()

long_description = "\n".join(
    [
        open("README.rst").read(),
        open("AUTHORS.rst").read(),
        open("CHANGELOG.rst").read(),
    ]
)


def get_source_files():
    for dirname, _, files in os.walk("ckeditor/static/ckeditor/ckeditor/_source"):
        for filename in files:
            yield os.path.join("/".join(dirname.split("/")[1:]), filename)


setup(
    name="django-ckeditor",
    version=version,
    description="Django admin CKEditor integration.",
    long_description=long_description,
    author="Shaun Sephton & Piotr Malinski",
    author_email="riklaunim@gmail.com",
    url="https://github.com/django-ckeditor/django-ckeditor",
    project_urls={
        "Documentation": "https://django-ckeditor.readthedocs.io/en/latest/",
        "Source": "https://github.com/django-ckeditor/django-ckeditor",
    },
    packages=find_packages(exclude=["*.demo"]),
    zip_safe=False,
    install_requires=[
        "Django>=3.2",
        "django-js-asset>=1.2.2",
    ],
    python_requires=">=3.8",
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "License :: OSI Approved :: BSD License",
        "Operating System :: OS Independent",
        "Framework :: Django",
        "Framework :: Django :: 3.2",
        "Framework :: Django :: 4.0",
        "Intended Audience :: Developers",
        "Topic :: Internet :: WWW/HTTP :: Dynamic Content",
    ],
)
