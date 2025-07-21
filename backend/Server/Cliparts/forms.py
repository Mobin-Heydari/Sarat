from django import forms
from ckeditor.widgets import CKEditorWidget
from .models import Clipart

class ClipartForm(forms.ModelForm):
    text = forms.CharField(widget=CKEditorWidget(), label="متن نماهنگ")

    class Meta:
        model = Clipart
        fields = '__all__'
