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
    df=extract.main_fun(campaingnId['campId'])
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
    def encodeAdFormat(self,x):
        if(x=='300x250'):
            return 0
        else:
            return 1
    def engagement_rate(self,Ilog_df,Campaing_id):
        Ilog_df['AdFormat1']=Ilog_df['AdFormat'].apply(self.encodeAdFormat)
        campaign1 = Ilog_df[Ilog_df['CampaignId'] == Campaing_id]
        df1=campaign1.groupby('Site').agg({'Unnamed: 0': 'count', 'engagement': 'sum','video-start':'sum','video-end':'sum','click':'sum','AdFormat1':'sum'})
        df1.reset_index(inplace=True)
        df1['engRate']=df1['engagement']/df1['Unnamed: 0']
        return df1
    def calcualte_score(self,df1):
        df1['Score']=(df1['Unnamed: 0']/100)*((df1['engagement']*10 +df1['AdFormat1']+(df1['video-start']+df1['video-end'])+df1['click'])/df1['Unnamed: 0']) 
        return df1 
    def rank_sort(self,df1):
        df1.sort_values(by='Score', ascending=False, inplace=True,ignore_index=True)
        df1.rename(columns={'Unnamed: 0':'Impression'},index={'ONE':'Row_1'},inplace=True)
        df1['Rank']=df1.index
        df1.Rank+=1
        return df1
    def main_fun(self,Campaing_id):
        Ilog_df = self.read_proccessed_data()
        df1=self.engagement_rate(Ilog_df,Campaing_id)
        df1=self.calcualte_score(df1)
        df1=self.rank_sort(df1)
        df2=df1[['Rank','Site','Impression','engagement','engRate','Score']]
        result=self.convertToJSON(df2)
        return result
