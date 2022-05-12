from flask import Flask, render_template, url_for, request, json,jsonify
from datetime import datetime
import pandas as pd

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

M=0
des={}
times = {}
des['des']='ZK216+823'
count_all = {"safeCount_all":21,"dangerCount_all":9}
res=[[1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500]]
counts_location = {'ZK216+823':0,'YK219+688.4':0,'YK219+684.2':0,'YK219+690.8':0,'YK219+692':0}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data',methods=['GET'])
def choose_data():
    data = request.args.get("position")
    des['des']=data
    if data=="ZK216+823":
        return "1"
    if data=="YK219+688.4":
        return "2"
    if data=="YK219+684.2":
        return "3"
    if data=="YK219+690.8":
        return "4"
    if data=="YK219+692":
        return "5"
    return "0"

import time
@app.route('/l1')
def get_l1_data():
    d = pd.read_csv(r"./data/data传感333.csv")
    df = pd.read_csv(r"./data/安全危险次数hhh.csv")
    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day'])
    target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d'))
    target_time = datetime.strptime(target_time, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
    d['采集时间'] = d['采集时间'].apply(lambda x: (datetime.strptime(x, '%Y-%m-%d %H:%M:%S')).strftime('%Y-%m-%d'))
    product_df = d.loc[(d['采集时间'] == target_time) & (d['采集仪位置'] == des['des'])]

    res = product_df.values.tolist()
    if (len(res) != 0):
        ma = res[0][3:11]
        mi = min(ma)
        ma = max(ma)
        ma = '{:.2f}'.format(ma)
        mi='{:.2f}'.format(mi)
    else:
        ma=0
        mi=0
    df['采集时间'] = df['采集时间'].apply(lambda x: (datetime.strptime(x, '%Y-%m-%d %H:%M:%S')).strftime('%Y-%m-%d'))

    product_df = df.loc[(df['采集时间'] == target_time)&(df['采集仪位置'] == des['des'])]

    product_df_s = product_df.groupby(['采集仪位置'])['sum_x'].agg(['sum']).reset_index()
    product_df_d = product_df.groupby(['采集仪位置'])['sum_y'].agg(['sum']).reset_index()
    print(int(product_df_s[product_df_s['采集仪位置']==des['des']]['sum']))
    a=int(product_df_s[product_df_s['采集仪位置']==des['des']]['sum'])
    b=int(product_df_d[product_df_d['采集仪位置']==des['des']]['sum'])
    return jsonify({"max": ma, "min": mi, "safe": a , "danger":b})

@app.route('/l2')
def get_l2_data():
    global des ,res
    df = pd.read_csv(r"./data/data传感333.csv")
    target_des = des['des']

    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day'])
    target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d'))
    target_time = datetime.strptime(target_time, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
    df['采集时间'] = df['采集时间'].apply(lambda x: (datetime.strptime(x, '%Y-%m-%d %H:%M:%S')).strftime('%Y-%m-%d'))

    product_df = df.loc[(df['采集时间'] == target_time) & (df['采集仪位置'] == target_des)]
    if(len(product_df)!=0&(res!=[[1500,1500,1500,1500,1500,1500,1500,1500]])):
        res = product_df.values.tolist()
    return jsonify({ "对比": res[0][3:11]})

@app.route('/l3')
def get_l3_data():
    global l3_index
    df_l3=pd.read_csv(r"./data/传感器.csv")
    target_location = des['des']
    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day']) + " " + str(times['hour']) + ":" + str(times['min']) + ":" + str(times['second'])
    l3_index = df_l3.loc[(df_l3['采集时间'] == target_time) & (df_l3['采集仪位置'] == target_location)]
    if len(l3_index.values.tolist())==0:
        l3_index = 11
    else:
        l3_index = l3_index.index[0]
    index = df_l3["采集时间"][l3_index:l3_index+10].map(lambda x:x[10:] ).tolist()
    data1 = df_l3["通道1频率值"][l3_index:l3_index+10]
    max1 = data1.tolist()
    data2 = df_l3["通道2频率值"][l3_index:l3_index+10]
    max2 = data2.tolist()
    data3 =df_l3["通道3频率值"][l3_index:l3_index+10]
    max3 = data3.tolist()
    data4 = df_l3["通道4频率值"][l3_index:l3_index + 10]
    max4 = data4.tolist()
    data5 = df_l3["通道5频率值"][l3_index:l3_index + 10]
    max5 = data5.tolist()
    data6 = df_l3["通道6频率值"][l3_index:l3_index + 10]
    max6 = data6.tolist()
    data7= df_l3["通道7频率值"][l3_index:l3_index + 10]
    max7 = data7.tolist()
    data8= df_l3["通道8频率值"][l3_index:l3_index + 10]
    max8 = data8.tolist()
    return jsonify({"index": index, "max1": max1, "max2": max2,"max3":max3,"max4":max4,"max5":max5,"max6":max6,"max7":max7,"max8":max8 })

@app.route('/c1')
def get_c1_data():
    df = pd.read_csv(r"./data/安全危险次数hhh.csv")
    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day'])
    target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d'))
    target_time = datetime.strptime(target_time, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
    df['采集时间'] = df['采集时间'].apply(lambda x: (datetime.strptime(x, '%Y-%m-%d %H:%M:%S')).strftime('%Y-%m-%d'))

    product_df = df.loc[(df['采集时间'] <= target_time) & (df['采集仪位置'] == des['des'])]
    print(product_df['采集仪位置'].value_counts())

    product_df_s = product_df.groupby(['采集仪位置'])['sum_x'].agg(['sum']).reset_index()
    product_df_d = product_df.groupby(['采集仪位置'])['sum_y'].agg(['sum']).reset_index()

    count_all["safeCount_all"]  = int(product_df_s[product_df_s['采集仪位置'] == des['des']]['sum'])
    count_all["dangerCount_all"] = int(product_df_d[product_df_d['采集仪位置'] == des['des']]['sum'])
    target=count_all["safeCount_all"]+count_all["dangerCount_all"]
    safe_rate = str(int(round(count_all["safeCount_all"] / target * 100, 0))) + '%'
    danger_rate = str(int(round(count_all["dangerCount_all"] / target * 100, 0))) + '%'
    return jsonify({"safeCount_all": count_all["safeCount_all"], "safe_target": target, "safe_rate": safe_rate,
                    "dangerCount_all": count_all["dangerCount_all"], "danger_target": target, "danger_rate": danger_rate})

@app.route('/r1')
def get_r1_data():
    global M
    df = pd.read_csv(r"./data/data传感333.csv")
    target_des = des['des']
    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day']) + " " + str(
        times['hour']) + ":" + str(times['min']) + ":" + str(times['second'])
    target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d %H:%M:%S'))
    # 展示效果
    # target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day'])
    # target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d'))
    # target_time = datetime.strptime(target_time, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
    df['采集时间'] = df['采集时间'].apply(lambda x: (datetime.strptime(x, '%Y-%m-%d %H:%M:%S')).strftime('%Y-%m-%d'))

    product_df = df.loc[(df['采集时间'] == target_time) & (df['采集仪位置'] == target_des)]
    res = product_df.values.tolist()

    if(len(res)!=0):
        M = res[0][3:11]
        M = max(M)
        M /= 4000
        M *= 100
        M = '{:.2f}'.format(M)
    return jsonify({"m": M})

@app.route('/getTime',methods=['GET'])
def getTime():
    times['year'] = request.args.get("year")
    times['month'] = request.args.get("month")
    times['day'] = request.args.get("day")
    times['hour'] = request.args.get("hour")
    times['min'] = request.args.get("min")
    times['second'] = request.args.get("second")
    return "1"

@app.route('/r21')
def get_r21_data():
    df = pd.read_csv(r"./data/安全危险次数hhh.csv")
    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day'])
    target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d'))
    target_time = datetime.strptime(target_time, '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M:%S')
    df['采集时间'] = df['采集时间'].apply(lambda x: (datetime.strptime(x, '%Y-%m-%d %H:%M:%S')).strftime('%Y-%m-%d %H:%M:%S'))
    product_df = df.loc[(df['采集时间'] <= target_time)]
    print(product_df['采集仪位置'].value_counts())

    product_df = product_df.groupby(['采集仪位置'])['sum_x'].agg(['sum']).reset_index()
    product_df = product_df.sort_values(by=["sum"], ascending=False).reset_index()
    print(product_df)
    l = list(product_df['采集仪位置'])
    l.reverse()
    return jsonify({"采集仪位置": l, "安全次数": product_df['sum'].tolist()[::-1]})

@app.route('/r22')
def get_r22_data():
    df = pd.read_csv(r"./data/安全危险次数hhh.csv")
    target_time = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day']) + " " + str(
        times['hour']) + ":" + str(times['min']) + ":" + str(times['second'])
    target_time = str(datetime.strptime(str(target_time), '%Y-%m-%d %H:%M:%S'))
    product_df = df.loc[df['采集时间'] <= target_time]
    product_df = product_df.groupby(['采集仪位置'])['sum_y'].agg(['sum']).reset_index()
    product_df = product_df.sort_values(by=["sum"], ascending=False).reset_index()
    l = list(product_df['采集仪位置'])
    l.reverse()
    return jsonify({"采集仪位置": l, "危险次数": product_df['sum'].tolist()[::-1]})

@app.route('/r3')
def get_r3_data():
    df = pd.read_csv("./data/传感器.csv")
    target_time1 = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day']) + " " + "00:00:00"
    target_time2 = str(times['year']) + "-" + str(times['month']) + "-" + str(times['day']) + " " + "23:59:59"
    target_time1 = str(datetime.strptime(str(target_time1), '%Y-%m-%d %H:%M:%S'))
    target_time2 = str(datetime.strptime(str(target_time2), '%Y-%m-%d %H:%M:%S'))
    product_df = df.loc[target_time1 <= df['采集时间']]
    product_df = df.loc[df['采集时间'] <= target_time2]
    for i,j in dict(product_df['采集仪位置'].value_counts()).items():
        counts_location[i] = j
    return jsonify({"location1": int(counts_location['ZK216+823']),"location2": int(counts_location['YK219+688.4']),
                    "location3":int(counts_location['YK219+684.2']),"location4":int(counts_location['YK219+690.8']),
                    "location5":int(counts_location['YK219+692'])})

if __name__ == '__main__':
    app.run(debug=True)
