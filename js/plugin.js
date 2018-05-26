/*获取数据方法,暴露在全局中*/
let queryData = function () {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/data2.json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 2) {
                window.serverTime = new Date(xhr.getResponseHeader('date'));
            }
            if (xhr.readyState === 4 && xhr.status === 200) {
                let dataList = JSON.parse(xhr.responseText);
                resolve(dataList);
            }
        };
        xhr.send(null);
    })
},
    promise=queryData();

/*开胃菜:高度隐现回到顶部按钮*/
(function () {
    let isRun = false;
    let barTotop = document.getElementById('barTotop');
    window.onscroll = function () {
        if (isRun) {
            return;
        }
        if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
            barTotop.style['display'] = 'block';
            isRun = true;
        }
    }
})();

/*2部分 js下拉添加内容 想了想还是不采用事件委托了*/
(function () {
    let containerDiv = document.querySelector(".site-header>.container>.header-nav>ul .nav-after"),
        containerList = document.querySelectorAll(".site-header>.container>.header-nav>ul>.true"),
        containerBox = document.querySelector(".site-header>.container>.header-nav");
    containerList = [...containerList];
    promise.then(function (dataList) {
        containerList.forEach((curA, index) => {
            let curdata = null;
            curA.onmouseenter = function () {
                containerDiv.innerHTML = null;
                for (let i = 0; i < dataList[index].length; i++) {
                    curdata = dataList[index][i];
                    let {mark, src, price, name} = curdata;
                    containerDiv.innerHTML += `<li class="detail"><span class="mark">${mark}</span><a href="javascript:;"><img src="${src}" alt=""><span class="name">${name}</span></a><span class="price">${price}</span></li>`
                }
            };

        });
        containerBox.onmouseleave = function () {
            containerDiv.innerHTML = null;
        };
    })

})();

/*倒计时基于服务器,至于那个获取服务器时间,巧妙地利用了前一个js获取json*/
(function () {
    let leftHour = document.querySelectorAll('.flashTime>.box')[0],
        leftMin = document.querySelectorAll('.flashTime>.box')[1],
        leftSen = document.querySelectorAll('.flashTime>.box')[2];
    promise.then(function(){
    let curDate = serverTime,
        curYear = curDate.getFullYear(),
        curMon = curDate.getMonth(),
        curDay = curDate.getDate(),
        timeTitle = document.querySelector('.countdown>.time-title'),
        timeTi = parseFloat(timeTitle.innerText),
        lastTime = new Date(curYear, curMon, curDay, timeTi, 0, 0),
        leftTime = lastTime - curDate;
    let trickMonkey = setInterval(() => {
        leftTime = leftTime - 1000;
        leftHour.innerText = parseInt(leftTime / 3600000);
        leftMin.innerText = parseInt((leftTime - leftHour.innerText * 3600000) / 60000);
        leftSen.innerText = parseInt((leftTime - leftHour.innerText * 3600000 - leftMin.innerText * 60000) / 1000);
        leftHour.innerText < 10 ? leftHour.innerText = 0 + leftHour.innerText : null;
        leftMin.innerText < 10 ? leftMin.innerText = 0 + leftMin.innerText : null;
        leftSen.innerText < 10 ? leftSen.innerText = 0 + leftSen.innerText : null;
        if (leftTime <= 0) {
            timeTitle.innerText = ("抢购开始");
            leftHour.innerText = ('--');
            leftMin.innerText = ('--');
            leftSen.innerText = ('--');
            clearInterval(trickMonkey);
        }
    }, 1000);
})
})();

/*底下彩虹小轮播*/
(function () {
    let leftBu = document.querySelectorAll('.more>a')[0],
        rightBu = document.querySelectorAll('.more>a')[1],
        wrapperBox = document.querySelector('.home-container > .flashPurchase .wrapper .purchase');
    leftBu.onclick = function () {
        leftBu.className = "control-prev control iconfont";
        rightBu.className = "control-prev iconfont";
        wrapperBox.style['margin-left'] = '0';

    };
    rightBu.onclick = function () {
        leftBu.className = "control-prev iconfont";
        rightBu.className = "control-prev control iconfont";
        wrapperBox.style['margin-left'] = '-248px';
    };
})();

/*接下来封装渐隐渐显轮播图插件*/


/*写一个左侧导航,其实是一样的,早知道的封装插件了*/

