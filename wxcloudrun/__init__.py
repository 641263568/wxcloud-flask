from flask import Flask, request, abort
import xml.etree.ElementTree as ET

app = Flask(__name__)

print(123123123)
@app.route('/your_predefined_url', methods=['POST'])
def wechat():
    if request.method == 'POST':
        xml_str = request.data
        if not xml_str:
            abort(400)
        xml = ET.fromstring(xml_str)
        toUserName = xml.find("ToUserName").text
        fromUserName = xml.find("FromUserName").text
        createTime = xml.find("CreateTime").text
        msgType = xml.find("MsgType").text
        content = xml.find("Content").text
        msgId = xml.find("MsgId").text
        print(f"Received message: {content} from: {fromUserName}")
        return "success", 200

