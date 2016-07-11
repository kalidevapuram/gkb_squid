import requests

class LightspeedApi(object):
	auth = ('22dabb44da10a0d29347905309fd40dc5ad88bc3683927bb6be0d2142ba7c90b', 'apikey')

	def get_inventory(self):
		url = 'https://api.merchantos.com/API/Account/132193/Item.json'

		response = requests.get(url, auth=self.auth)
		return response.content

	def create_category(self):
		url = 'https://api.merchantos.com/API/Account/132193/Category.json'
		post_data = "<?xml version='1.0' encoding='utf-8'?><Category><name>'Squiddy'</name><nodeDepth readonly='true'>1</nodeDepth><fullPathName readonly='true'>Example string value.</fullPathName><leftNode readonly='true'>1</leftNode><rightNode readonly='true'>1</rightNode><createTime readonly='true'>2016-06-02T22:21:35+00:00</createTime><timeStamp>2016-06-02T22:21:35+00:00</timeStamp><parentID>0</parentID><Category><name>'SquiddyTwo'</name><nodeDepth readonly='true'>1</nodeDepth><fullPathName readonly='true'>Example string value.</fullPathName><leftNode readonly='true'>1</leftNode><rightNode readonly='true'>1</rightNode><createTime readonly='true'>2016-06-02T22:21:35+00:00</createTime><timeStamp>2016-06-02T22:21:35+00:00</timeStamp><parentID>0</parentID></Category></Category>"
		response = requests.post(url, auth=self.auth, data=post_data)
		print response
		return True
