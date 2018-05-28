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
    let queryData = function () {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest;
                xhr.open('get', 'json/data2.json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let dataList = JSON.parse(xhr.responseText);
                        resolve(dataList);
                    }
                };
                xhr.send(null);
            })
        },
        promise = queryData();
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

/*倒计时基于服务器,获取服务器时间*/
(function () {
    let leftHour = document.querySelectorAll('.flashTime>.box')[0],
        leftMin = document.querySelectorAll('.flashTime>.box')[1],
        leftSen = document.querySelectorAll('.flashTime>.box')[2];
    let queryData = function () {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest;
                xhr.open('head', 'json/data2.json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 2) {
                        let serverTime = new Date(xhr.getResponseHeader('date'));
                        resolve(serverTime);
                    }
                };
                xhr.send(null);
            })
        },
        promise = queryData();
    promise.then(function (serverTime) {
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


/*写一个左侧导航,其实是一样的,就用事件委托吧*/
(function () {
    let navBox = document.querySelector(".home-container > .home-hero > .home-slider > .nav-list > .nav-box"),
        navList = document.querySelectorAll(".home-container > .home-hero > .home-slider > .nav-list > a"),
        navCon = document.querySelector(".home-container > .home-hero > .home-slider > .nav-list ");

    let queryData = function () {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest;
                xhr.open('get', 'json/data.json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let dataList = JSON.parse(xhr.responseText);
                        resolve(dataList);
                    }
                };
                xhr.send(null);
            })
        },
        promise = queryData();

    promise.then((dataList) => {
        let bindHTML = function (index) {
            let str = "";
            for (let i = 0; i < dataList[index].length; i++) {
                let {src, name} = dataList[index][i];
                str += `<li><img src="${src}"><span>${name}</span></li>`;
            }
            navBox.innerHTML = str;
            navBox.style['width']=(Math.ceil(dataList[index].length/6))*265+'px';
            Math.ceil(dataList[index].length/6)>=4?navBox.style['width']='992px':null
            let navLi=navBox.querySelectorAll('li');

            navLi.forEach((curLi,index)=>{
                curLi.style['top']=(77*(index%6))+'px';
                curLi.style['left']=(Math.floor(index/6))*265+'px';
                Math.floor(index/6)===3? curLi.style['left']='780px':null;
            });
        };

        navCon.addEventListener('mouseover', function (ev) {
            navList.forEach((curA, index) => {
                let curLi=curA.querySelector('li');
                if (ev.target === curLi) {
                    bindHTML(index);
                }
            })
        });
    });


})();


/*接下来封装渐隐渐显轮播图插件 获取数据和绑定没封*/
~function () {
    class Banner {
        constructor(options = {}) {
            let {
                ele,
                isArrow = true,
                isFocus = true,
                isAuto = true,
                defaultIndex = 0,
                interval = 3000,
                moveEnd
            } = options;
            ['ele',  'isArrow', 'isFocus', 'isAuto', 'defaultIndex', 'interval','moveEnd'].forEach(item => {
                this[item] = eval(item);
            });
            this.container = document.querySelector(ele);
            let _con = this.container;
            this.wrapper = _con.querySelector('.wrapper');
            this.focus = _con.querySelector('.focus');
            this.arrowLeft = _con.querySelector('.arrowLeft');
            this.arrowRight = _con.querySelector('.arrowRight');
            this.slideList = _con.querySelectorAll('.wrapper>.slide');
            this.focusList = _con.querySelectorAll('.focus>li');
            this.stepIndex = defaultIndex;
            this.laststepIndex = defaultIndex;
            this.autoTimer = null;
            this.init();
        }
        init() {
            let {isAuto, interval,slideList,stepIndex,focusList} = this;
             slideList[stepIndex].style['z-index']=1;
             slideList[stepIndex].style['opacity']=1;
            if (isAuto) {
                    this.autoTimer = setInterval(() => {
                        this.autoMove();
                    }, interval);
            }
            this.handleMouse();
            this.handleArrow();
            this.handleFocus();
        }
        autoMove() {
            if (this.stepIndex >= this.slideList.length-1) {
                this.stepIndex = -1;
            }
            this.stepIndex++;
            this.slideList[this.stepIndex].style['z-index']=1;
            this.slideList[this.stepIndex].style['opacity']=1;
                this.slideList[this.laststepIndex].style['z-index']=0;
                this.slideList[this.laststepIndex].style['opacity']=0;
            this.laststepIndex=this.stepIndex;
            this.changeFocus();
        };
        changeFocus() {
            let tempIndex = this.stepIndex;
            [].forEach.call(this.focusList, (item, index) => {
                item.className = index === tempIndex ? 'active' : '';
            });
        };
        handleMouse(){
            this.wrapper.onmouseenter=()=>{
                clearInterval(this.autoTimer)
            };
            this.wrapper.onmouseleave=()=>{
                this.autoTimer = setInterval(() => {
                    this.autoMove();
                }, this.interval);
            };

        };
        handleArrow(){
            this.arrowLeft.onclick=()=>{
                this.stepIndex=this.stepIndex-2;
                if(this.stepIndex===-2){this.stepIndex=2}
                this.autoMove();
            };
            this.arrowRight.onclick=()=>{
                this.autoMove();
            };
        };
        handleFocus(){
            this.focus.addEventListener('click', (ev)=>{
                this.focusList.forEach((curLi,index)=>{
                    curLi.className='';
                    if(ev.target===curLi){
                        curLi.className='active';
                        if(index!==this.stepIndex){
                            this.stepIndex=index-1;
                            this.autoMove();
                        }
                    }
                })
            })
        };
    }
    window.Banner = Banner;
}();
(function(){
    let  banner2='.home-container > .home-hero > .home-slider>section.container';
    let abc=new Banner({
        ele:banner2,
        moveEnd:false,
    });
})();


