import sys
import os
sys.path.append(os.path.abspath(os.path.join('..')))
import pandas as pd
import numpy as np


class Extract:
    def __init__(self,CSV_PATH = "./data/processed.csv"):
        self.CSV_PATH = CSV_PATH

    def read_proccessed_data(self):
        try:    
            df = pd.read_csv(self.CSV_PATH)
            print("file read as csv")
            return df
        except FileNotFoundError:
            print("file not found")
    #Converts the input DataFrame to JSON 
    def convertToJSON(self, df):
        resultJSON = df.to_json(orient='records')
        return(resultJSON)
    def extract_data(self,Campaing_id):
        Ilog_df = self.read_proccessed_data()
        print('load the data')
        campaign1 = Ilog_df[Ilog_df['CampaignId'] == Campaing_id]
        df1=campaign1.groupby('Site').agg({'Unnamed: 0': 'count', 'engagement': 'sum'})
        df1.reset_index(inplace=True)
        df1['engRate']=df1['engagement']/df1['Unnamed: 0'] 
        df1.sort_values(by='engRate', ascending=False, inplace=True,ignore_index=True)
        result=self.convertToJSON(df1)
        print(result)
if(__name__ == '__main__'):
    extract=Extract()
    extract.extract_data('awbu4q4')

