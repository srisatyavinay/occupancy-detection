import pandas as pd
import json

# load the 0values.json file from Downloads
with open('/home/akash/ESW-CodeBase/values/0values.json','r') as f:
    data = json.load(f)

    entries = data['feeds']

    for entry in entries:
        row = "0,"
        #row += str(entry['entry_id']) + ","
        #row += entry['field2'] + entry['field3']
        temp_vals = entry['field2'] + entry['field3']
        
        # separate the values of temp_vals into a list by comma
        temp_vals = temp_vals.split(',')
        # convert the list of strings into a list of floats only if it is a number
        temp_vals = [float(x) for x in temp_vals if x != '']
        #print(len(temp_vals))

        # calculate std, mean, min, max
        mean = sum(temp_vals) / len(temp_vals)
        variance = sum([((x - mean) ** 2) for x in temp_vals]) / len(temp_vals)
        std = variance ** 0.5
        min_val = min(temp_vals)
        max_val = max(temp_vals)
        
        row += str(std) + "," + str(mean) + "," + str(min_val) + "," + str(max_val) + "\n"
        #print(row)
        #row += str(extract(entry['field2'])) + "," + str(extract(entry['field3']))
        #print(row)

        # write the row to a file data0.csv
        with open('data0.csv', 'a') as g:
            g.write(row)

with open('/home/akash/ESW-CodeBase/values/1values.json','r') as f:

    data = json.load(f)

    entries = data['feeds']

    for entry in entries:
        row = "1,"
        #row += str(entry['entry_id']) + ","
        #row += entry['field2'] + entry['field3']
        temp_vals = entry['field2'] + entry['field3']
        
        # separate the values of temp_vals into a list by comma
        temp_vals = temp_vals.split(',')
        # convert the list of strings into a list of floats only if it is a number
        temp_vals = [float(x) for x in temp_vals if x != '']
        #print(len(temp_vals))

        # calculate std, mean, min, max
        mean = sum(temp_vals) / len(temp_vals)
        variance = sum([((x - mean) ** 2) for x in temp_vals]) / len(temp_vals)
        std = variance ** 0.5
        min_val = min(temp_vals)
        max_val = max(temp_vals)
        
        row += str(std) + "," + str(mean) + "," + str(min_val) + "," + str(max_val) +  "\n"
        #print(row)
        #row += str(extract(entry['field2'])) + "," + str(extract(entry['field3']))
        #print(row)

        # write the row to a file data0.csv
        with open('data1.csv', 'a') as g:
            g.write(row)

with open('/home/akash/ESW-CodeBase/values/2values.json','r') as f:

    data = json.load(f)

    entries = data['feeds']

    for entry in entries:
        row = "2,"
        #row += str(entry['entry_id']) + ","
        #row += entry['field2'] + entry['field3']
        temp_vals = entry['field2'] + entry['field3']
        
        # separate the values of temp_vals into a list by comma
        temp_vals = temp_vals.split(',')
        # convert the list of strings into a list of floats only if it is a number
        temp_vals = [float(x) for x in temp_vals if x != '']
        #print(len(temp_vals))

        # calculate std, mean, min, max
        mean = sum(temp_vals) / len(temp_vals)
        variance = sum([((x - mean) ** 2) for x in temp_vals]) / len(temp_vals)
        std = variance ** 0.5
        min_val = min(temp_vals)
        max_val = max(temp_vals)
        
        row += str(std) + "," + str(mean) + "," + str(min_val) + "," + str(max_val) + "\n"
        #print(row)
        #row += str(extract(entry['field2'])) + "," + str(extract(entry['field3']))
        #print(row)

        # write the row to a file data2.csv
        with open('data2.csv','a') as g:
            g.write(row)

with open('/home/akash/ESW-CodeBase/values/2values.json','r') as f:

    data = json.load(f)

    entries = data['feeds']

    for entry in entries:
        row = "3,"
        #row += str(entry['entry_id']) + ","
        #row += entry['field2'] + entry['field3']
        temp_vals = entry['field2'] + entry['field3']
        
        # separate the values of temp_vals into a list by comma
        temp_vals = temp_vals.split(',')
        # convert the list of strings into a list of floats only if it is a number
        temp_vals = [float(x) for x in temp_vals if x != '']
        #print(len(temp_vals))

        # calculate std, mean, min, max
        mean = sum(temp_vals) / len(temp_vals)
        variance = sum([((x - mean) ** 2) for x in temp_vals]) / len(temp_vals)
        std = variance ** 0.5
        min_val = min(temp_vals)
        max_val = max(temp_vals)
        
        row += str(std) + "," + str(mean) + "," + str(min_val) + "," + str(max_val) + "\n"
        #print(row)
        #row += str(extract(entry['field2'])) + "," + str(extract(entry['field3']))
        #print(row)

        # write the row to a file data2.csv
        with open('data3.csv','a') as g:
            g.write(row)



