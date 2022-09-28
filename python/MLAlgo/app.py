import requests
from classifier import model 
import numpy as np

URL = "https://api.thingspeak.com/channels/1848526/feed.json?api_key=9DL4JXYDG8C6P32U&results=1"
URL2 = "https://api.thingspeak.com/update?api_key=KS5CPBT8KOBU3PP3"

prev_time = ""

while(1):
    r = requests.get(url = URL)
    data = r.json()
    # print(data)
    if data['feeds'][0]['created_at'] == prev_time:
        continue
    else:
        prev_time = data['feeds'][0]['created_at']
    for i in range(len(data['feeds'])):
        temp_values = data['feeds'][i]['field2'] + data['feeds'][i]['field3'] 
        # # convert temp_values to list of floats
        temp_values = [float(x) for x in temp_values.split(',') if x != '']

        temp_values = np.array(temp_values)

        std = np.std(temp_values)
        mean = np.mean(temp_values)
        median = np.median(temp_values)
        mini = np.min(temp_values)
        maxi = np.max(temp_values)

        # convert all values to strings
        std = str(std)
        mean = str(mean)
        median = str(median)
        mini = str(mini)
        maxi = str(maxi)

        # make array of std, mean, median, min, max
        X_pred = np.array([std, mean, mini, maxi])

        # predict using model
        y_pred = model.predict(X_pred)
        print("no.of people", y_pred[0])

        t = requests.post(url = URL2, data = {'field1': y_pred[0], 'field2': data['feeds'][i]['field2'], 'field3': data['feeds'][i]['field3']})

        print("status", t)



        





  
  
# # extracting latitude, longitude and formatted address 
# # of the first matching location
# latitude = data['results'][0]['geometry']['location']['lat']
# longitude = data['results'][0]['geometry']['location']['lng']
# formatted_address = data['results'][0]['formatted_address']
  
# # printing the output
# print("Latitude:%s\nLongitude:%s\nFormatted Address:%s"
#       %(latitude, longitude,formatted_address))