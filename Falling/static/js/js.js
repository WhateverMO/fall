
$(function ()
{
setInterval(get_l1_data, 1000*1);
setInterval(echarts_l2, 1000*1);
setInterval(echarts_l3, 1000*1);
setInterval(echarts_c1, 1000*1);
setInterval(echarts_r1, 1000*1);
setInterval(echarts_r21, 1000*1);
setInterval(echarts_r22, 1000*1);
setInterval(echarts_r3, 1000*1);
function get_l1_data() {
	$.ajax({
		url: "/l1",
		success: function(data) {
			$("#max").html(data.max)
			$("#min").html(data.min)
			$("#safe").html(data.safe)
			$("#danger").html(data.danger)
		},
		error: function(xhr, type, errorThrown) {

		}
	})
}

function echarts_l2() {
        var myChart = echarts.init(document.getElementById('echart_l2'));

            $.ajax({
                url:'/l2',
                success:function (data) {

				var option = {
			
						tooltip: {
							trigger: 'axis'
						},
						color: ['#03b48e', '#3893e5'],

						radar: [{
							indicator: [{
								text: '通道1',
								max: 2200
							}, {
								text: '通道2',
								max: 2200
							}, {
								text: '通道3',
								max: 2200
							}, {
								text: '通道4',
								max: 2200
							}, {
								text: '通道5',
								max: 2200
							}, {
								text: '通道6',
								max: 2200
							}, {
								text: '通道7',
								max: 2200
							}, {
								text: '通道8',
								max: 2200
							}],

							center: ['50%', '50%'],
							radius: '70%',
							startAngle: 90,
							splitNumber: 4,
							shape: 'circle',
						
							name: {
								padding:-5,
								formatter: '{value}',
								textStyle: {
									fontSize:10,
									color: 'rgba(255,255,255,.7)'
								}
							},
							splitArea: {
								areaStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255,255,255,.05)'
								}
							}
						}, ],
						series: [{
							name: '雷达图',
							type: 'radar',
							tooltip: {
								trigger: 'item'
							},
							data: [ {
								name: '各通道频率值',
								value: data['对比'],
								symbolSize: 0,
								lineStyle: {
									normal: { 
										color:'#3893e5',
										width:2,
									}
								},
									 areaStyle: {
									normal: {
										color: 'rgba(19, 173, 255, 0.5)'
									}
								}
							}]
						}, ]
					};
		 


		         myChart.setOption(option);
		 
				window.addEventListener("resize",function(){
					myChart.resize();
				});


                }
            })




		}

function echarts_l3() {
        var myChart = echarts.init(document.getElementById('echart_l3'));
        $.ajax({
                url:'/l3',
                success:function (data) {
					var option = {
							legend: {
								icon:"circle",
								top: "0",
								width:'100%',
								right: 'center',
										itemWidth: 12,
										itemHeight: 10,
							 data: ['通道1','通道2','通道3','通道4','通道5','通道6','通道7','通道8'],
							 textStyle: {
								 color: "rgba(255,255,255,.5)" },
						 },
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow',
									lineStyle: {
										 color: '#dddc6b'
									 }
								 }
							},

							 xAxis: [{
							    type: 'category',
								boundaryGap: false,
								axisLabel:  {
											rotate: -45,
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
										},
									},
								axisLine: {
											lineStyle: {
												color: 'rgba(255,255,255,.1)'
											}
								},
						   data: data['index']

							}, {

								axisPointer: {show: false},
								axisLine: {  show: false},
								position: 'bottom',

							}],

						  yAxis: [
						   {
									type: 'value',
									axisTick: {show: false},
								   // splitNumber: 6,
									axisLine: {
										lineStyle: {
											color: 'rgba(255,255,255,.1)'
										}
									},
								   axisLabel:  {
									formatter: "{value}",
											textStyle: {
												color: "rgba(255,255,255,.6)",
												fontSize:10,
											},
										},

									splitLine: {
										lineStyle: {
											 color: 'rgba(255,255,255,.1)'
										}
									}
								}],
						 series: [
							 {
							 name: '通道1',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {
								 normal: {
									 color: 'rgba(31, 174, 234, 1)',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(31, 174, 234, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(31, 174, 234, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#1f7eea',
									 borderColor: 'rgba(31, 174, 234, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max1']

						 },
					 {
							 name: '通道2',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#ffeb7b',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#ffeb7b',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max2']

						 },
						 	 {
							 name: '通道3',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#2ada27',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#2ada27',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max3']

						 },
						 {
							 name: '通道4',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#9251e8',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#9251e8',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max4']

						 },
						 {
							 name: '通道5',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#e4361b',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#e4361b',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max5']

						 },
						 {
							 name: '通道6',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#e8933b',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#e8933b',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max6']

						 },
						 {
							 name: '通道7',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#e045cd',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#e045cd',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max7']

						 },
						 {
							 name: '通道8',
							 type: 'line',
						   smooth: true,
							 symbol: 'circle',
							 symbolSize: 5,
							 showSymbol: false,
							 lineStyle: {

								 normal: {
									 color: '#0f2385',
									 width: 2
								 }
							 },
							 areaStyle: {
								 normal: {
									 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										 offset: 0,
										 color: 'rgba(107, 221, 155, 0.4)'
									 }, {
										 offset: 0.8,
										 color: 'rgba(107, 221, 155, 0.1)'
									 }], false),
									 shadowColor: 'rgba(0, 0, 0, 0.1)',
								 }
							 },
								 itemStyle: {
								 normal: {
									 color: '#0f2385',
									 borderColor: 'rgba(107, 221, 155, .1)',
									 borderWidth: 5
								 }
							 },
							 data: data['max8']

						 },
							  ]

					 };
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
		            }
		})

    }

function echarts_c1() {
        var myChart1 = echarts.init(document.getElementById('echart_c11'));
		var myChart2 = echarts.init(document.getElementById('echart_c12'));
        $.ajax({
                url:'/c1',
                success:function (data) {
					$("#safeCount_all").html(data.safeCount_all)
					$("#dangerCount_all").html(data.dangerCount_all)
					
					var option1 = {
							title: {
								text: '安全率',
								x: 'center',
								y: 'bottom',
								textStyle: {
									fontWeight: 'bold',
									color: 'rgb(255,255,255,0.7)',
									fontSize: '16',
								},
								padding:[0,0,15,0]  // 上右下左
							},
							color: ['rgba(176, 212, 251, .1)'], 
							series: [{
								type: 'pie',
								clockWise: true,
								radius: ['35%', '45%'],
								center:['50%', '30%'],
								itemStyle: {
									normal: {
										label: {show: false},
										labelLine: {show: false},
									}
								},
								hoverAnimation: false, 
								data: [
									{
									value: data['safeCount_all'],
									itemStyle: {
										normal: {
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#00cefc' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#367bec' // 100% 处的颜色
												}]
											},
											labelLine: {show: false}
										} 
									  },
									  
									label: {
										normal: {
											show: true,
											position: 'center',
											color:'#0580f2',
											formatter: data['safe_rate'],
											fontSize: '12',
										},
										emphasis: {//中间文字显示
											show: true,
										}
									  },						  
									}, 
									{
										value: data['safe_target'] - data['safeCount_all'],
									}]
					
							}]
						}

					var option2 = {
							title: {
								text: '危险率',
								x: 'center',
								y: 'bottom',
								textStyle: {
									fontWeight: 'bold',
									color: 'rgb(255,255,255,0.7)',
									fontSize: '16',
								},
								padding:[0,0,15,0]  // 上右下左
							},
							color: ['rgba(176, 212, 251, .1)'], 
							series: [{
								type: 'pie',
								clockWise: true,
								radius: ['35%', '45%'],
								center:['50%', '30%'],
								itemStyle: {
									normal: {
										label: {show: false},
										labelLine: {show: false},
									}
								},
								hoverAnimation: false, 
								data: [
									{
									value: data['dangerCount_all'],
									itemStyle: {
										normal: {
											color: { // 完成的圆环的颜色
												colorStops: [{
													offset: 0,
													color: '#00cefc' // 0% 处的颜色
												}, {
													offset: 1,
													color: '#367bec' // 100% 处的颜色
												}]
											},
											labelLine: {show: false}
										} 
									  },
									  
									label: {
										normal: {
											show: true,
											position: 'center',
											color:'#0580f2',
											formatter: data['danger_rate'],
											fontSize: '12',
										},
										emphasis: {//中间文字显示
											show: true,
										}
									  },						  
									}, 
									{
										value: data['danger_target'] - data['dangerCount_all'],
									}]
					
							}]
						}
					
					myChart1.setOption(option1);
					myChart2.setOption(option2);
					window.addEventListener("resize",function(){
						myChart1.resize();
						myChart2.resize();
					});
				    }
		})
		
		
    }

function echarts_r1() {
		var chartDom = document.getElementById('echart_r1');
		var myChart = echarts.init(chartDom);
		$.ajax({
                url:'/r1',
                success:function (data) {
                    // data=JSON.parse(data)
				var option;

				option = {
			tooltip: {
			formatter: '{a} <br/>{b} : {c}%'
			},
			series: [
			{
			  name: 'Pressure',
			  type: 'gauge',
				color:'#f50404',
				 radius:'100%',
			  progress: {

				show: true
			  },
				axisLabel: {
				  show: true,
				  textStyle: {
					color: '#fff'
				  }
				},

			  detail: {
			  	color: 'auto',
				valueAnimation: true,
				formatter: '{value}',
				  color:'#f50404',
				fontSize:15,
			  },
			  data: [
				{
				  value: data['m'],
					fontSize:12,
				}
			  ]
			}
			]
			};
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
			}
		})

option && myChart.setOption(option);

}

function echarts_r21() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r21'));

        $.ajax({
                url:'/r21',
                success:function (data) {
                    // data=JSON.parse(data)
				var option = {
				 grid: {
				   top: '0%',
				   bottom: '10%',
				   left:'37%',
				 },

				 yAxis: {
				   data: data['采集仪位置'],
				   axisLine: {
					 show: false,
					 lineStyle: {
					   color: "rgba(255,255,255,0.7)",
					 }
				   },
				   axisTick: {
					 show: false
				   },
				   axisLabel: {
					 interval: 0,
					 fontSize: 11,
					   // rotate:"45"
				   }
				 },
				 xAxis: [
					   {show: false}
				 ],
				 series: [
				   {
					 type: "bar",
					 barWidth: "40%",
					 barGap: 5,
					 itemStyle: {
					   normal: {
						 color: new echarts.graphic.LinearGradient(1, 0, 0, 0,
						   [
							 {
							   offset: 0,
							   color: "#00fecc"
							 },
							 {
							   offset: 0.8,
							   color: "#2690cf"
							 }
						   ],
						   false
						 ),
					   },
					 },
					label: {
					  normal: {
						  show: true,
						  fontSize: 8,
						  fontWeight: 'normal',
						  color: '#ffffff',
						  position: 'right',
					  }
					},
					 data:data['安全次数']
				   },

				 ]
			   };
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
			}
		})	
    }

function echarts_r22() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart_r22'));
        $.ajax({
                url:'/r22',
                success:function (data) {
                    // data=JSON.parse(data)
					var option = {
				 grid: {
				   top: '0%',
				   bottom: '10%',
				   left:'44%',
				 },

				 yAxis: {

				   data: data['采集仪位置'],
				   axisLine: {
					 show: false,
					 lineStyle: {
					   color: "rgba(255,255,255,0.7)",
					 }
				   },
				   axisTick: {
					 show: false
				   },
				   axisLabel: {
					 interval: 0,
					 fontSize: 11
				   }
				 },
				 xAxis: [
					   {show: false}
				 ],
				 series: [
				   {
					 type: "bar",
					 barWidth: "40%",
					 barGap: 5,
					 itemStyle: {

					   normal: {
						 color: new echarts.graphic.LinearGradient(1, 0, 0, 0,
						   [
							 {
							   offset: 0,
							   color: "yellow"
							 },
							 {
							   offset: 0.8,
							   color: "red"
							 }
						   ],
						   false
						 ),
					   },
					 },
					label: {
					  normal: {
						  show: true,
						  fontSize: 9,
						  fontWeight: 'normal',
						  color: '#ffffff',
						  position: 'right',
					  }
					},
					 data:data['危险次数']
				   },

				 ]
			   };

				myChart.setOption(option);
				window.addEventListener("resize",function(){
					myChart.resize();
				});
		
			}
		})	
		
    }

function echarts_r3() {
        var myChart = echarts.init(document.getElementById('echart_r3'));
        $.ajax({
                url:'/r3',
                success:function (data) {
                    // data=JSON.parse(data)
					
					var option = {
                          tooltip: {
                            trigger: 'item'
                          },
                          legend: {
                                right: '1%',
                                top: '5%',
                              orient: 'vertical',
                              textStyle: {
                                  fontSize: 12,
                                  color:'#fff',
                              },
                          },
                          series: [
                            {
                              name: "Today's news",
                              type: 'pie',
                              radius: ['55%', '85%'],
                              center:['30%','50%'],
                              avoidLabelOverlap: false,
                              itemStyle: {
                                borderRadius: 5,
                                borderColor: '#fff',
                                borderWidth: 5
                              },
                              label: {
                                show: false,
                                position: 'center'
                              },
                              emphasis: {
                                label: {
                                  show: true,
                                  fontSize: '10',
                                  fontWeight: 'bold'
                                }
                              },
                              labelLine: {
                                show: false
                              },
                              data: [
                                { value: data.location1, name: 'ZK216+823' },
                                { value: data.location2, name: 'YK219+688.4' },
                                { value: data.location3, name: 'YK219+684.2' },
                                { value: data.location4, name: 'YK219+690.8' },
                                { value: data.location5, name: 'YK219+692' }
                              ]
                            }
                          ]
                        };
					// 使用刚指定的配置项和数据显示图表。
					myChart.setOption(option);
					window.addEventListener("resize",function(){
						myChart.resize();
					});
				}
				})
			}
})



		
		
		


		









