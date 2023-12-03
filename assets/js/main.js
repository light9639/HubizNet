/**
 * 새로고침 시에 맨 위로가게 하기
 */
history.scrollRestoration = "manual"

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
    'clip-path': 'circle(20% at 50% 50%)'
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
})

/**
 * sc-outsourcing 스크롤 시 아래에서 올라오고 투명도도 1로 변경
 */
$('[data-scroll="fade"]').each(function (i, el) {
    gsap.from($(this).find('>*'), {
        scrollTrigger: {
            trigger: el,
            start: "0% 80%",
            end: "100% 100%",
            // markers: true,
        },
        opacity: 0,
        yPercent: 20,
        stagger: 0.1
    })
})

/**
 * 휴비즈넷 서비스 페이지 swiper
 */
let paginationList = [
    "SPO",
    "SMO",
    "IT Solution",
    "Joinswith",
    "급여아웃소싱",
]

roomsSwiper = new Swiper(".sc-services .first", {
    speed: 2000,
    loop: true,
    slidesPerView: 1,
    pagination: {
        el: ".sc-services .first .swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + paginationList[index] + "</span>";
        },
    },
});

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
 * 맵 수정시 사용
 */
new daum.roughmap.Lander({
    "timestamp": "1693894724650",
    "key": "2g3yx",
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
    duration: 5,
    text: result,
    ease: "none",
    delay: 1
});

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
let liList = $('.sc-space .txt-wrap .nav li');

gsap.to(".sc-space .txt-wrap .nav li:nth-child(2)", {
    background: "#f00",
    scrollTrigger: {
        trigger: '.horizon .item:nth-child(2)',
        containerAnimation: hori,
        start: 'left center',
        end: 'right center',
        markers: true,
        toggleActions: 'play reset play reset',
    }
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
 * sc-spacer item 
 */
function mobInit() {
    console.log(gsap.utils.toArray('.sc-space .horizon .item'));
    gsap.utils.toArray('.sc-space .horizon .item').forEach(el => {
        gsap.to($(el).find('.tbx>h4 p'), {
            y: 0,
            opacity: 1,
        })
        gsap.to($(el).find('.tbx>h4 span'), {
            y: 0,
            opacity: 1,
        })
        gsap.to($(el).find('.tbx>h3'), {
            y: 0,
            opacity: 1,
        })
        gsap.to($(el).find('.tbx>p'), {
            y: 0,
            opacity: 1,
        });

        // gsap.fromTo(el, {
        //     y: 70,
        //     opacity: 0,
        // }, {
        //     y: 0,
        //     opacity: 1,
        //     scrollTrigger: {
        //         trigger: el,
        //         start: "top bottom-=15%",
        //     }
        // });

    })
}

$(document).ready(function () {
    headerScroll();
    mobInit();
})