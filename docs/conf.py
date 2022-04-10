import os
import sys


sys.path.append(os.path.abspath(".."))

extensions = []

templates_path = ["_templates"]

source_suffix = ".rst"

master_doc = "index"

project = "Django CKEditor"
copyright = "2010 - 2017 The Django-CKEditor Team"

version = __import__("ckeditor").__version__
release = version

pygments_style = "sphinx"

html_theme = "default"

html_static_path = ["_static"]

htmlhelp_basename = "DjangoCKEditordoc"

latex_documents = [
    (
        "index",
        "DjangoCKEditor.tex",
        "Django CKEditor Documentation",
        "The Django-CKEditor Team",
        "manual",
    )
]

man_pages = [
    (
        "index",
        "djangoCKEditor",
        "Django CKEditor Documentation",
        ["The Django-CKEditor Team"],
        1,
    )
]

texinfo_documents = [
    (
        "index",
        "DjangoCKEditor",
        "Django CKEditor Documentation",
        "The Django-CKEditor Team",
        "DjangoCKEditor",
        "CKEditor integration for Django",
        "Miscellaneous",
    )
]
