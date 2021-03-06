$(document).ready(function() {
    var incomeArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
    var outcomeArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
    var date=new Date;
    var year = date.getFullYear();
    year = year-1;
    var month = date.getMonth()+1;
    var endTime = (year+1) +"-"+ month +"-31";
    var startTime;
    if(month==12)startTime = (year+1) +"-01-01";
    else startTime = year+ "-" + (month+1) + "-01";

    $.ajax({
        type: "get",
        url: "/incomes/calculate?beginTime="+startTime+"&endTime="+endTime,
        dataType: "json",
        success: function(data) {
            var list = data.incomeList;
            $.each(list,function(i,p){
                incomeArray[i] += p;
            });
        }
    })

    $.ajax({
        type: "get",
        url: "/outcomes/calculate?beginTime="+startTime+"&endTime="+endTime,
        dataType: "json",
        success: function(data) {
            var list = data.outcomeList;
            $.each(list,function(i,p){
                outcomeArray[i] += p;
            });
        }
    })

    $.ajax({
        type: "get",
        url: "/outcomes/calculate?beginTime="+startTime+"&endTime="+endTime,
        dataType: "json",
        success: function(data) {

            var dataArr = new Array(12);//总额
            var dataArr_1 = new Array(12);//进项
            var dataArr_2 = new Array(12);//销项
            for (var i = 0;i <=11; i++) {
                dataArr[i] = outcomeArray[i]-incomeArray[i];
            }

            var myChart2 = echarts.init(document.getElementById('baobiao2'));
            var xData = function () {
                var data = [];
                for (var i = 11;i >=0; i--) {
                    if(((month-i)+12)%12!=0) data.push(((month-i)+12)%12+ "月份");
                    else data.push(12+ "月份");
                }
                return data;
            }()
            option2 = {
                title: {
                    text: '下一年利润预测表（金额/万元）'
                },
                tooltip: {},
                legend: {
                    data: ['进项', '销项','利润']
                },
                xAxis: {
                    data: xData
                },
                yAxis: {},
                series: [{
                    name: '进项',
                    type: 'bar',
                    data: incomeArray,
                }, {
                    name: '销项',
                    type: 'bar',
                    data: outcomeArray,
                },
                    {
                        name:'利润',
                        type:'line',
                        data:dataArr
                    }]
            };
            myChart2.hideLoading();
            myChart2.setOption(option2);
        }
    })


    //获取下拉菜单选项
    $.ajax({
        type: "POST",
        url: "/incomes/types",
        dataType: "json",
        success: function(data) {
            var sites = data.types;
            $.each(sites,function(i,p){
                $content = $("select[name=type_form_income]");
                $content.empty();
                for (var i in sites ) {
                    $content.append("<option value="+sites[i]+">"+sites[i]+"</option>>")
                }
            });
        }
    });

    $.ajax({
        type: "POST",
        url: "/outcomes/types",
        dataType: "json",
        success: function(data) {
            var sites = data.types;
            $.each(sites,function(i,p){
                $content = $("select[name=type_form_outcome]");
                $content.empty();
                for (var i in sites ) {
                    $content.append("<option value="+sites[i]+">"+sites[i]+"</option>>")
                }
            });
        }
    });

    function Predict_income() {
        $.ajax({
            type: "get",
            url: "/incomes/calculate?beginTime="+startTime+"&endTime="+endTime+"&type="+ $("select[name=type_form_income]").val()+"&",
            dataType: "json",
            success: function(data) {
                incomeTypeArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
                var list = data.incomeList;
                $.each(list,function(i,p){
                    incomeTypeArray[i]+=p;
                });
            }
        })
        $.ajax({
            type: "get",
            url: "/incomes/calculate?beginTime="+startTime+"&endTime="+endTime,
            dataType: "json",
            success: function(data) {

                var dataArr_income = new Array(12);//进项
                for (var i = 0;i <=11;i++) {
                    dataArr_income[i]=incomeTypeArray[i];
                }


                var myChart_income = echarts.init(document.getElementById('baobiao_income'));
                var xData = function () {
                    var data = [];
                    for (var i = 11;i >=0; i--) {
                        if(((month-i)+12)%12!=0) data.push(((month-i)+12)%12+ "月份");
                        else data.push(12+ "月份");
                    }
                    return data;
                }()
                option_income = {
                    title: {
                        text: '下一年商品数量预测表（金额/万元）'
                    },
                    tooltip: {},
                    legend: {
                        data: ['进项']
                    },
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    series: [{
                        name: '进项',
                        type: 'bar',
                        data: dataArr_income,
                    }, {
                        name:'进项',
                        type:'line',
                        data:dataArr_income
                    }]
                };
                myChart_income.hideLoading();
                myChart_income.setOption(option_income);
            }
        })
    }
    function Predict_outcome() {
        $.ajax({
            type: "get",
            url: "/outcomes/calculate?beginTime="+startTime+"&endTime="+endTime+"&type="+ $("select[name=type_form_outcome]").val()+"&",
            dataType: "json",
            success: function(data) {
                outcomeTypeArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
                var list = data.outcomeList;
                $.each(list,function(i,p){
                    outcomeTypeArray[i]+=p;
                });
            }
        })
        $.ajax({
            type: "get",
            url: "/outcomes/calculate?beginTime="+startTime+"&endTime="+endTime,
            dataType: "json",
            success: function(data) {

                var dataArr_outcome = new Array(12);//进项
                for (var i = 0;i <=11; i++) {
                    dataArr_outcome[i] = outcomeTypeArray[i];
                }


                var myChart_outcome = echarts.init(document.getElementById('baobiao_outcome'));
                var xData = function () {
                    var data = [];
                    for (var i = 11;i >=0; i--) {
                        if(((month-i)+12)%12!=0) data.push(((month-i)+12)%12+ "月份");
                        else data.push(12+ "月份");
                    }
                    return data;
                }()
                option_outcome = {
                    title: {
                        text: '下一年商品数量预测表（金额/万元）'
                    },
                    tooltip: {},
                    legend: {
                        data: ['销项']
                    },
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    series: [{
                        name: '销项',
                        type: 'bar',
                        data: dataArr_outcome,
                    }, {
                        name:'销项',
                        type:'line',
                        data:dataArr_outcome
                    }]
                };
                myChart_outcome.hideLoading();
                myChart_outcome.setOption(option_outcome);
            }
        })
    }
    Predict_income();
    Predict_outcome();

    $("select[name=type_form_income]").on("change",function () {
        Predict_income();
    })

    $("select[name=type_form_outcome]").on("change",function () {
        Predict_outcome();
    })


})