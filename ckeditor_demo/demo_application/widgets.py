from django.forms import MultiWidget


class CkEditorMultiWidget(MultiWidget):
    def decompress(self, value):
        return [value for _ in self.widgets]
