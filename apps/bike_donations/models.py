from __future__ import unicode_literals

from django.db import models
from ..bike_factors.models import *

# Create your models here.

class Bike(models.Model):
	bikeType = models.ForeignKey(BikeOption)
	wheels = models.ForeignKey(WheelOption)
	brand = models.ForeignKey(BrandOption)
	cosmetic = models.ForeignKey(CosmeticOption)
	frame = models.ForeignKey(FrameOption)
	features = models.ManyToManyField(FeaturesOption, blank=True)
	nego_factor = models.DecimalField(max_digits=3, decimal_places=2, default=1.05)
	price = models.DecimalField(max_digits=6, decimal_places=2, default=200.00)

	# def save(self, *args, **kwargs):
	# 	self.bike_price = 200
	# 	print self
	# 	price_factor = (
	# 		self.bike_type.price_factor *
	# 		self.bike_wheel.price_factor *
	# 		self.bike_brand.price_factor *
	# 		self.bike_cosmetic.price_factor *
	# 		self.bike_frame.price_factor *
	# 		self.nego_factor
	# 	)

		# for feature in self.bike_features.all().values():
		# 	price_factor *= feature['price_factor']
		#
		# print price_factor


		# self.bike_price *= price_factor
		# print self.bike_features.all().values()
		# super(Bike, self).save(*args, **kwargs)
