var typeId = prompt('想把视频变成什么状态：公开：0；自己可见:1；仅好友可见:2', '请输入数字……');
if (typeId) {
    var inputDate = prompt('要改变状态的视频的发布时间，格式：xxxx-xx-xx/xxxx-xx-xx（如果写0/xxxx-xx-xx则表示将这个时间点以前的视频状态全部改变，xxxx-xx-xx/0同理，0/0表示所有视频，一定要按照格式写！一定要按照格式写！一定要按照格式写！）', '0/0');
    if (inputDate) {
        var scrollTop = 0;
        var int = setInterval(function () {
            var out = setTimeout(function () {
                clearInterval(int);
                inputDate = inputDate.split('/');
                var prevDate = parseInt(inputDate[0].replace(/-/g, ''));
                var nextDate = parseInt(inputDate[1].replace(/-/g, ''));
                if (nextDate == 0) {
                    nextDate = 99999999;
                }
                var csrf = getCookie(document.cookie, 'csrf_token')
                typeId = parseInt(typeId);
                if (typeId == 0 || typeId == 1 || typeId == 2) {
                    var id = document.getElementsByClassName('content-body--29zhI')[0];
                    var jiekou = [];
                    for (var data in id) {
                        jiekou.push(data);
                    }
                    var t = jiekou[0];
                    var c = id[t].alternate.memoizedProps.children;
                    var arr = [];
                    for (var i = 0; i < c.length; i++) {
                        var tem = {}
                        tem.id = c[i].key;
                        var time = c[i].props.data.create_time;
                        time *= 1000
                        var date = new Date(time)
                        var dateTime = date.toLocaleDateString()
                        tem.timeNum = parseInt(dateTime.replace(/\//g, ''));
                        tem.time = dateTime;
                        arr.push(tem);
                    }
                    var sum = 0
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].timeNum <= nextDate && arr[i].timeNum >= prevDate) {
                            sum++;
                        }
                    }
                    var count = 0;
                    var res = [0, 0];
                    var timer = setInterval(() => {
                        if (count == sum) {
                            clearInterval(timer);
                            var a = confirm('总共要改动：' + sum + '个，成功了：' + res[0] + '个，失败了：' + res[1] + '个，是否刷新？（刷新后才能看到改动）');
                            if (a) {
                                location.reload();

                            }
                        }
                    }, 16);

                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].timeNum <= nextDate && arr[i].timeNum >= prevDate) {
                            var url = 'https://creator.douyin.com/web/api/media/aweme/update';
                            var str = 'item_id=' + arr[i].id + '&visibility_type=' + typeId;
                            postSend(url, str, function (data) {
                                if (data) {
                                    data = JSON.parse(data);
                                    if (data.status_code == 0) {
                                        res[0]++;
                                        count++;
                                    } else {
                                        res[1]++;
                                        count++;
                                    }
                                } else {
                                    res[1]++;
                                    count++;
                                }
                            })
                        }
                    }
                }
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
            }, 3000)
            scrollTop = document.documentElement.scrollTop;
            document.documentElement.scrollTop += 50;
            if (scrollTop != document.documentElement.scrollTop) {
                clearTimeout(out)
            }
        }, 16);
    }
}