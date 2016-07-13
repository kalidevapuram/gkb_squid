from django.forms import ModelForm
from .models import Bike

class BikeForm(ModelForm):
    class Meta:
        model = Bike
        fields = ["bikeType", "brand", "cosmetic", "frame", "features"]
