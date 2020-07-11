"use strict";var bigBox=document.createElement("div");bigBox.setAttribute("id","bigBox"),bigBox.innerHTML='<div>\n        \x3c!-- 后面的遮罩层 --\x3e\n        <span\n            style="display: block;width: 100%; height: 100%; background-color: gray; opacity: .7;position: fixed; top: 0; left: 0; z-index: 10000;">\n        </span>\n        \x3c!-- 功能区 --\x3e\n        <div id="tool" style="position: fixed; top: 0; left: 200px; background-color:#eee; width: 600px; height: 400px; z-index: 100000;">\n            <h1 style="text-align: center;margin-top: 50px;">抖音视频状态改变</h1>\n            \x3c!-- 视频状态 --\x3e\n            <div style="margin: 10px auto 0;width: 270px;">\n                <label style="float: left;">请选择改变后的状态：</label>\n                <select\n                    style="outline: none; font-size: 14px; padding-bottom: 5px;background-color: royalblue;color: white;"\n                    id="statusCode">\n                    <option value="0" style="color: white;">公开</option>\n                    <option value="1" selected style="color: white;">自己可见</option>\n                    <option value="2" style="color: white;">仅好友可见</option>\n                </select>\n            </div>\n            \x3c!-- 选择时间段 --\x3e\n            <div style="width: 530px; margin: 10px auto 0;">\n                <p style="text-align: center;margin-bottom: 5px;">请选择要改变的时间</p>\n                <label for="">开始</label>\n                <select id="timerYear1" style="outline: none;width: 85px;height: 22px;">\n                </select>\n                <select id="timerMonth1" style="outline: none;width: 57px;height: 22px;">\n                </select>\n                <select id="timerDay1" style="outline: none; width: 57px;height: 22px;">\n                </select>\n                <span>——</span>\n                <select id="timerYear2" style="outline: none;width: 85px;height: 22px;">\n                </select>\n                <select id="timerMonth2" style="outline: none;width: 57px;height: 22px;">\n                </select>\n                <select id="timerDay2" style="outline: none;width: 57px;height: 22px;">\n                </select>\n                <label for="">结束</label>\n            </div>\n            \x3c!-- 改变的视频的播放范围 --\x3e\n            <div style="margin: 10px auto 0; width: 260px;text-align: center;">\n                <p style="text-align: center;">要改变的视频播放范围（默认全部）</p>\n                <input autocomplete="off"  type="text" style="width: 104px; outline: none;display: inline-block;" value="0" id="number">\n                <select id="dir" style="height: 22px; outline: none;display: inline-block;">\n                    <option value="up">以上</option>\n                    <option value="down">以下</option>\n                </select>\n            </div>\n            \x3c!-- 开始执行按钮 --\x3e\n            <div>\n                <input type="button" value="开始执行"\n                    style="width: 200px; height: 50px;font-size: 26px; margin: 20px auto 0; display: block; background-color: #5cb85c; border: #4cae4c; cursor: pointer;outline: none;border-radius: 30px;line-height: 50px;color: #fff;"\n                    id="btn">\n            </div>\n            \x3c!-- 取消按钮 --\x3e\n            <div style="width: 400px; margin: 10px auto 0;">\n                <input type="button" id="cancel" value="取消"\n                    style="float: right;width: 100px; height: 30px; background-color: #d9534f; border: #d43f3a; border-radius: 10px;cursor: pointer;outline: none;color: white;line-height: 30px;font-size: 18px;">\n            </div>\n        </div>\n    </div>';var body=document.getElementsByTagName("body")[0];body.appendChild(bigBox);var timerYear1=document.getElementById("timerYear1"),timerMonth1=document.getElementById("timerMonth1"),timerDay1=document.getElementById("timerDay1"),timerYear2=document.getElementById("timerYear2"),timerMonth2=document.getElementById("timerMonth2"),timerDay2=document.getElementById("timerDay2"),statusCode=document.getElementById("statusCode"),number=document.getElementById("number"),dir=document.getElementById("dir"),btn=document.getElementById("btn"),cancel=document.getElementById("cancel"),year="",month="",day="",year1Run=!0,year2Run=!0,tool=document.getElementById("tool"),topOff=(document.documentElement.clientHeight-400)/2,leftOff=(document.documentElement.clientWidth-600)/2;tool.style.left=leftOff+"px",tool.style.top=topOff+"px",window.onresize=function(){var e=(document.documentElement.clientHeight-400)/2,t=(document.documentElement.clientWidth-600)/2;tool.style.left=t+"px",tool.style.top=e+"px"};for(var i=2010;i<2036;i++)year+=2020!=i?"<option value="+i+">"+i+"年</option>":"<option value="+i+" selected>"+i+"年</option>";for(i=1;i<13;i++)month+="<option value="+i+">"+i+"月</option>";for(i=1;i<=31;i++)day+="<option value="+i+">"+i+"日</option>";timerYear1.innerHTML=year,timerYear2.innerHTML=year,timerMonth1.innerHTML=month,timerMonth2.innerHTML=month,timerDay1.innerHTML=day,timerDay2.innerHTML=day;var checkYear=function(e,t){1==e?year1Run=t%4==0&&t%100!=0||t%400==0:year2Run=t%4==0&&t%100!=0||t%400==0},addDay=function(e){var t=0;switch(e){case 1:case 3:case 5:case 7:case 8:case 10:case 12:t=31;break;case 4:case 6:case 9:case 11:t=30;break;case 2:t=28}return t};function createZero(e){return"string"==typeof e?e.length<2?"0"+e:e:e<10?"0"+e:e}timerYear1.onchange=function(){checkYear(1,this.value),timerMonth1.innerHTML=month;for(var e=1;e<=31;e++)day+="<option value="+e+">"+e+"日</option>";timerDay1.innerHTML=day},timerYear2.onchange=function(){checkYear(2,this.value),timerMonth2.innerHTML=month;for(var e=1;e<=31;e++)day+="<option value="+e+">"+e+"日</option>";timerDay2.innerHTML=day},timerMonth1.onchange=function(){var e=addDay(parseInt(this.value));2==this.value&&year1Run&&e++,day="";for(var t=1;t<=e;t++)day+="<option value="+t+">"+t+"日</option>";timerDay1.innerHTML=day},timerMonth2.onchange=function(){var e=addDay(parseInt(this.value));2==this.value&&year2Run&&e++,day="";for(var t=1;t<=e;t++)day+="<option value="+t+">"+t+"日</option>";timerDay2.innerHTML=day},btn.onmouseenter=function(){this.style.backgroundColor="#449d44",this.style.border="#398439"},btn.onmouseleave=function(){this.style.backgroundColor="#5cb85c",this.style.border="#4cae4c"},cancel.onmouseenter=function(){this.style.backgroundColor="#c9302c",this.style.border="#ac2925"},cancel.onmouseleave=function(){this.style.backgroundColor="#d9534f",this.style.border="#d43f3a"},btn.onclick=function(){var e=parseInt(timerYear1.value+createZero(timerMonth1.value)+createZero(timerDay1.value)),t=parseInt(timerYear2.value+createZero(timerMonth2.value)+createZero(timerDay2.value));if(e<=t){var n={timeFrom:e,timeTo:t,statusCode:statusCode.value,number:parseInt(number.value),dir:dir.value};init(n)}else alert("开始时间不能大于结束时间")},cancel.onclick=function(){var e=document.getElementById("bigBox");body.removeChild(e)};var init=function(h){var e=document.getElementById("bigBox");body.removeChild(e);var v=setInterval(function(){if("没有更多视频"==document.getElementsByClassName("loading-text--2f5mJ")[0].innerText){var e=function(e,t,n){var o=new XMLHttpRequest;o.open("post",e),o.setRequestHeader("Content-Type","Application/x-www-form-urlencoded"),o.setRequestHeader("x-csrf-token",i),o.send(t),o.onreadystatechange=function(){4==o.readyState&&200==o.status&&n(o.responseText)}};clearInterval(v);var i=function(e,t){for(var n=e.split("; "),o=0;o<n.length;o++){var i=n[o].split("=");if(i[0]==t)return i[1]}return!1}(document.cookie,"csrf_token");typeId=parseInt(h.statusCode);var t=document.getElementsByClassName("video-card--1404D"),n=[];for(var o in t[0])n.push(o);for(var r=n[0],a=[],l=0;l<t.length;l++){var c={},d=new Date(1e3*t[l][r].return.memoizedProps.data.create_time).toLocaleDateString().split("/");d=""+createZero(d[0])+createZero(d[1])+createZero(d[2]);var s=t[l][r].return.memoizedProps.data.statistics;c.createTime=parseInt(d),c.id=s.aweme_id,c.comment=s.comment_count,c.like=s.digg_count,c.forward=s.forward_count,c.play=s.play_count,c.share=s.share_count,a.push(c)}var u=[];for(l=0;l<a.length;l++)a[l].createTime>=h.timeFrom&&a[l].createTime<=h.timeTo&&("up"==h.dir?a[l].play>=h.number&&u.push(a[l]):a[l].play<=h.number&&u.push(a[l]));var m=u.length,p=[0,0],y=setInterval(function(){p[0]+p[1]==m&&(clearInterval(y),confirm("总共要改动："+m+"个，成功了："+p[0]+"个，失败了："+p[1]+"个，是否刷新？（刷新后才能看到改动）")&&location.reload())},16);for(l=0;l<u.length;l++){e("https://creator.douyin.com/web/api/media/aweme/update","item_id="+u[l].id+"&visibility_type="+h.statusCode,function(e){e&&0==(e=JSON.parse(e)).status_code?p[0]++:p[1]++})}}else document.documentElement.scrollTop+=50},16)};