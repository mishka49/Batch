import eel
from back.paths import *

# eel.init('front') 
#
# # @eel.expose
# # def get_data():
# #     return 'Get data from python'
#
# eel.start('index.html')

port = 10001  # 好きなポートで
eel.init("./front_react/build")  # 使用するhtml/js/cssのあるフォルダを指定
# eel.start("index.html", port=port      )
eel.start("index.html", port=8888)
