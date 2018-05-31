// 生成main部分的页面，实现数据的动态绑定
let mainRender = (function ($) {
    let imgData = null,
        //=>PHONE-ELEMENT
        $phone = $('#phone'),
        $phoneLeft = $phone.find('.main-pic-left'),
        $phoneRight = $phone.find('.main-pic-right'),
        $phoneBottom = $phone.find('.homeMain-box-bottom'),
        //=>HOUSEHOLD-ELEMENT
        $household = $('#household'),
        $householdLeft = $household.find('.household-left'),
        $householdRight = $household.find('.household-right-box'),
        $householdBottom = $household.find('.homeMain-box-bottom'),
        //=>INTEL-ELEMENT
        $intel = $('#intel'),
        $intelLeft = $intel.find('.main-pic-left'),
        $intelRight = $intel.find('.main-pic-right'),
        $intelBottom = $intel.find('.homeMain-box-bottom'),
        //=>COLLOCATION-ELEMENT
        $collocation = $('#collocation'),
        $collocationLeft = $collocation.find('.main-pic-left'),
        $collocationRight = $collocation.find('.main-pic-right'),
        $collocationBottom = $collocation.find('.homeMain-box-bottom'),
        //=>PART-ELEMENT
        $part = $('#part'),
        $partLeft = $part.find('.main-pic-left'),
        $partRight = $part.find('.main-pic-right'),
        $partBottom = $part.find('.homeMain-box-bottom'),
        //=>PERIPHERY-ELEMENT
        $periphery = $('#periphery'),
        $peripheryLeft = $periphery.find('.main-pic-left'),
        $peripheryRight = $periphery.find('.main-pic-right'),
        $peripheryBottom = $periphery.find('.homeMain-box-bottom'),
        //=>RECOMMEND_ELEMENT
        $recommend = $('#recommend'),
        $recommendUl = $recommend.find('.recommend-ul'),
        //=>HOT-PRODUCT-ELEMENT
        $hotProduct = $('#hotProduct'),
        $hotProductUl = $hotProduct.find('.hotProduct-ul');
    console.log($householdRight);

    //=>QUERY-DATA：获取图片数据
    let queryData = function queryData() {
        return new Promise((resolve) => {
            $.ajax({
                url: 'json/homeMain.json',
                method: 'GET',
                async: true,
                dataType: 'json',
                success: (result) => {
                    imgData = result;
                    resolve(imgData);
                }
            })
        })
    };

    //=>BIND-HTML：将图片绑定到页面当中
    let bindHTML = function bindHTML() {
        //=>PHONE:BIND
        let phoneLeftStr = ``,
            phoneRightStr = ``,
            phoneBottomStr = ``;
        for (let i = 0; i < 1; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            phoneLeftStr += `<li class="pic-hover phone-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="">
                        </a>
                    </li>`;
        }
        for (let i = 1; i < 9; i++) {
            let {
                title,//标题
                link,//链接
                desc,//描述
                src,//图片地址
                oldPrice,//原价
                newPrice,//新价格
                saleContent,//优惠内容
                saleType,// 优惠类型 0（打折或者减价：字体红色） 1（新品：字体绿色）
            } = imgData[i];
            phoneRightStr += `<li class="homeMain-li pic-hover">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        ${saleContent !== 0 ? `<div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>` : ``}
                    </li>`;
        }
        for (let i = 9; i < 10; i++) {
            let {
                link,
                src,
            } = imgData[i];
            phoneBottomStr += `<a href="${link}">
                <img src="${src}" alt="">
            </a>`;
        }
        $(phoneLeftStr).appendTo($phoneLeft);
        $(phoneRightStr).appendTo($phoneRight);
        $(phoneBottomStr).appendTo($phoneBottom);
        phoneLeftStr = null;
        phoneRightStr = null;
        phoneBottomStr = null;

        //=>HOUSEHOLD-BIND
        let householdLeftStr = ``,
            householdRightStr = ``,
            householdRightStr1 = ``,
            householdRightStr2 = ``,
            householdRightStr3 = ``,
            householdBottomStr = ``;
        for (let i = 10; i < 12; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            householdLeftStr += `<li class="pic-hover household-left-li">
                        <a  href="${link}" target="_blank">
                            <img src="${src}" alt="">
                        </a>
                    </li>`;
        }
        for (let i = 12; i < 20; i++) {
            let {
                title,//标题
                link,//链接
                desc,//描述
                src,//图片地址
                oldPrice,//原价
                newPrice,//新价格
                saleContent,//优惠内容
                saleType,// 优惠类型 0（打折或者减价：字体红色） 1（新品：字体绿色）
                isBottomHover, //是否子底部弹出评论
                msg // 评论信息
            } = imgData[i];
            householdRightStr += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 74; i < 82; i++) {
            let {
                title,//标题
                link,//链接
                desc,//描述
                src,//图片地址
                oldPrice,//原价
                newPrice,//新价格
                saleContent,//优惠内容
                saleType,// 优惠类型 0（打折或者减价：字体红色） 1（新品：字体绿色）
                isBottomHover, //是否子底部弹出评论
                msg // 评论信息
            } = imgData[i];
            householdRightStr1 += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 82; i < 90; i++) {
            let {
                title,//标题
                link,//链接
                desc,//描述
                src,//图片地址
                oldPrice,//原价
                newPrice,//新价格
                saleContent,//优惠内容
                saleType,// 优惠类型 0（打折或者减价：字体红色） 1（新品：字体绿色）
                isBottomHover, //是否子底部弹出评论
                msg // 评论信息
            } = imgData[i];
            householdRightStr2 += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 90; i < 98; i++) {
            let {
                title,//标题
                link,//链接
                desc,//描述
                src,//图片地址
                oldPrice,//原价
                newPrice,//新价格
                saleContent,//优惠内容
                saleType,// 优惠类型 0（打折或者减价：字体红色） 1（新品：字体绿色）
                isBottomHover, //是否子底部弹出评论
                msg // 评论信息
            } = imgData[i];
            householdRightStr3 += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }

        for (let i = 20; i < 21; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            householdBottomStr += `<a href="${link}" target="_blank">
                <img src="${src}" alt="">
            </a>`;
        }
        $(householdLeftStr).appendTo($householdLeft);
        $(householdRightStr).appendTo($householdRight.eq(0));
        $(householdRightStr1).appendTo($householdRight.eq(1));
        $(householdRightStr2).appendTo($householdRight.eq(2));
        $(householdRightStr3).appendTo($householdRight.eq(3));
        $(householdBottomStr).appendTo($householdBottom);


        //=>INTEL:BIND
        let intelLeftStr = ``,
            intelRightStr = ``,
            intelBottomStr = ``;
        for (let i = 21; i < 23; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            intelLeftStr += `<li class="pic-hover household-li">
                        <a  href="${link}" target="_blank">
                            <img src="${src}" alt="">
                        </a>
                    </li>`;
        }
        for (let i = 23; i < 31; i++) {
            let {
                title,
                link,
                desc,
                src,
                oldPrice,
                newPrice,
                saleContent,
                saleType,
                isBottomHover,
                msg
            } = imgData[i];
            intelRightStr += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 31; i < 32; i++) {
            let {
                link,
                src,
            } = imgData[i];
            intelBottomStr += `<a href="${link}" target="_blank">
                <img src="${src}" alt="">
            </a>`;
        }
        $(intelLeftStr).appendTo($intelLeft);
        $(intelRightStr).appendTo($intelRight);
        $(intelBottomStr).appendTo($intelBottom);

        //=>COLLOCATION:BIND
        let colLeftStr = ``,
            colRightStr = ``,
            colBottomStr = ``;
        for (let i = 32; i < 34; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            colLeftStr += `<li class="pic-hover household-li">
                        <a  href="${link}" target="_blank">
                            <img src="${src}" alt="">
                        </a>
                    </li>`;
        }
        for (let i = 34; i < 42; i++) {
            let {
                title,
                link,
                desc,
                src,
                oldPrice,
                newPrice,
                saleContent,
                saleType,
                isBottomHover,
                msg
            } = imgData[i];
            colRightStr += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}元</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 42; i < 43; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            colBottomStr += `<a href="${link}" target="_blank">
                <img src="${src}" alt="">
            </a>`;
        }
        $(colLeftStr).appendTo($collocationLeft);
        $(colRightStr).appendTo($collocationRight);
        $(colBottomStr).appendTo($collocationBottom);

        //=>PART:BIND
        let partLeftStr = ``,
            partRightStr = ``,
            partBottomStr = ``;
        for (let i = 43; i < 45; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            partLeftStr += `<li class="pic-hover household-li">
                        <a  href="${link}" target="_blank">
                            <img src="${src}" alt="">
                        </a>
                    </li>`;
        }
        for (let i = 45; i < 53; i++) {
            let {
                title,
                link,
                desc,
                src,
                oldPrice,
                newPrice,
                saleContent,
                saleType,
                isBottomHover,
                msg
            } = imgData[i];
            partRightStr += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 53; i < 54; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            partBottomStr += `<a href="${link}" target="_blank">
                <img src="${src}" alt="">
            </a>`;
        }
        $(partLeftStr).appendTo($partLeft);
        $(partRightStr).appendTo($partRight);
        $(partBottomStr).appendTo($partBottom);

        //=>PERIPHERY:BIND
        let peripheryLeftStr = ``,
            peripheryRightStr = ``,
            peripheryBottomStr = ``;
        for (let i = 54; i < 56; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            peripheryLeftStr += `<li class="pic-hover household-li">
                        <a  href="${link}" target="_blank">
                            <img src="${src}" alt="">
                        </a>
                    </li>`;
        }
        for (let i = 56; i < 64; i++) {
            let {
                title,
                link,
                desc,
                src,
                oldPrice,
                newPrice,
                saleContent,
                saleType,
                isBottomHover,
                msg
            } = imgData[i];
            peripheryRightStr += `<li class="pic-hover homeMain-li">
                        <a class="main-img-box" href="${link}" target="_blank">
                            <img src="${src}" alt="1">
                        </a>
                        <h3 class="title">${title}</h3>
                        <p class="desc">${desc}</p>
                        <p class="price">
                            <span class="cur-price">${newPrice}</span>
                            <span class="del-price">${oldPrice}</span>
                        </p>
                        <div class="sale ${saleType === 1 ? "flag-sale" : "flag-new"}" >${saleContent}</div>
                        <div class="evaluate ${isBottomHover ? "evaluate-active" : ""}">${msg}</div>
                    </li>`;
        }
        for (let i = 64; i < 65; i++) {
            let {
                link,//链接
                src,//图片地址
            } = imgData[i];
            peripheryBottomStr += `<a href="${link}" target="_blank">
                <img src="${src}" alt="">
            </a>`;
        }
        $(peripheryLeftStr).appendTo($peripheryLeft);
        $(peripheryRightStr).appendTo($peripheryRight);
        $(peripheryBottomStr).appendTo($peripheryBottom);

        //=>RECOMMEND:BIND
        let recommendStr = ``;
        for (let i = 65; i < 70; i++) {
            let {
                link,
                src,
                title,
                price,
                love
            } = imgData[i];
            recommendStr += `<li class="recommend-li pic-hover">
                                <a href="${link}">
                                    <img src="${src}" alt="${title}">
                                    <p class="recommend-title">${title}</p>
                                    <p class="recommend-price">${price}元</p>
                                    <p class="recommend-love">${love}人喜欢</p>
                                </a>
                            </li>`;
        }
        $(recommendStr).appendTo($recommendUl);
        recommendStr = null;

        //=>HOT-PRODUCT:BIND
        let hotProductStr = ``;
        for (let i = 70; i < 74; i++) {
            let {
                picLink,
                descLink,
                src,
                evaluate,
                title,
                desc,
                price
            } = imgData[i];
            hotProductStr += `<li class="pic-hover">
                <a href="${picLink}" target="_blank">
                    <img src="${src}" alt="${title}">
                </a>
                <a class="hotProduct-desc" href="${descLink}" target="_blank">${desc}</a>
                <p class="evaluateFrom">${evaluate}</p>
                <div class="title-wrap">
                    ${title}
                    <i></i>
                    <span>${price}元</span>
                </div>
            </li>`;

        }
        $(hotProductStr).appendTo($hotProductUl);
        hotProductStr = null;

    };

    //=>TAB-CHANGE：实现切换
    let tabChange = function tabChange($ele) {
        let $list = $ele.find('.household-right-list>li'),
            $item = $ele.find('.household-right-wrap>ul');
        $list.on('mouseover', function () {
            let index = $(this).index();
            $(this).addClass('active')
                .siblings().removeClass('active');
            $item.eq(index).addClass('active')
                .siblings().removeClass('active');
        })
    };

    //=>BANNER：轮播图
    let $content = $('#content'),
        $myBanners = $content.find('.content-wrap-li');
    let myBanner = function myBanner(ele) {
        let $wrap = ele.find('.content-mySwiper'),
            $focus = ele.find('.focus>li'),
            $arrowLeft = ele.find('.arrowLeft'),
            $arrowRight = ele.find('.arrowRight'),
            lastIndex = 0;
        let slide = function (index) {
            let duration = 200,
                change = (index - lastIndex) * 296,
                step = change / duration * 17,
                timer = null,
                left = parseFloat($wrap.css('left'));
            timer = setInterval(() => {
                left -= step;
                if (index > lastIndex ? left <= -index * 296 : left >= -index * 296) {
                    $wrap.css('left', -index * 296 + 'px');
                    lastIndex = index;
                    console.log(lastIndex);
                    clearInterval(timer);
                    timer = null;
                    return;
                }
                $wrap.css('left', left);
            }, 17);

        };
        $focus.on('click', function () {
            let index = $(this).index();
            $(this).addClass('active')
                .siblings().removeClass('active');
            slide(index);
        });
        $arrowLeft.on('click',function () {
            let index = lastIndex;
            if(index===0) return;
            index--;
            slide(index);
            $focus.eq(index).addClass('active')
                .siblings().removeClass('active');
        });
        $arrowRight.on('click',function () {
            let index = lastIndex;
            if(index===$focus.length-1) return;
            index++;
            slide(index);
            $focus.eq(index).addClass('active')
                .siblings().removeClass('active');
        });
    };

    return {
        init: function () {
            let promise = queryData();
            promise.then(() => {
                bindHTML();
                tabChange($household);
                myBanner($myBanners.eq(0));
            });
        }
    }
})(jQuery);
mainRender.init();