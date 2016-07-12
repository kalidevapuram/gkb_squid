from django.forms import ModelForm
from .models import Bike

class BikeForm(ModelForm):
    class Meta:
        model = Bike
        fields = ["bikeType", "wheels", "brand", "cosmetic", "frame", "features"]
