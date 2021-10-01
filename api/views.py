from flask import Blueprint, request, jsonify
import sys
import os
sys.path.append(os.path.abspath(os.path.join('..')))
import pandas as pd
import numpy as np

main =Blueprint('main',__name__)

@main.route('/view',methods=['POST'])
def post_index():
    campaingnId=request.json
    extract=Extract()
    df=extract.extract_data(campaingnId['campId'])
    return df,201

@main.route('/view')
def get_index():
    camp_x=[]
    return camp_x


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
        campaign1 = Ilog_df[Ilog_df['CampaignId'] == Campaing_id]
        df1=campaign1.groupby('Site').agg({'Unnamed: 0': 'count', 'engagement': 'sum'})
        df1.reset_index(inplace=True)
        df1['engRate']=df1['engagement']/df1['Unnamed: 0'] 
        df1.sort_values(by='engRate', ascending=False, inplace=True,ignore_index=True)
        df1.rename(columns={'Unnamed: 0':'Impression'},index={'ONE':'Row_1'},inplace=True)
        df1['Rank']=df1.index
        df1.Rank+=1
        df2=df1[['Rank','Site','Impression','engagement','engRate']]
        result=self.convertToJSON(df2)
        return result
