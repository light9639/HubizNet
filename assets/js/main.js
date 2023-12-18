/**
 * 새로고침 시에 맨 위로가게 하기
 */
history.scrollRestoration = "manual"

$('.fix-load').on('scroll touchmove mousewheel', function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
});

/**
 * 3초 뒤에 fix-load hide 클래스 추가하기
 */
setTimeout(() => {
    $('.fix-load').addClass('hide');
    $('body').removeClass('noScroll');
    $('.fix-load').off('scroll touchmove mousewheel')
}, 5500);

/**
 * 아웃소싱 타이핑 효과
 */
const Typing1 = `<div class="dot gra gra1">D<span class="circle"></span></div>ifferent <span class="mi">&amp;</span> <div class="dot gra gra2">B<span class="circle"></span></div>etter<div class="typ"></div>`
gsap.to(".fix-load .title .block", { duration: 2, text: Typing1, delay: 1 });

const Typing2 = 'HR solution company<div class="typ"></div>';
gsap.to(".fix-load .desc .block", { duration: 2, text: Typing2, delay: 2 });

setTimeout(() => {
    gsap.set('.fix-load .circle', {
        y: -300,
        opacity: 0,
    })
    gsap.to('.fix-load .circle', {
        scrollTrigger: {
            trigger: '.fix-load',
            start: "0% 100%",
            end: "100% 0%",
        },
        y: -20,
        opacity: 1,
        duration: 1.5,
        ease: Bounce.easeOut,
        yoyo: true,
    })
}, 4000);

/**
 * 사이트 부드럽게하기
 */
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)

/**
 * sc-visual 스크롤하면 원 모양이 나오도록
 */
gsap.to('.sc-visual .video', {
    scrollTrigger: {
        trigger: ".sc-visual .content-wrap",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
    },
    'clip-path': 'circle(20% at 50% 50%)',
})

/**
 * sc-visual을 왼쪽 페이지네이션 클릭시 슬라이드 변화
 */
const visualSlide1 = new Swiper('.sc-visual .front', {
    effect: 'fade',
    allowTouchMove: false,
    pagination: {
        el: ".sc-visual .pagination"
    },
    navigation: {
        nextEl: ".sc-visual .next",
        prevEl: ".sc-visual .prev",
    }
})
const visualSlide2 = new Swiper('.sc-visual .back', {
    effect: 'fade',
})
visualSlide1.on('slideChange', function () {
    visualSlide2.slideToLoop(this.realIndex)
    let TitleTotal = document.querySelectorAll('.sc-visual .text-wrap .title')
    let DescTotal = document.querySelectorAll('.sc-visual .text-wrap .desc')

    TitleTotal.forEach((el, i) => {
        gsap.set(el, { opacity: 0, yPercent: 100 })
        gsap.to(el, {
            scrollTrigger: {
                trigger: '.sc-visual',
                start: '0% 100%',
                end: '100% 0%',
            },
            opacity: 1,
            yPercent: 0,
            duration: 0.5,
        })
    })
    DescTotal.forEach((el, i) => {
        gsap.set(el, { opacity: 0, yPercent: 100 })
        gsap.to(el, {
            scrollTrigger: {
                trigger: '.sc-visual',
                start: '0% 100%',
                end: '100% 0%',
            },
            opacity: 1,
            yPercent: 0,
            duration: 0.5,
            delay: 0.5,
        })
    })

    gsap.set('.sc-visual .circle', {
        y: -300,
        opacity: 0,
    })
    gsap.to('.sc-visual .circle', {
        scrollTrigger: {
            trigger: '.sc-visual',
            start: "0% 100%",
            end: "100% 0%",
        },
        y: -20,
        opacity: 1,
        duration: 1.5,
        ease: Bounce.easeOut,
        yoyo: true,
    })
})

/**
 * sc-visual 70% 오면 슬라이드 변경시키기
 */
gsap.to('.sc-visual', {
    scrollTrigger: {
        trigger: '.sc-visual',
        start: '0% 100%',
        end: '100% 0%',
        onUpdate: self => {
            progress = self.progress.toFixed(4) * 100;
            if (progress >= 50) {
                visualComplete(1);
            }
            if (progress <= 50) {
                visualComplete(0);
            }
        }
    },
})
function visualComplete(e) {
    visualSlide1.slideTo(e)
}

/**
 * sc-outsourcing 스크롤 시 아래에서 올라오고 투명도도 1로 변경
 */
$('[data-scroll="fade"]').each(function (i, el) {
    gsap.from($(this).find('>*'), {
        scrollTrigger: {
            trigger: el,
            start: "0% 80%",
            end: "100% 100%",
        },
        opacity: 0,
        yPercent: 20,
        stagger: 0.1
    })
})

/**
 * 스크롤시 헤더에 반투명 배경
*/
function headerScroll() {
    let header = $('header');
    $(window).scroll(function () {
        let windowT = $(window).scrollTop();
        if (windowT > 0) {
            header.addClass('bg');
        } else {
            header.removeClass('bg');
        }
    });
}

/**
 * header 오시는길 클릭시 이동
 */
document.querySelector('.header .gnb .location').addEventListener('click', function (e) {
    let location = document.querySelector(".container").offsetHeight;
    let menuHeight = document.querySelector(".container .sc-info").offsetHeight;

    window.scrollTo({ top: location - menuHeight, behavior: 'smooth' });
})

/**
 * 카카오맵 수정시 사용
 */
new daum.roughmap.Lander({
    "timestamp": "1702869465792",
    "key": "2h93y",
    "mapWidth": "296",
    "mapHeight": "296"
}).render();

/**
 * swiper 호버시 gra-cursor가 나오도록 하기
 */
$(window).mousemove(function (e) {
    let x = e.clientX - ($('.gra-cursor').width() / 2);
    let y = e.clientY - ($('.gra-cursor').height() / 2);

    $('.gra-cursor').css({
        "top": y,
        "left": x,
    });
});
$('[data-cursor="true"]').mousemove(function () {
    if (window.innerWidth >= 821) {
        gsap.to('.gra-cursor', {
            opacity: 1,
        })
    }
});
$('[data-cursor="true"]').mouseleave(function () {
    if (window.innerWidth >= 821) {
        gsap.to('.gra-cursor', {
            opacity: 0,
        })
    }
});

/**
 * 아웃소싱 타이핑 효과
 */
const result = `<span>아</span><span>웃</span><span>소</span><span>싱</span>은<span> 외</span><span>부</span><span> 전</span><span>문</span><span>자</span><span>원</span> 을 활용하여 자사의<span> 역</span><span>량</span><span> 및</span><span> 경</span><span>쟁</span><span>력</span>을<span> 강</span><span>화</span><span>하</span><span>는</span><br><span>필</span><span>수</span><span>적</span><span>인</span><span> 경</span><span>영</span><span>전</span><span>략</span>입니다.`

gsap.to('.sc-outsourcing .content > .desc', {
    scrollTrigger: {
        trigger: '.sc-outsourcing',
        start: "0% 100%",
        end: "100% 0%",
    },
    duration: 5,
    text: result,
    ease: "none",
    // delay: 1
});

/**
 * 통통 튀어오르는 원 애니메이션
 */
let circle_y_List = document.querySelectorAll('[data-circle-y]')
let circle_x_List = document.querySelectorAll('[data-circle-x]')

circle_y_List.forEach(element => {
    gsap.set(element, { y: element.dataset.circleY, opacity: 0 })

    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: "0% 100%",
            end: "100% 0%",
        },
        y: '0px',
        opacity: 1,
        duration: 2,
        delay: 0.5,
        ease: Bounce.easeOut,
        yoyo: true,
    })
})

circle_x_List.forEach(element => {
    gsap.set(element, { x: element.dataset.circleX, opacity: 0 })

    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: "0% 100%",
            end: "100% 0%",
        },
        x: '0px',
        opacity: 1,
        duration: 2,
        delay: 0.5,
        ease: Bounce.easeOut,
        yoyo: true,
    })
})

/**
 * sc-space 부분 가로로 스크롤 시키기
 */
hori = gsap.to('.sc-space .horizon', {
    scrollTrigger: {
        trigger: ".sc-space",
        start: "0% 0%",
        end: "100% 100%",
        scrub: 0,
        invalidateOnRefresh: true,
    },
    ease: 'none',
    xPercent: -100,
    x: function () {
        return window.innerWidth
    }
})

/**
 * sc-space 메뉴 부분 변화시키기
 */
let liList = document.querySelectorAll('.sc-space .txt-wrap .nav li');
let itemList = document.querySelectorAll('.horizon .item');

liList.forEach(function (el, i) {
    gsap.to(el, {
        scrollTrigger: {
            trigger: itemList[i],
            containerAnimation: hori,
            start: '0% 50%',
            end: '100% 0%',
            toggleClass: { targets: el, className: 'act' }
        },
    })
})

/**
 * sc-space item 상단 부분 효과
 */
gsap.set('.sc-space .txt-wrap .share-box', { yPercent: 100, opacity: 0 })
gsap.set('.sc-space .txt-wrap .nav', { xPercent: 50, opacity: 0 })

gsap.to('.sc-space .txt-wrap .share-box', {
    scrollTrigger: {
        trigger: '.sc-space',
        start: '0% 100%',
        end: '100% 0%',
    },
    yPercent: 0,
    opacity: 1,
    duration: 1,
    delay: 0.5,
})
gsap.to('.sc-space .txt-wrap .nav', {
    scrollTrigger: {
        trigger: '.sc-space',
        start: '0% 100%',
        end: '100% 0%',
    },
    xPercent: 0,
    opacity: 1,
    duration: 1,
    delay: 1,
})

/**
 * sc-space item 나타나는 효과
 */
itemList.forEach(function (el, i) {
    gsap.set(el.querySelectorAll('h4 p'), { y: 100, opacity: 0 })
    gsap.set(el.querySelectorAll('h4 span'), { y: 100, opacity: 0 })
    gsap.set(el.querySelectorAll('h3'), { y: 100, opacity: 0 })
    gsap.set(el.querySelectorAll('.tbx > p'), { y: 100, opacity: 0 })

    gsap.to(el.querySelectorAll('h4 p'), {
        scrollTrigger: {
            trigger: el,
            containerAnimation: hori,
            start: '0% 50%',
            end: '100% 0%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0,
    })
    gsap.to(el.querySelectorAll('h4 span'), {
        scrollTrigger: {
            trigger: el,
            containerAnimation: hori,
            start: '0% 50%',
            end: '100% 0%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.25,
    })
    gsap.to(el.querySelectorAll('h3'), {
        scrollTrigger: {
            trigger: el,
            containerAnimation: hori,
            start: '0% 50%',
            end: '100% 0%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.5,
    })
    gsap.to(el.querySelectorAll('.tbx > p'), {
        scrollTrigger: {
            trigger: el,
            containerAnimation: hori,
            start: '0% 50%',
            end: '100% 0%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.75,
    })
})

/**
 * horizon 부분에 hover 시 gra-cursor 나오게하기
 */
$('.sc-spacer .horizon .item').mouseover(function () {
    if (window.innerWidth >= 821) {
        gsap.to('.gra-cursor', {
            opacity: 1,
        })
    }
});
$('.sc-spacer .horizon .item').mouseleave(function () {
    if (window.innerWidth >= 821) {
        gsap.to('.gra-cursor', {
            opacity: 0,
        })
    }
});


/**
 * 휴비즈넷 서비스 페이지 swiper
 */
roomsTextSwiper = new Swiper(".sc-services .textbox", {
    speed: 2000,
    slidesPerView: 1,
    effect: 'fade',
});
roomsImgSwiper = new Swiper(".sc-services .imgbox", {
    centeredSlides: true,
    slidesPerView: 'auto',
    slideToClickedSlide: true,
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        slideShadows: false,
        stretch: 70,
    },
});

console.log(document.querySelector('.sc-services .textbox .list li:last-child'));
roomsImgSwiper.on('slideChange', function () {
    roomsTextSwiper.slideTo(this.realIndex)

    let TotalList1 = document.querySelectorAll('.sc-services .textbox .swiper-slide')[this.realIndex];
    let list = [
        '.sc-services .textbox .title .small',
        '.sc-services .textbox .title .main',
        '.sc-services .textbox .desc',
        '.sc-services .textbox .sub-title',
        '.sc-services .textbox .list li:first-child',
        '.sc-services .textbox .list li:last-child',
    ]

    list.forEach((el, i) => {
        console.log(i);
        gsap.set(el, { opacity: 0, y: '200px' })
        gsap.to(el, {
            scrollTrigger: {
                trigger: TotalList1,
                start: '0% 100%',
                end: '100% 0%',
            },
            opacity: 1,
            y: '0px',
            duration: 0.4,
            delay: (i + 1) * .2,
        })
    })

    gsap.set('.sc-services .textbox .circle', {
        y: -300,
        opacity: 0,
    })
    gsap.to('.sc-services .textbox .circle', {
        scrollTrigger: {
            trigger: TotalList1,
            start: "0% 100%",
            end: "100% 0%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: Bounce.easeOut,
        yoyo: true,
    })
})

/**
 * 휴비즈넷 서비스 페이지 swiper 중간에 변경시키기
 */
let groupHeader = document.querySelector('.sc-services .group-header');
let serviceWrap = document.querySelector('.sc-services .service-wrap');
let serviceList = document.querySelectorAll('.sc-services .content > *');

serviceList.forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: '.sc-services',
            start: '0% 75%',
            end: '100% 0%',
            onEnter: () => el.classList.add('on'),
        },
    })
})

gsap.to('.sc-services', {
    scrollTrigger: {
        trigger: '.sc-services',
        start: '0% 100%',
        end: '100% 0%',
        scrub: true,
        onUpdate: self => {
            progress = self.progress.toFixed(4) * 100;
            if (progress >= 25) {
                tweenComplete(1);
                $('.sc-services .service-wrap .tap li').eq(1).addClass('act').siblings().removeClass('act');
            }
            if (progress <= 25) {
                tweenComplete(0);
                $('.sc-services .service-wrap .tap li').eq(0).addClass('act').siblings().removeClass('act');
            }
        }
    },
})
function tweenComplete(e) {
    roomsImgSwiper.slideTo(e)
}

/**
 * sc-cooperative 부분 변화시키기
 */
gsap.set('.sc-cooperative .content .img-wrap', {
    y: '100px', opacity: 0,
})
gsap.to('.sc-cooperative .content .img-wrap', {
    scrollTrigger: {
        trigger: '.sc-cooperative',
        start: '0% 60%',
        end: '100% 0%',
    },
    duration: 1,
    y: '0px',
    opacity: 1,
})

/**
 * sc-info 여러 요소들 크기 키우고 투명도 1로
 */
let cirList = document.querySelectorAll('.sc-info .col');

cirList.forEach(el => {
    let strong = el.querySelectorAll('.txt-box strong');
    let h4 = el.querySelectorAll('.txt-box h4');
    let circle = el.querySelectorAll('.circle');
    let btn = el.querySelectorAll('.btn-area span');

    gsap.set(strong, { scale: 0, opacity: 0 })
    gsap.set(h4, { scale: 0, opacity: 0 })
    gsap.set(circle, { scale: 0, opacity: 0 })
    gsap.set(btn, { scale: 0, opacity: 0 })

    gsap.to(strong, {
        scrollTrigger: {
            trigger: '.sc-info',
            start: '0% 25%',
            end: '100% 0%',
        },
        duration: 0.75,
        scale: 1,
        opacity: 1,
    })

    gsap.to(h4, {
        scrollTrigger: {
            trigger: '.sc-info',
            start: '0% 25%',
            end: '100% 0%',
        },
        duration: 0.75,
        scale: 1,
        opacity: 1,
    })

    gsap.to(circle, {
        scrollTrigger: {
            trigger: '.sc-info',
            start: '0% 25%',
            end: '100% 0%',
        },
        duration: 0.75,
        scale: 1,
        opacity: 1,
    })

    gsap.to(btn, {
        scrollTrigger: {
            trigger: '.sc-info',
            start: '0% 25%',
            end: '100% 0%',
        },
        duration: 0.75,
        scale: 1,
        opacity: 1,
    })
})

/**
 * sc-info 텍스트 스크롤하면 나오게 하기
 */
gsap.set('.sc-info .txt-box p', { y: '100px', opacity: 0 })
gsap.to('.sc-info .txt-box p', {
    scrollTrigger: {
        trigger: '.sc-info',
        start: '0% 25%',
        end: '100% 0%',
    },
    duration: 0.75,
    delay: 1,
    y: '0px',
    opacity: 1,
})

$(document).ready(function () {
    headerScroll();
})