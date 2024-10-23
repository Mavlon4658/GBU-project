const bodyHidden = () => {
    document.querySelector('body').style.overflow = 'hidden';
}

const bodyVisible = () => {
    document.querySelector('body').style.overflow = 'visible';
}

let homeSwp;
homeSwp = new Swiper('.home .swiper', {
    slidesPerView: 1,
    effect: 'fade',
    loop: true,
    autoplay: {
        delay: 5000,
    },
    navigation: {
        nextEl: '.home .swp_next',
        prevEl: '.home .swp_prev',
    },
    pagination: {
        el: '.home .swp_fraction',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
            return current + '/' + (total);
        }
    },
    on: {
        init: function() {
            var activeSlide = this.slides[this.activeIndex];
            var activeFraction = activeSlide.querySelector('.home .swp_fraction');
            
            if (activeFraction) {
                activeFraction.innerHTML = (this.activeIndex + 1) + '/' + (this.slides.length);
            }
        },
        slideChange: function() {
            var activeSlide = this.slides[this.activeIndex];
            var activeFraction = activeSlide.querySelector('.home .swp_fraction');
            
            document.querySelectorAll('.home .swp_fraction').forEach(function(el) {
                el.innerHTML = '';
            });
            
            if (activeFraction) {
                activeFraction.innerHTML = (this.realIndex + 1) + '/' + (this.slides.length);
            }
        }
    }
});

let marqueSwp = new Swiper('.marque', {
    slidesPerView: 'auto',
    loop: true,
    speed: 15000,
    effect: 'slide',
    allowTouchMove: false,
    spaceBetween: 100,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    breakpoints: {
        750: {
            spaceBetween: 0,
        }
    }
})

let menuNavs = document.querySelector('.menu__navs'),
    menuNavsBtn = document.querySelector('.menu__navs_btn'),
    menuNavsItems = document.querySelector('.menu__navs_item'),
    menuNavsClose = document.querySelector('.menu__navs_item button');

menuNavsBtn.onclick = e => {
    e.preventDefault();
    menuNavs.classList.remove('d-flex');
    menuNavs.classList.add('d-none');
    menuNavsItems.classList.remove('d-none');
}

menuNavsClose.onclick = () => {
    menuNavs.classList.add('d-flex');
    menuNavs.classList.remove('d-none');
    menuNavsItems.classList.add('d-none');
}

let bars = document.querySelector('.header .bars'),
    menu = document.querySelector('.menu'),
    menuClose = document.querySelector('.menu__close');

bars.onclick = () => {
    menu.classList.add('active');
    bodyHidden();
}

menuClose.onclick = () => {
    menu.classList.remove('active');
    menu.classList.add('end-active');
    setTimeout(() => {
        menu.classList.remove('end-active');
        bodyVisible();
    }, 300);
}

let eventSwp = new Swiper('.event__slider .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    breakpoints: {
        992: {
            spaceBetween: 40
        }
    },
    navigation: {
        nextEl: '.event__slider .swp_next',
        prevEl: '.event__slider .swp_prev',
    }
})

let serviceSwp = new Swiper('.service__slider .swiper', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    breakpoints: {
        992: {
            spaceBetween: 40
        }
    },
    navigation: {
        nextEl: '.service__slider .swp_next',
        prevEl: '.service__slider .swp_prev',
    }
})

function serviceNavigationActive () {
    const nav = document.querySelector('.services__navigation');
    if (nav) {
        const stickyTop = nav.getBoundingClientRect().top;
        
        if (stickyTop <= 0) {
            nav.classList.add('active'); 
        } else {
            nav.classList.remove('active');
        }
        
        if (stickyTop <= 162) {
            nav.classList.add('h-block'); 
        } else {
            nav.classList.remove('h-block');
        }
        
        if (scrollY >= 372) {
            nav.classList.remove('h-block');
        }
    }
}

serviceNavigationActive();

let segments = [];
document.querySelectorAll('[data-segment]').forEach(function(el) {
    let segment = el.getAttribute('data-segment'),
    top = el.getBoundingClientRect().top + window.pageYOffset;

    document.querySelectorAll('[data-target-segment="' + segment + '"]').forEach(function(target) {
        target.addEventListener('click', function() {
            window.scrollTo({ top: top - 60, behavior: 'smooth' });
        });
    });

    segments.push({
        name: segment,
        top: top - el.offsetHeight / 2
    });
});

window.addEventListener('scroll', function() {
    serviceNavigationActive()

    let currentScrollTop = window.pageYOffset;
    let matchSegments = segments.filter(function(segment) {
        return currentScrollTop > segment.top;
    });

    if (matchSegments.length) {
        let first = matchSegments[matchSegments.length - 1];
        document.querySelectorAll('[data-target-segment]').forEach(function(el) {
            el.classList.remove('active');
        });
        document.querySelectorAll('[data-target-segment="' + first.name + '"]').forEach(function(el) {
            el.classList.add('active');
        });
    }
});