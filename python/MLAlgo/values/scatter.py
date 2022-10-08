
import matplotlib.pyplot as plt

colours_list = ['blue','orange','green','red']

fig = plt.figure()
ax = fig.add_subplot(projection='3d')

max_ = [-1,-1,-1]
min_ = [100,100,100]

for i in range(0,4):
    file1 = '../data' + str(i) + '.csv'
    file2 = '../old_data/data' + str(i) + '.csv'
    
    file1 = open(file1,'r')
    file2 = open(file2,'r')
    lines1 = file1.readlines()
    lines2 = file2.readlines()
    x = []
    y = []
    z = []
    
    for line in lines1:
        line = line.split(',')
        x.append(float(line[2]))
        y.append(float(line[3]))
        z.append(float(line[4]))
    for line in lines2:
        line = line.split(',')
        x.append(float(line[2]))
        y.append(float(line[3]))
        z.append(float(line[4]))
    
    list_ = [x,y,z]
    for j in range(3):
        if(max_[j] < max(list_[j])):
            max_[j] = max(list_[j])
        if(min_[j] > min(list_[j])):
            min_[j] = min(list_[j])
        
    # scatter plot of x,y,z
    ax.plot(x,y,z,color=colours_list[i])
    #ax.scatter(x,y,color=colours_list[i])
    #ax.scatter(y,z,color=colours_list[i])
    #ax.scatter(z,x,color=colours_list[i])
    

#ax.set_xlabel('X')
plt.xlim(min_[0],max_[0])
plt.ylim(min_[1],max_[1])
#plt.zlim(min_[2],max_[2])
plt.show()

