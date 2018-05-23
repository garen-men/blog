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
        containerBox = document.querySelector(".site-header>.container>.header-nav"),
        dataList = null;
    containerList = [...containerList];
    let querydata = (function () {
        let xhr = new XMLHttpRequest;
        xhr.open('get', 'json/data2.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                dataList = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    })();
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

    })
    containerBox.onmouseleave = function () {
        containerDiv.innerHTML = null;
    }
})();

/*写个倒计时来*/
(function () {
    let leftHour = document.querySelectorAll('.flashTime>.box')[0],
        leftMin = document.querySelectorAll('.flashTime>.box')[1],
        leftSen = document.querySelectorAll('.flashTime>.box')[2];
    let trickMonkey = setInterval(() => {
        let curDate = new Date();
        let timeTitle = document.querySelector('.countdown>.time-title');
        timeTi = parseFloat(timeTitle.innerText);
        let curYear = curDate.getFullYear();
        let curMon = curDate.getMonth();
        let curDay = curDate.getDate();
        let lastTime = new Date(curYear, curMon, curDay, timeTi, 0, 0);
        let leftTime = lastTime - curDate;
        leftHour.innerText = parseInt(leftTime / 3600000);
        leftMin.innerText = parseInt((leftTime - leftHour.innerText * 3600000) / 60000);
        leftSen.innerText = parseInt((leftTime - leftHour.innerText * 3600000 - leftMin.innerText * 60000) / 1000);
        leftHour.innerText<10?leftHour.innerText=0+leftHour.innerText:null;
        leftMin.innerText<10?leftMin.innerText=0+leftMin.innerText:null;
        leftSen.innerText<10?leftSen.innerText=0+leftSen.innerText:null;
        if (leftTime <= 0) {
            timeTitle.innerText = ("抢购开始");
            leftHour.innerText = ('00');
            leftMin.innerText = ('00');
            leftSen.innerText = ('00');
            clearInterval(trickMonkey);
        }
    }, 1000);
})();

/*接下来封装渐隐渐显轮播图插件*/
