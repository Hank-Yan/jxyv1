/**
 * Created by ×ÞÊ¿½Ü on 2015/12/22.
 */
define(function(require, exports, module){
    require("jQuery");
    require("commonFun");
var teacher = {
    init: function(){
    	$(function() {
        var frame = window.parent.document.getElementById("pageframe");
        // $(frame).height($(".t-worklist").height() + 100);
	    });
	    $(".caiji").click(function() {
	        location.href = "homeworkCollect.html";//2015-12-28 15:34:17
	    });
	    $(function() {
	        initJxjh();
	        initEventHandler();
	    });
	    function initJxjh() {
	        var param = getReqFilterParam();
	        // addToQueue("GetLessonFiter", param, loadLessonInfo, "", true);//报错注销 2015-12-22 12:37:16
	    }

	    function initEventHandler() {
	        //bindEventHandler($(".f-common"), filterClicked, "click", "click");
	        //bindEventHandler($(".muluitem"), unitClicked, "click", "click");
	    }

	    function loadLessonInfo(result, target) {
	        if (isValidArray(result)) {
	            var weekinfo = "";
	            for (var i = 0; i < result.length; i++) {
	                var list = result[i].ChildList;
	                switch (parseInt(result[i].Idx)) {
	                    case 1: //学段
	                        loadSelect(list,$(".periodsel"));
	                        break;
	                    case 2: //年级
	                        weekinfo += handleList(list);
	                        break;
	                    case 3: //学科
	                        weekinfo += handleList(list);
	                        loadSelect(list, $(".subjectsel"))
	                        break;
	                    case 4: //单元
	                        handleUnits(list, $(".datespan"), gap);
	                }
	            }
	            //$(".weeksubject").text(weekinfo);
	        }
	    }

	    $("select").change(function() {
	        var selPeriod = $(".periodsel").val(),
	        selSubject = $(".subjectsel").val();
	        updateLocal("speriod", selPeriod);
	        updateLocal("ssubject", selSubject);
	        initJxjh();
	        var page = $("#pageframe")[0].contentDocument;
	        if (page.URL.indexOf("Jxjh") > 0) {
	            page.location.reload();
	        }
	    });

	    function loadSelect(list, target) {
	        target.empty();
	        var localProp = "";
	        if (target.hasClass("periodsel")) {
	            localProp = "speriod";
	            selected = getLocalVal("speriod")
	        }
	        if (target.hasClass("subjectsel")) {
	            localProp = "ssubject";
	            selected = getLocalVal("ssubject");
	        }
	        if (isValidArray(list)) {
	            for (var i = 0; count = list.length, i < count; i++) {
	                var item = list[i], name = item.Name;
	                var prop = "";
	                if (selected == name) {
	                    updateLocal(localProp, name);
	                    prop = "selected";
	                }
	                var option = "<option value=" + name + " " + prop + ">" + name + "</option>";
	                target.append(option);
	            }
	        }
	    }

	    function handleList(list) {
	        if (isValidArray(list)) {
	            for (var i = 0; count = list.length, i < count; i++) {
	                if (list[i].Prop == "selected") {
	                    return list[i].Name;
	                    break;
	                }
	            }
	        }
	    }
	    var cacheUnits = new Array(),
	    gap = 1;
	    function handleUnits(list, target, gap) {
	        $(".weektitle").empty();
	        var name = "";
	        if (isValidArray(list)) {
	            for (var i = 0; count = list.length, i < count; i++) {
	                var childs = list[i].ChildList;
	                var ok = false;
	                name = list[i].Name + " -- ";
	                if (isValidArray(childs)) {
	                    for (var j = 0; count1 = childs.length, j < count1; j++) {
	                        var childName = childs[j].Name;
	                        if (j == gap) {
	                            ok = true;
	                            //name += childName;
	                            //target.text(name);
	                        }
	                        if (j <= 2 && i == 0) {
	                            //var div = "<div class='btnc' data-id=" + childs[j].Idx + ">" + childName + "</div>";
	                            //$(".weektitle").append(div);
	                        }
	                        cacheUnits.push(name + childName);
	                    }
	                    
	                }
	            }
	            for (var m = 0; count2 = cacheUnits.length, m < count2; m++) {
	                if (m == (gap - 1)) {
						var div = "<div class='btnc' style='font-size:14px;'>";
	                    div += "上一课时：";
	                    div += (cacheUnits[m].split(' -- ')[1]);
	                    div += "</div>";
	                    $(".weektitle").append(div);
	                }
	                if (gap == m) {
						var div = "<div class='btnc btnhigh'>";
	                    div += "当前课时：";
	                    div += (cacheUnits[m].split(' -- ')[1]);
	                    target.text(cacheUnits[m].split(' -- '));
	                    div += "</div>";
	                    $(".weektitle").append(div);
	                }
	                if (m == (gap + 1)) {
						var div = "<div class='btnc' style='font-size:14px;'>";
	                    div += "下一课时：";
	                    div += (cacheUnits[m].split(' -- ')[1]);
	                    div += "</div>";
	                    $(".weektitle").append(div);
	                }
	            }
	        }
	        
	    }

	    function getReqFilterParam() {
	        var unitidx = 0;
	        unitidx = $(".muluhigh").length == 0 ? 0 : $(".muluhigh").attr("data-id");
	        var param = {
	            period: getLocalVal("speriod")
	             , term: getLocalVal("sterm")
	             , subject: getLocalVal("ssubject")
	             , uidx: unitidx
	        };
	        return param;
	    }
	    
	    function updateLocal(key, value) {
	        localStorage[key] = value;
	    }
	    
	    function getLocalVal(key) {
	        var value = (typeof localStorage[key] == "undefined" || localStorage[key] == "undefined") ? "" : localStorage[key];
	        return value;
    	}
        },
        navigation: function(){
	    	var className = {
        		"0":[
	        		"一元二次方程（1）",
	        		"一元二次方程（2）",
	        		"解一元二次方程（1）",
	        		"解一元二次方程（2）",
	        		"解决实际问题",
	        		"解一元二次方程（3）",
	        		"解一元二次方程（4）",
	        		"解一元二次方程（5）",
	        		"实际问题与一元二次方程",
	        		"一元多次方程"],
        		"1":[
        			"二次函数的图像和性质（1）",
        			"二次函数的图像和性质（2）",	
        			"二次函数的图像和性质（3）",	
        			"二次函数的图像和性质（4）",	
        			"二次函数的图像和性质（5）",	
        			"解决实际问题",	
        			"二次函数与一元二次方程",	
        			"实际问题与二次函数",	
        			"复习单元测 二次函数"]
        	};

        	$(".datebar div").click(function(){
        		$(this).css('border','3px solid #000');
        		$(this).siblings().css('border','none');
				var index = $(this).index();
				console.log(index);
				var preClassHtml = '上一课时：'+ className['0'][index];
				var curClassHtml = '当前课时：'+ className['0'][index+1];
				var nextClassHtml = '下一课时：' + className['0'][index+2];
				$(".weektitle .btnc").eq(0).html(preClassHtml);
				$(".weektitle .btnc.btnhigh").html(curClassHtml);
				$(".weektitle .btnc").eq(2).html(nextClassHtml);
			});
        }
    };
    teacher.init();
    teacher.navigation();
})