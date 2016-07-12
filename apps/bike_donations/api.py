import requests
import json

class LightspeedApi(object):
	auth = ('22dabb44da10a0d29347905309fd40dc5ad88bc3683927bb6be0d2142ba7c90b', 'apikey')

	def get_inventory(self):
		url = 'https://api.merchantos.com/API/Account/132193/Item.json'

		response = requests.get(url, auth=self.auth)
		return response.content

	def create_category(self):
		url = 'https://api.merchantos.com/API/Account/132193/Item.json'
		json_data = '{"@attributes":{"count":"1"},"customSku":"12345678902224","description":"French steel frame Huffy mountain bike average", "manufacturerID":"3","ItemShops":{"ItemShop":[{"qoh":"1","shopID":"1"}]}, "Prices":{"ItemPrice":[{"amount": "230", "useType":"Default", "useTypeID":"1"}]}}'
		print "This is json_data"
		print json_data
		response = requests.post(url, auth=self.auth, data=json_data)
		print dir(response)
		print response.reason
		return True
