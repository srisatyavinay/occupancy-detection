import pandas as pd
import os
import numpy as np
np.set_printoptions(precision=4)
import catboost
from catboost import *
from catboost import datasets
# import sklearn train test split
from sklearn.model_selection import train_test_split

data = pd.read_csv("old_data/data.csv")

train_df, test_df = train_test_split(data, test_size=0.1, random_state=476)

y_train = train_df['label']
# for X, remove both the label and entry_id columns
X_train = train_df.drop(['label'], axis=1)

cat_features = list(range(0, X_train.shape[1]))

dataset_dir = 'ProjectK'
if not os.path.exists(dataset_dir):
    os.makedirs(dataset_dir)

# We will be able to work with files with/without header and
# with different separators.
train_df.to_csv(
    os.path.join(dataset_dir, 'train.tsv'),
    index=False, sep='\t', header=False
)
test_df.to_csv(
    os.path.join(dataset_dir, 'test.tsv'),
    index=False, sep='\t', header=False
)

train_df.to_csv(
    os.path.join(dataset_dir, 'train.csv'),
    index=False, sep=',', header=True
)
test_df.to_csv(
    os.path.join(dataset_dir, 'test.csv'),
    index=False, sep=',', header=True
)

from catboost.utils import create_cd
feature_names = dict()
for column, name in enumerate(train_df):
    if column == 0:
        continue
    feature_names[column - 1] = name
    
create_cd(
    label=0, 
    cat_features=list(range(1, train_df.columns.shape[0])),
    feature_names=feature_names,
    output_path=os.path.join(dataset_dir, 'train.cd')
)

train_df = train_df.astype(str)
test_df = test_df.astype(str)

y_train = train_df['label']
X_train = train_df.drop(['label'], axis=1)


y_test = test_df['label']
X_test = test_df.drop(['label'], axis=1)

from catboost import CatBoostClassifier

model = CatBoostClassifier(
    iterations=256,
    random_seed= 511,
    loss_function='MultiClass'
)

model.fit(
    X_train, y_train,
    cat_features=cat_features,
    #eval_set=(X_validation, y_validation),
    verbose=False,
    plot=True
)
