with open('final.csv','a') as f:

    file1 = "data.csv"
    file2 = "./old_data/data.csv"

    file1 = open("data.csv",'r')
    file2 = open("./old_data/data.csv",'r')

    for line in file1.readlines():
        f.write(line)
    for line in file2.readlines():
        f.write(line)



