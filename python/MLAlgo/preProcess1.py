import csv,json

# create a new csv file with entries id,std,mean,minimun,maximum,label

file_list = ['data0.csv','data1.csv','data2.csv','data3.csv']

with open('data.csv','a') as f:
    row = "label,std,mean,min,max\n"
    f.write(row)
    # open each file in the list and write the contents to the new file
    for file in file_list:
        with open(file,'r') as g:
            for line in g:
                f.write(line)

# read the new file and create a list of lists
with open('data.csv','r') as f:
    reader = csv.reader(f)
    data = list(reader)

    # separate points with label 0,1,2,3
    data0 = []
    data1 = []
    data2 = []
    data3 = []
    for row in data:
        if row[0] == '0':
            data0.append(row)
        elif row[0] == '1':
            data1.append(row)
        elif row[0] == '2':
            data2.append(row)
        elif row[0] == '3':
            data3.append(row)

# data0x = 3rd element of data0, data0y = 4th element of data1, ..
data0x = [x[2] for x in data0]
data0y = [x[3] for x in data0]
data0z = [x[4] for x in data0]