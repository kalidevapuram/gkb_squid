from django.shortcuts import render
from django.http import JsonResponse
from ..bike_factors.models import BikeOption, BrandOption, CosmeticOption, FeaturesOption, FrameOption, WheelOption
from .models import Bike
import requests
import json
import string
import random
from .api import LightspeedApi
from .forms import BikeForm
# from django.views.generic.base import TemplateView



# Create your views here.
def home(request):
	sku_chars = string.ascii_lowercase + string.ascii_uppercase + string.digits
	sku = ""
	for _ in range(8):
		sku += random.choice(sku_chars)
	print sku
	return render(request, 'bike_donations/index.html')

def form_data(request):
	context = {
		'bikeType' : serialize_selections(BikeOption.objects.all()),
		'wheels' : serialize_selections(WheelOption.objects.all()),
		'brand' : serialize_selections(BrandOption.objects.all()),
		'cosmetic' : serialize_selections(CosmeticOption.objects.all()),
		'frame' : serialize_selections(FrameOption.objects.all()),
		'features' : serialize_selections(FeaturesOption.objects.all())
	}
	return JsonResponse(context)


def serialize_selections(query_set):
	data = {}

	for obj in query_set:
		if type(obj) == BikeOption:
			data[obj.option] = {'status' : False, 'price_factor' : obj.price_factor}
		else:
			requisites = []
			for req in obj.requisites.values():
				requisites.append(req['option'])


			data[obj.option] = {'status' : False, 'price_factor' : obj.price_factor, 'requisites':requisites}

	return data

def get_inv(request):
	lightspeed = LightspeedApi()
	inventory = lightspeed.get_inventory()
	print inventory
	return JsonResponse(inventory, safe=False)

def create_category(request):
	print ("IN the views with AMERICA", request)

	lightspeed = LightspeedApi()
	category = lightspeed.create_category()

	print category
	return render(request, 'bike_donations/index.html')

def sample_post(request):
	parsed_json = json.loads(request.body)
	print("parsed json", parsed_json)
	bikeoption = BikeOption.objects.get(option=parsed_json["bikeType"])
	print ("bike option retrieved", bikeoption, bikeoption.id)
	brandoption = BrandOption.objects.get(option=parsed_json["brand"])

	cosmeticoption = CosmeticOption.objects.get(option=parsed_json["cosmetic"])


	featuresoption = [FeaturesOption.objects.get(option=feature) for feature in parsed_json["features"]]

	frameoption = FrameOption.objects.get(option=parsed_json["frame"])

	wheeloption = WheelOption.objects.get(option=parsed_json["wheels"])

	optionsArray = [brandoption, cosmeticoption, frameoption, wheeloption, bikeoption]

	parsed_json["wheels"]=wheeloption.id
	parsed_json["features"]=[obj.id for obj in featuresoption]
	parsed_json["frame"]=frameoption.id
	parsed_json["brand"]=brandoption.id
	parsed_json["cosmetic"]=cosmeticoption.id
	parsed_json["bikeType"] = bikeoption.id
	form = BikeForm(parsed_json)

	if form.is_valid():
		print ("In the forms", form["bikeType"].value())
		parsed_json["djangoPrice"] = getBikePrice(optionsArray, featuresoption)
	else:
		print ("Not valid", form.errors.as_json())
	# descriptionString = str(parsed_json['bikeType'] + " " + parsed_json['brand'] + " " + parsed_json['cosmetic'])
	# bikePrice = parsed_json['price']
	# lightspeed = LightspeedApi()
	# newBicycle = lightspeed.create_bike(descriptionString, bikePrice)
	return JsonResponse(parsed_json)

def getBikePrice(optionsArray, featuresoption):
	basePrice = 200.00
	price_factor = 1
	for option in optionsArray:
		print option, option.price_factor
		price_factor *= option.price_factor
	for feature in featuresoption:
		print feature, feature.price_factor
		price_factor *= feature.price_factor
	print ("price factor", price_factor, basePrice * float(price_factor))
	return basePrice * float(price_factor)


# def getBike(request):
# 	print (request.body)
# 	print request
# 	return render(request, 'bike_donations/confirmation.html')
