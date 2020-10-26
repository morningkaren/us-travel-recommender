from flask import Flask, request, Response, send_from_directory
import json
import pickle
import os
import pandas as pd
from cdqa.pipeline.cdqa_sklearn import QAPipeline
from flask_cors import CORS, cross_origin

app = Flask(__name__)  # create instance of Flask class
cors = CORS(app)
cdqa_pipeline = QAPipeline(reader='models/bert_qa.joblib')

df = pickle.load( open('df_10012020.pkl', 'rb'))
dir_to_jpgs = 'States_JPEGS/'
jpg_server = "http://127.0.0.1:5000/state_jpegs/"
dir_to_images = "Images/Others/"
images_server = "http://127.0.0.1:5000/images/"
#cdqa_pipeline.fit_retriever(df)

def convert_to_str(element):
  element = str(element)
  return element

@app.route('/photo_gallery')
def photo_gallery():
  list_of_photo_urls = []
  for element in os.listdir("Images/Others/"):
    list_of_photo_urls.append(images_server + element)
    # output = {}
    # output['data'] = parse
    # js = json.dumps(output)
  l = pd.DataFrame(list_of_photo_urls, columns =['photo_url'])
  titles = []
  for url in list_of_photo_urls:
    titles.append(url.split('/')[-1])
  l['titles'] = titles
  result = l.to_json(orient='records')
  parse = json.loads(result)
  # output = {}
  # output['data'] = parse
  # js = json.dumps(output)
  js = json.dumps(parse)
  resp = Response(js, status=200, mimetype='application/json')
  print('RESP', resp)
  return resp


app.config['IMAGES'] = dir_to_images
@app.route('/images/<place>')
def get_images(place):
  return send_from_directory(app.config['IMAGES'], filename=place)

app.config['JPEGS'] = dir_to_jpgs
@app.route('/state_jpegs/<state>')
def get_jpg(state):
  return send_from_directory(app.config['JPEGS'], filename=state)

@app.route('/visit_times', methods=['POST'])
def visit_times():
    if request.method == 'POST':
      visit_times = pickle.load( open('visit_months_cost.pkl', 'rb'))
      months = request.get_json(force=True)
      print('MONTHS_RECEIVED', months)
      print("months type", type(months))
      d = pd.DataFrame()
      if 'All' in months['months']:
        d = visit_times
        d['jpg_url'] = jpg_server + d['State'] + '.png'
      else:
        for month in months['months']:
          d = pd.concat([d, (visit_times[visit_times['Month']==month])], axis=0)
        d['jpg_url'] = jpg_server + d['State'] + '.png'
      result = d.to_json(orient='records')
      parse = json.loads(result)
      js = json.dumps(parse)
      resp = Response(js, status=200, mimetype='application/json')
      print('RESP', resp)
      return resp

@app.route('/post', methods=['POST'])
def function():
    if request.method == 'POST':
        #received_data = request.get_data(as_text=True)
        received_data = request.get_json(force=True)
        print('RECEIVED', received_data)
        #t = json.loads(received_data)
        #print(t)
        state_query_dict = received_data
        print('TYPE_state_query_dict', type(state_query_dict))
        df['title'] = df['title'].apply(convert_to_str)
        if 'All' in state_query_dict['state']:
          cdqa_pipeline.fit_retriever(df)

          prediction = cdqa_pipeline.predict(state_query_dict['query'], n_predictions=5)

          images_titles = []
          state_city = []
          desc = []
          for i in range(len(prediction)):
            try:
              p = prediction[i][1].replace("('", "")
              p = p.replace("',)", "")
              p = images_server + p.split('_https://')[0] + '_' + p.split('/')[-1] + '.jpg'
              images_titles.append(p)
              state_city.append(prediction[i][1].split('_https://')[:-1] + [prediction[i][1].split('/')[-1]])
              desc.append(prediction[i][2])
            except:
              p = prediction[i][1].replace("('", "")
              p = p.replace("',)", "")
              p = images_server + p.split('_https://')[0] + '_' + p.split('/')[-1] + '.jpg'
              images_titles.append(p)
              state_city.append(str(prediction[i][1]).split('_https://')[:-1] + [str(prediction[i][1]).split('/')[-1]])
              desc.append(prediction[i][2])
        else:
          title_filter = []
          for state in state_query_dict['state']:
            for combo in df['title']:
              if state in combo.split('https://')[0]:
                title_filter.append(combo)

          df2 = pd.DataFrame()
          for title in title_filter:
            df2 = pd.concat([df2, df[df['title'] == title]])

          cdqa_pipeline.fit_retriever(df2)

          prediction = cdqa_pipeline.predict(state_query_dict['query'], n_predictions=5)

          images_titles = []
          state_city = []
          desc = []
          for i in range(len(prediction)):
            try:
              p = prediction[i][1].replace("('", "")
              p = p.replace("',)", "")
              p = images_server + p.split('_https://')[0] + '_' + p.split('/')[-1] + '.jpg'
              images_titles.append(p)
              state_city.append(prediction[i][1].split('_https://')[:-1] + [prediction[i][1].split('/')[-1]])
              desc.append(prediction[i][2])
            except:
              p = prediction[i][1].replace("('", "")
              p = p.replace("',)", "")
              p = images_server + p.split('_https://')[0] + '_' + p.split('/')[-1] + '.jpg'
              images_titles.append(p)
              state_city.append(str(prediction[i][1]).split('_https://')[:-1] + [str(prediction[i][1]).split('/')[-1]])
              desc.append(prediction[i][2])

        j = pd.DataFrame(data=state_city, columns=['state', 'city'])
        j['description'] = desc
        j['images_title'] = images_titles
        #print('PREDICTIONS', prediction)
        result = j.to_json(orient='records')
        parse = json.loads(result)
        #output = {}
        #output['data'] = parse
        #js = json.dumps(output)
        js = json.dumps(parse)
        resp = Response(js, status=200, mimetype='application/json')
        print('RESP', resp)
        return resp




if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')
