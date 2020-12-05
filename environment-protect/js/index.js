// noinspection JSUnresolvedVariable

/**
 * 首页的js
 */

const $ = jQuery;

// 入口函数
$(function () {
    // 加载样式效果
    loadStyleEffect();


    // 加载环保数据
    (async function () {
        await loadData();
    })();
});


// 加载环保数据
async function loadData() {
    // 获取空气质量数据
    let data = await get(API.Air_Quality);
    data = data.data.slice(-24);

    let xAxis_data = [];
    let pm25_data = [];
    let pm10_data = [];

    data.forEach(item => {
        xAxis_data.push(formatDate(item['datatime']));
        pm25_data.push(item['pm25']);
        pm10_data.push(item['pm10']);
    });

    let option_pm25 = {
        title: {
            text: '平顶山市空气质量 - PM2.5 趋势图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxis_data
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'PM2.5',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: pm25_data
            }
        ]
    };

    let option_pm10 = {
        title: {
            text: '平顶山市空气质量 - PM10 趋势图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: xAxis_data
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'PM2.5',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: pm10_data
            }
        ]
    };

    let chartAQI = echarts.init(document.getElementById('chart-aqi'));
    let chartPM25 = echarts.init(document.getElementById('chart-pm25'));
    chartAQI.setOption(option_pm25);
    chartPM25.setOption(option_pm10);


    window.onresize = function () {
        chartAQI.resize();
        chartPM25.resize();
    };

}


// 加载样式效果
function loadStyleEffect() {

    // 加载时候的动图
    $(window).load(function () {
        // noinspection JSUnresolvedFunction
        $('#loading').fadeOut();
        // noinspection JSUnresolvedFunction
        $('#loadingDiv').delay(1000).fadeOut("slow");
    });

    // 滚动到30的时候，导航栏折叠
    // noinspection JSUnresolvedFunction
    $(window).on('ready , scroll', function () {
        if ($(window).scrollTop() > 30) {
            // noinspection JSUnresolvedFunction
            $('#navbar').addClass('minified');
        } else {
            // noinspection JSUnresolvedFunction
            $('#navbar').removeClass('minified');
        }
    });

    // 轮播图翻页效果
    // noinspection JSUnresolvedFunction
    $('#nav-menu').onePageNav({
        currentClass: 'active',
        scrollSpeed: 500,
        easing: 'linear'
    });

    // 动画效果
    // noinspection JSUnresolvedFunction
    let wow = new WOW(
        {
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 250,
            mobile: true,
            live: true
        }
    );
    // noinspection JSUnresolvedFunction
    wow.init();


    // 新闻的 幻灯片效果
    // noinspection JSUnresolvedFunction
    $("#news-list").owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1],
        itemsTablet: [768, 1],
        itemsMobile: [520, 1],
        autoPlay: 5000
    });

    // 视差效果
    // noinspection JSUnresolvedFunction
    $(window).stellar({
        responsive: true,
        positionProperty: 'position'
    });


    // 轮播图
    // noinspection JSUnresolvedFunction
    $('#slider').sliderPro({
        width: '100%',
        height: 768,
        fade: true,
        arrows: true,
        waitForLayers: true,
        buttons: true,
        autoplay: true,
        autoScaleLayers: false,
        imageScaleMode: 'cover',
        slideAnimationDuration: 1500,
        breakpoints: {
            600: {
                height: 480
            }
        }
    });


}
