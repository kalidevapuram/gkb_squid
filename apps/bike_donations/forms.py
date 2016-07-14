from django.forms import ModelForm
from .models import Bike
from .models import Component

class BikeForm(ModelForm):
    class Meta:
        model = Bike
        fields = ["bikeType", "wheels", "brand", "cosmetic", "frame", "features"]

class componentForm(ModelForm):
	class Meta:
		model = Component
		fields = ['saddleSelect', 'handleSelect', 'price']

