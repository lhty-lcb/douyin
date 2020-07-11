var bigBox = document.createElement('div');
bigBox.setAttribute('id', 'bigBox');
bigBox.innerHTML = `<div>
        <!-- 后面的遮罩层 -->
        <span
            style="display: block;width: 100%; height: 100%; background-color: gray; opacity: .7;position: fixed; top: 0; left: 0; z-index: 10000;">
        </span>
        <!-- 功能区 -->
        <div id="tool" style="position: fixed; top: 0; left: 200px; background-color:#eee; width: 600px; height: 400px; z-index: 100000;">
            <h1 style="text-align: center;margin-top: 50px;">抖音视频状态改变</h1>
            <!-- 视频状态 -->
            <div style="margin: 10px auto 0;width: 270px;">
                <label style="float: left;">请选择改变后的状态：</label>
                <select
                    style="outline: none; font-size: 14px; padding-bottom: 5px;background-color: royalblue;color: white;"
                    id="statusCode">
                    <option value="0" style="color: white;">公开</option>
                    <option value="1" selected style="color: white;">自己可见</option>
                    <option value="2" style="color: white;">仅好友可见</option>
                </select>
            </div>
            <!-- 选择时间段 -->
            <div style="width: 530px; margin: 10px auto 0;">
                <p style="text-align: center;margin-bottom: 5px;">请选择要改变的时间</p>
                <label for="">开始</label>
                <select id="timerYear1" style="outline: none;width: 85px;height: 22px;">
                </select>
                <select id="timerMonth1" style="outline: none;width: 57px;height: 22px;">
                </select>
                <select id="timerDay1" style="outline: none; width: 57px;height: 22px;">
                </select>
                <span>——</span>
                <select id="timerYear2" style="outline: none;width: 85px;height: 22px;">
                </select>
                <select id="timerMonth2" style="outline: none;width: 57px;height: 22px;">
                </select>
                <select id="timerDay2" style="outline: none;width: 57px;height: 22px;">
                </select>
                <label for="">结束</label>
            </div>
            <!-- 改变的视频的播放范围 -->
            <div style="margin: 10px auto 0; width: 260px;text-align: center;">
                <p style="text-align: center;">要改变的视频播放范围（默认全部）</p>
                <input autocomplete="off"  type="text" style="width: 104px; outline: none;display: inline-block;" value="0" id="number">
                <select id="dir" style="height: 22px; outline: none;display: inline-block;">
                    <option value="up">以上</option>
                    <option value="down">以下</option>
                </select>
            </div>
            <!-- 开始执行按钮 -->
            <div>
                <input type="button" value="开始执行"
                    style="width: 200px; height: 50px;font-size: 26px; margin: 20px auto 0; display: block; background-color: #5cb85c; border: #4cae4c; cursor: pointer;outline: none;border-radius: 30px;line-height: 50px;color: #fff;"
                    id="btn">
            </div>
            <!-- 取消按钮 -->
            <div style="width: 400px; margin: 10px auto 0;">
                <input type="button" id="cancel" value="取消"
                    style="float: right;width: 100px; height: 30px; background-color: #d9534f; border: #d43f3a; border-radius: 10px;cursor: pointer;outline: none;color: white;line-height: 30px;font-size: 18px;">
            </div>
        </div>
    </div>`
var body = document.getElementsByTagName('body')[0];
body.appendChild(bigBox);
// 开始的年
var timerYear1 = document.getElementById('timerYear1');
// 开始的月
var timerMonth1 = document.getElementById('timerMonth1');
// 开始的天
var timerDay1 = document.getElementById('timerDay1');
// 结束的年
var timerYear2 = document.getElementById('timerYear2');
// 结束的月
var timerMonth2 = document.getElementById('timerMonth2');
// 结束的天
var timerDay2 = document.getElementById('timerDay2');
// 状态码
var statusCode = document.getElementById('statusCode');
// 播放范围
var number = document.getElementById('number');
// 查找方向
var dir = document.getElementById('dir');
// 开始按钮
var btn = document.getElementById('btn');
// 取消按钮
var cancel = document.getElementById('cancel');
// 要填充的年
var year = '';
// 要填充的月
var month = '';
// 要填充的天
var day = '';
// 判断开始是否是闰年
var year1Run = true;
// 判断结束是否是闰年
var year2Run = true;
// 获取控件
var tool = document.getElementById('tool');
// 控件的高度
var topOff = (document.documentElement.clientHeight - 400) / 2;
// 控件左边距
var leftOff = (document.documentElement.clientWidth - 600) / 2;
tool.style.left = leftOff + 'px';
tool.style.top = topOff + 'px';

window.onresize = function () {
    // 控件的高度
    var topOff = (document.documentElement.clientHeight - 400) / 2;
    // 控件左边距
    var leftOff = (document.documentElement.clientWidth - 600) / 2;
    tool.style.left = leftOff + 'px';
    tool.style.top = topOff + 'px';
}

for (var i = 2010; i < 2036; i++) {
    if (i != 2020) {
        year += "<option value=" + i + ">" + i + "年</option>";
    } else {
        year += "<option value=" + i + " selected>" + i + "年</option>";
    }
}
for (var i = 1; i < 13; i++) {
    month += "<option value=" + i + ">" + i + "月</option>";
}
for (var i = 1; i <= 31; i++) {
    day += "<option value=" + i + ">" + i + "日</option>";
}
timerYear1.innerHTML = year;
timerYear2.innerHTML = year;
timerMonth1.innerHTML = month;
timerMonth2.innerHTML = month;
timerDay1.innerHTML = day;
timerDay2.innerHTML = day;
// 判断是否是闰年
var checkYear = function (year, val) {
    if (year == 1) {
        if ((val % 4 == 0 && val % 100 != 0) || val % 400 == 0) {
            year1Run = true;
        } else {
            year1Run = false;
        }
    } else {
        if ((val % 4 == 0 && val % 100 != 0) || val % 400 == 0) {
            year2Run = true;
        } else {
            year2Run = false;
        }
    }
}
// 添加判断是多少天
var addDay = function (month) {
    var day = 0;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            day = 31; break;
        case 4:
        case 6:
        case 9:
        case 11:
            day = 30; break;
        case 2: day = 28; break;
    }
    return day;
}
// 年份1改变
timerYear1.onchange = function () {
    checkYear(1, this.value);
    timerMonth1.innerHTML = month;
    for (var i = 1; i <= 31; i++) {
        day += "<option value=" + i + ">" + i + "日</option>";
    }
    timerDay1.innerHTML = day;
}
// 年份2改变
timerYear2.onchange = function () {
    checkYear(2, this.value);
    timerMonth2.innerHTML = month;
    for (var i = 1; i <= 31; i++) {
        day += "<option value=" + i + ">" + i + "日</option>";
    }
    timerDay2.innerHTML = day;
}
// 月份1改变
timerMonth1.onchange = function () {
    var dayNum = addDay(parseInt(this.value));
    if (this.value == 2 && year1Run) {
        dayNum++;
    }
    day = '';
    for (var i = 1; i <= dayNum; i++) {
        day += "<option value=" + i + ">" + i + "日</option>";
    }
    timerDay1.innerHTML = day;
}
// 月份2改变
timerMonth2.onchange = function () {
    var dayNum = addDay(parseInt(this.value));
    if (this.value == 2 && year2Run) {
        dayNum++;
    }
    day = '';
    for (var i = 1; i <= dayNum; i++) {
        day += "<option value=" + i + ">" + i + "日</option>";
    }
    timerDay2.innerHTML = day;
}
// 鼠标进入执行按钮
btn.onmouseenter = function () {
    this.style.backgroundColor = '#449d44';
    this.style.border = '#398439';
}
// 鼠标移出执行按钮
btn.onmouseleave = function () {
    this.style.backgroundColor = '#5cb85c';
    this.style.border = '#4cae4c';
}
// 鼠标进入取消按钮
cancel.onmouseenter = function () {
    this.style.backgroundColor = '#c9302c';
    this.style.border = '#ac2925';
}
// 鼠标移出取消按钮
cancel.onmouseleave = function () {
    this.style.backgroundColor = '#d9534f';
    this.style.border = '#d43f3a';
}
// 开始执行
btn.onclick = function () {
    // 处理数据
    var timeFrom = parseInt(timerYear1.value + createZero(timerMonth1.value) + createZero(timerDay1.value));
    var timeTo = parseInt(timerYear2.value + createZero(timerMonth2.value) + createZero(timerDay2.value));
    if (timeFrom <= timeTo) {
        // 获取所有数据
        var obj = {
            timeFrom: timeFrom,
            timeTo: timeTo,
            statusCode: statusCode.value,
            number: parseInt(number.value),
            dir: dir.value
        }
        init(obj)
    } else {
        alert('开始时间不能大于结束时间');
    }
}
// 点击取消按钮
cancel.onclick = function () {
    var bigBox = document.getElementById('bigBox')
    body.removeChild(bigBox);
}
// 补零(补字符的零)
function createZero(n) {
    if (typeof n === "string") {
        if (n.length < 2) {
            return "0" + n
        }
        return n;
    } else {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    }
}
var init = function (obj) {
    var scrollTop = 0;
    var bigBox = document.getElementById('bigBox');
    body.removeChild(bigBox);
    var dsq = setInterval(function () {
        var more = document.getElementsByClassName('loading-text--2f5mJ')[0].innerText;
        if (more == '没有更多视频') {
            clearInterval(dsq);
            var csrf = getCookie(document.cookie, 'csrf_token')
            typeId = parseInt(obj.statusCode);
            var id = document.getElementsByClassName('video-card--1404D');
            var jiekouArr = [];
            for (var j in id[0]) {
                jiekouArr.push(j);
            }
            var jiekou = jiekouArr[0];
            var dataAll = [];
            for (var i = 0; i < id.length; i++) {
                var tempData = {};
                var date = new Date(id[i][jiekou].return.memoizedProps.data.create_time * 1000)
                var dateTime = date.toLocaleDateString();
                var s = dateTime.split('/');
                s = '' + createZero(s[0]) + createZero(s[1]) + createZero(s[2]);
                var d = id[i][jiekou].return.memoizedProps.data.statistics;
                tempData.createTime = parseInt(s);
                tempData.id = d.aweme_id
                tempData.comment = d.comment_count;
                tempData.like = d.digg_count;
                tempData.forward = d.forward_count;
                tempData.play = d.play_count;
                tempData.share = d.share_count;
                dataAll.push(tempData);
            }
            // 满足条件的arr数组
            var arr = [];
            // obj
            for (var i = 0; i < dataAll.length; i++) {
                // 查看时间是否符合要求
                if (dataAll[i].createTime >= obj.timeFrom && dataAll[i].createTime <= obj.timeTo) {
                    // 向上查找
                    if (obj.dir == 'up') {
                        if (dataAll[i].play >= obj.number) {
                            arr.push(dataAll[i]);
                        }
                    }
                    // 向下查找
                    else {
                        if (dataAll[i].play <= obj.number) {
                            arr.push(dataAll[i]);
                        }
                    }
                }
            }
            var sum = arr.length;
            var res = [0, 0];
            var timer = setInterval(() => {
                if ((res[0] + res[1]) == sum) {
                    clearInterval(timer);
                    var a = confirm('总共要改动：' + sum + '个，成功了：' + res[0] + '个，失败了：' + res[1] + '个，是否刷新？（刷新后才能看到改动）');
                    if (a) {
                        location.reload();
                    }
                }
            }, 16);
            for (var i = 0; i < arr.length; i++) {
                var url = 'https://creator.douyin.com/web/api/media/aweme/update';
                var str = 'item_id=' + arr[i].id + '&visibility_type=' + obj.statusCode;
                postSend(url, str, function (data) {
                    if (data) {
                        data = JSON.parse(data);
                        if (data.status_code == 0) {
                            res[0]++;
                        } else {
                            res[1]++;
                        }
                    } else {
                        res[1]++;
                    }
                })
            }
            // 发送请求
            function postSend(url, str, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.setRequestHeader("Content-Type", "Application/x-www-form-urlencoded");
                xhr.setRequestHeader("x-csrf-token", csrf);
                xhr.send(str);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        callback(xhr.responseText);
                    }
                }
            }
            // 获取cookie
            function getCookie(cookie, key) {
                var arr = cookie.split("; ");
                for (var i = 0; i < arr.length; i++) {
                    var s = arr[i].split("=");
                    if (s[0] == key) {
                        return s[1];
                    }
                }
                return false;
            }
        } else {
            document.documentElement.scrollTop += 50;
        }
    }, 160);
}