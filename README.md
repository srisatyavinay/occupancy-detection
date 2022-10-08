# Motion Sensor for Occupancy Detection

## Dashboard

To visit Dashboard deployed on vercel click [here](https://team22eswdashboard.vercel.app/)

To see the dashboard on your localhost, follow these steps

> **Note:** Make sure npm, node are installed on your pc.

```sh
cd Dashboard
npm i
npm start
```

Now open [http://localhost:3000/](http://localhost:3000/) on your machine to see the dashboard.

## ESP32 Code

### Deployment

The final code used while deployment is in the folder `final` and named as `final.ino`. Click [here](/final/final.ino) to see the code

### Training

The code used for training is in two folders
- One for zero people in the room. It is in the folder `for0values` and named as `for0values.ino`. Click [here](/for0values/for0values.ino) to see the code.
- One for non-zero people in the room. It is in the folder `forvalues` and named as `forvalues.ino`. Click [here](/forvalues/forvalues.ino) to see the code.

## ESP32 Cam code

The code for ESP32 cam is in the folder `Esp_32_cam_drive`. It is in three files. Click [here](/Esp_32_cam_drive/Esp_32_cam_drive.ino) to see the code for cam.

## ML model code

The code for ML model is in `classifier.py` which is in the folder `python/MLAlgo`. Click [here](/python/MLAlgo/classifier.py) to see the code.

## Python server

We need to run a python server parallely and it's code is in the folder `python/MLAlgo` and the file name is `app.py`, Click [here](/python/MLAlgo/app.py) to see the code.

To run the python server follow these steps

> **Note:** Make sure you have python and pip installed on your pc.

Run the following commands to install dependencies

```sh
pip install --user --upgrade catboost
pip install --user --upgrade ipywidgets
pip install shap
pip install sklearn
pip install --upgrade numpy
jupyter nbextension enable --py widgetsnbextension
```

Run this command to start the server.

```sh
cd python/MLAlgo
python app.py
```

**Run Dashboard code, `final.ino` and `app.py` (python server) at the same time.**
