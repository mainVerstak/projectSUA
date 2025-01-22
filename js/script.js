"use strict";
document.addEventListener("DOMContentLoaded", function () {

  //+mobile show hidden text
  document.querySelectorAll('.article-mobile-show__btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      btn.closest('.article-mobile-show').classList.add('_hide');
      let container = btn.closest('.info-article__formatting');
      container.querySelectorAll('.article-hide-mobile').forEach(function (item) {
        item.classList.add('_show');
      });
    })
  });
  //-mobile show hidden text

  //+mobile accordion
  document.querySelectorAll('.js-mobile-accordion').forEach(function (menuAccordion) {
    menuAccordion.querySelectorAll('.js-mobile-accordion-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (window.innerWidth > 991)
          return
        let item = btn.closest('.js-mobile-accordion-item');
        let content = item.querySelector('.js-mobile-accordion-content')
        if (item.classList.contains('_active')) {
          accordionHide(item, content)
        } else {
          menuAccordion.querySelectorAll('.js-mobile-accordion-item._active').forEach(function (activeItem) {
            let content = activeItem.querySelector('.js-mobile-accordion-content')
            accordionHide(activeItem, content)
          })
          accordionShow(item, content)
        }
      })
    });
  });
  //-mobile accordion

  //+mobile menu
  if (document.querySelector('.header-menu')) {
    const headerMenu = document.querySelector('.header-menu');
    const headerMenutBtn = document.querySelectorAll('.js-toggle-menu-btn')
    headerMenutBtn.forEach(function (item) {
      item.addEventListener('click', function () {
        if (document.body.classList.contains('_menu-open')) {
          closeMenu();
        } else {
          openMenu();
        }
      })
    })
    if (document.querySelector('.header-menu')) {
      document.querySelector('.header-menu').addEventListener('click', function (e) {
        if (e.currentTarget == e.target) {
          closeMenu();
        }
      })
    }
    function openMenu() {
      headerMenutBtn.forEach(function (btn) {
        btn.classList.add('_active');
      });
      headerMenu.classList.add('_active');
      document.body.classList.add('_menu-open');
    }
    function closeMenu() {
      headerMenutBtn.forEach(function (btn) {
        btn.classList.remove('_active');
      });
      headerMenu.classList.remove('_active');
      document.body.classList.remove('_menu-open');
    }
  }

  //mobile menu accordion
  document.querySelectorAll('.header-menu').forEach(function (menuAccordion) {
    menuAccordion.querySelectorAll('.header-menu__link').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (window.innerWidth > 1024)
          return
        e.preventDefault();
        let item = btn.closest('.header-menu__item');
        let content = item.querySelector('.header-menu__drop')
        if (item.classList.contains('_active')) {
          accordionHide(item, content)
        } else {
          menuAccordion.querySelectorAll('.header-menu__item._active').forEach(function (activeItem) {
            let content = activeItem.querySelector('.header-menu__drop')
            accordionHide(activeItem, content)
          })
          accordionShow(item, content)
        }
      })
    });
  });
  //-mobile menu

  //+set review rating
  let reviewRating = document.querySelector('.js-set-rating');
  if (reviewRating) {
    let reviewRatingText = document.querySelector('.js-set-rating-text');
    let ratingInner = reviewRating.querySelector('.rating__inner');
    let ratingWidth = reviewRating.scrollWidth;
    let currentValue = '100%';
    let newValue = '100%';
    let currentTextValue = '5.0';
    let newTextValue = '5.0';
    function updateRating(x) {
      let width = Math.round(x / ratingWidth * 10) * 10;
      if (Number(width) < 25) {
        newValue = 20 + "%";
        newTextValue = 1 + '.0';
      } else if (Number(width) < 45) {
        newValue = 40 + "%";
        newTextValue = 2 + '.0';
      } else if (Number(width) < 65) {
        newValue = 60 + "%";
        newTextValue = 3 + '.0';
      } else if (Number(width) < 85) {
        newValue = 80 + "%";
        newTextValue = 4 + '.0';
      } else {
        newValue = 100 + "%";
        newTextValue = 5 + '.0';
      }
      ratingInner.style.width = newValue;
      reviewRatingText.textContent = newTextValue;
    }
    reviewRating.addEventListener('mouseenter', function (e) {
      currentValue = ratingInner.style.width;
      currentTextValue = reviewRatingText.textContent;
    })
    reviewRating.addEventListener('mousemove', function (e) {
      updateRating(e.clientX - reviewRating.getBoundingClientRect().left);
    })
    reviewRating.addEventListener('mouseleave', function () {
      ratingInner.style.width = currentValue;
      reviewRatingText.textContent = currentTextValue;
    })
    reviewRating.addEventListener('click', function (e) {
      currentValue = newValue;
      ratingInner.style.width = newValue;
      currentTextValue = newTextValue;
      reviewRatingText.textContent = newTextValue;
    })
    reviewRating.addEventListener('touchstart', function (e) {
      updateRating(e.touches[0].clientX - reviewRating.getBoundingClientRect().left);
      currentValue = newValue;
      ratingInner.style.width = newValue;
      currentTextValue = newTextValue;
      reviewRatingText.textContent = newTextValue;
    })
  }
  //-set review rating

  //+promo code 
  let promoCodeBtn = document.querySelector('.js-apply-promo-code');
  let payBtn = document.querySelector('.js-pay-btn');
  let promoField = document.querySelector('.promo-code-result');
  if (promoCodeBtn) {
    let promoCodeValue = 0.52;
    let promoCodeValid = true;
    promoCodeBtn.addEventListener('click', function (e) {
      if (promoCodeValid) {
        promoField.classList.remove('_error');
        promoField.classList.add('_activated');
        document.querySelector('.promo-code-result__value').textContent = euro.format(promoCodeValue);
        let btnValue = payBtn.getAttribute('data-total-origin');
        btnValue = btnValue - +promoCodeValue;
        document.querySelector('.js-set-btn-price').textContent = euro.format(btnValue);
      } else {
        promoField.classList.remove('_activated');
        promoField.classList.add('_error');
      }
    })
  }
  //-promo code 

  //+select card product + set price
  let totalPrice = document.querySelector('.js-set-price');
  let totalOldPrice = document.querySelector('.js-set-old-price');
  let btnPrice = document.querySelector('.js-set-btn-price');
  let orderName = document.querySelector('.js-set-order-name');
  let orderQuantity = document.querySelector('.js-set-order-quantity');
  document.querySelectorAll('.js-select-card').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let currentCard = btn.closest('.card-promo');
      if (!currentCard.classList.contains('_selected')) {
        document.querySelectorAll('.card-promo._selected').forEach(function (card) {
          card.classList.remove('_selected');
        });
        currentCard.classList.add('_selected');
        let name = currentCard.getAttribute('data-product');
        let quantity = currentCard.getAttribute('data-quantity');
        let price = currentCard.getAttribute('data-price');
        let oldPrice = currentCard.getAttribute('data-oldPrice');
        totalPrice.textContent = euro2.format(price);
        totalOldPrice.textContent = oldPrice;
        payBtn.setAttribute('data-total-origin', price)
        btnPrice.textContent = euro.format(price);
        orderQuantity.textContent = ' ' + quantity + ' ';
        orderName.textContent = name;
        if (promoField) {
          promoField.classList.remove('_activated');
          promoField.classList.remove('_error');
        }
      }
    })
  });
  //-select card product

  //+show sample link + promo code
  document.querySelectorAll('.js-hidden-box-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      let item = btn.closest('.js-hidden-box');
      let drop = item.querySelector('.js-hidden-box-content');
      if (item.classList.contains('_active')) {
        dropHide(item, drop)
      } else {
        dropShow(item, drop)
      }
    })
  });
  function dropShow(item, drop) {
    drop.style.maxHeight = drop.scrollHeight + "px";
    item.classList.add('_active');
    setTimeout(function () {
      drop.style.maxHeight = "";
    }, 400);
  }
  function dropHide(item, drop) {
    drop.style.maxHeight = drop.offsetHeight + "px";
    setTimeout(function () {
      item.classList.remove('_active');
    }, 10);
    setTimeout(function () {
      drop.style.maxHeight = "";
    }, 400);
  }
  //-show sample link + promo code

  //+ guarantee stats animation
  let guaranteeList = document.querySelector('.guarantee-item__text-list');
  if (guaranteeList) {
    let guaranteeCounters = document.querySelectorAll('.guarantee-item__counter');
    function counter(obj, duration) {
      let end = obj.getAttribute('data-counter') || 1018;
      let current = 0;
      let increment = end * 0.01;
      increment = increment < 1 ? 1 : increment;
      let step = Math.abs(Math.floor(duration / (end / increment))) || 3;
      let animIterval = setInterval(() => {
        current += increment;
        obj.textContent = Math.floor(current);
        if (current >= end) {
          clearInterval(animIterval);
          guaranteeList.classList.add('_animation');
          obj.textContent = Math.floor(end);
        }
      }, step);
    }
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          counter(entry.target, 500);
          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.5
    });
    guaranteeCounters.forEach(function (counter) {
      observer.observe(counter);
    });
  }
  //- guarantee stats animation

  //+ delivered product animation
  let deliveredAnimated = document.querySelector('.last-sale__likes-outer');
  if (deliveredAnimated) {
    let delay = deliveredAnimated.getAttribute('data-anim-delay') || 3500;
    let duration = deliveredAnimated.getAttribute('data-anim-duration') || 500;
    delay = +delay + +duration;
    let deliveredType = ['лайків', 'фоловерів', 'переглядів']
    let oldItem = deliveredAnimated.querySelector('.last-sale__likes-item:first-child');
    let quantity = 1000;
    setInterval(function () {
      deliveredAnimated.style.transition = duration + 'ms ease';
      deliveredAnimated.style.transform = 'translateX(-100%)'
      setTimeout(function () {
        oldItem = deliveredAnimated.querySelector('.last-sale__likes-item:first-child');
        deliveredAnimated.append(oldItem);
        deliveredAnimated.style.transition = '';
        deliveredAnimated.style.transform = 'translateX(0)';
        quantity = (Math.floor(Math.random() * 10 + 1) * 100) + ' ' + deliveredType[Math.floor(Math.random() * 3)];
        oldItem.querySelector('.last-sale__likes-text').textContent = quantity;
        oldItem.querySelector('.last-sale__time').textContent = Math.floor(Math.random() * 9 + 1) + ' хв. тому';
      }, duration);
    }, delay);
  }
  //- delivered product animation

  //+float header 
  let header = document.querySelector('.header');
  let wScroll = window.scrollY;
  window.addEventListener('scroll', function () {
    wScroll = window.scrollY;
    if (wScroll > 10) {
      header.classList.add('_fixed');
    } else {
      header.classList.remove('_fixed');
    }
  });
  //-float header 

  //+tabs
  document.querySelectorAll('.js-tab').forEach(function (item) {
    item.addEventListener('click', function () {
      if (this.classList.contains('_active')) return;

      let tabsBtn = this.closest('.js-tabs');
      tabsBtn.querySelectorAll('.js-tab._active').forEach(function (btn) {
        btn.classList.remove('_active');
      });
      this.classList.add('_active');

      let tabsContent = tabsBtn.nextElementSibling;
      if (tabsContent.classList.contains('js-tabs-content')) {
        let index = elIndex(this);
        let tabContentList = tabsContent.children;
        for (let i = 0; i < tabContentList.length; i++) {
          if (i == index) {
            tabContentList[i].classList.add('_active');
            if (tabContentList[i].querySelector('.slider-autoplay'))
              tabContentList[i].querySelector('.slider-autoplay').swiper.autoplay.start();
          } else {
            tabContentList[i].classList.remove('_active');
            if (tabContentList[i].querySelector('.slider-autoplay'))
              tabContentList[i].querySelector('.slider-autoplay').swiper.autoplay.stop();
          }
        }
      }
    })
  })
  //-tabs

  //+range-slider
  let sliderCalc = document.querySelector('.calc__slider');
  if (sliderCalc) {
    let iconHeart = '<svg width="24" height="24"><use href="images/svg-icons.svg#users"></use></svg>'
    let costFieldCalc = document.querySelector('.calc__cost');
    noUiSlider.create(sliderCalc, {
      start: 50,
      connect: [true, false],
      /* range: {
        'min': 0,
        'max': 5000
      }, */
      range: {
        'min': [0, 10],
        '10%': [1000, 100],
        'max': [10000]
      },
      tooltips: {
        to: function (value) {
          return (parseInt(value) + iconHeart);
        }
      },
    });
    sliderCalc.noUiSlider.on('set', function (values) {
      costFieldCalc.innerHTML = euro2.format(Math.ceil(values * 0.053 * 100) / 100);
    });
    sliderCalc.noUiSlider.on('slide', function (values) {
      costFieldCalc.innerHTML = euro2.format(Math.ceil(values * 0.053 * 100) / 100);
    });
    costFieldCalc.innerHTML = euro2.format(Math.ceil(sliderCalc.noUiSlider.options.start * 0.053 * 100) / 100);
  }
  //-range-slider

  //+anchor-scroll
  document.querySelectorAll('[data-anchor]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      let targetId = this.getAttribute('href') || '#' + this.getAttribute('data-anchor');
      if (!targetId) return;
      e.preventDefault();
      let elementY = document.querySelector(targetId).getBoundingClientRect().top - 60 + window.scrollY
      if (window.CSS.supports('scroll-behavior', 'smooth')) {
        window.scrollTo({
          top: elementY,
          behavior: 'smooth'
        })
      } else {
        doScrolling(elementY, 0.5);
      }
    })
  })
  function doScrolling(elementY, speed) {
    let startingY = window.scrollY;
    let diff = elementY - startingY;
    if (diff == 0)
      return
    let start;
    let duration = Math.abs(speed * diff);
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      let time = timestamp - start;
      let percent = Math.min(time / duration, 1);
      window.scrollTo(0, startingY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    })
  };
  //-anchor-scroll

  //+accordion
  document.querySelectorAll('.js-accordion').forEach(function (accordion) {
    accordion.querySelectorAll('.js-accordion-item-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        let item = btn.closest('.js-accordion-item');
        let content = item.querySelector('.js-accordion-content')
        if (item.classList.contains('_active')) {
          accordionHide(item, content)
        } else {
          accordion.querySelectorAll('.js-accordion-item._active').forEach(function (activeItem) {
            let content = activeItem.querySelector('.js-accordion-content')
            accordionHide(activeItem, content)
          })
          accordionShow(item, content)
        }
      })
    });
  });
  function accordionShow(item, content) {
    content.style.maxHeight = content.scrollHeight + "px";
    item.classList.add('_active');
    setTimeout(function () {
      content.style.maxHeight = "";
    }, 400);
  }
  function accordionHide(item, content) {
    content.style.maxHeight = content.offsetHeight + "px";
    item.offsetHeight;
    item.classList.remove('_active');
    content.style.maxHeight = "";
  }
  //-accordion

  //+slider
  let sliderPaginationAssist = {
    init: function (swiper) {
      let bullets = swiper.pagination.el.querySelectorAll('.swiper-pagination-bullet i');
      bullets.forEach(function (item) {
        item.style.animationDuration = promoAutoplay + 'ms';
      });
    },
    sliderMove: function (swiper) {
      let bullet = swiper.pagination.el.querySelector('.swiper-pagination-bullet-active i');
      if (!bullet.style.animationPlayState) {
        bullet.style.animationName = 'none';
        bullet.offsetHeight;
        bullet.style.animationName = null;
        bullet.style.animationPlayState = 'paused'
        swiper.autoplay.stop();
      }
    },
    touchEnd: function (swiper) {
      let bullet = swiper.pagination.el.querySelector('.swiper-pagination-bullet-active i');
      if (bullet.style.animationPlayState) {
        bullet.style.animationPlayState = null;
        swiper.autoplay.start()
      }
    },
  };
  let sliderPagination = {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 4
    ,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"><i></i></span>';
    }
  };
  let promoAutoplay = 5000;
  document.querySelectorAll('.slider-promo').forEach(function (container, index) {
    container.classList.add('slider-promo-' + index);
    let swiperPromo = new Swiper(".slider-promo-" + index, {
      slidesPerView: 'auto',
      spaceBetween: 19,
      touchEventsTarget: 'container',
      observer: true,
      observeParents: true,
      autoplay: {
        delay: promoAutoplay,
        disableOnInteraction: false,
      },
      pagination: sliderPagination,
      on: sliderPaginationAssist,
    });
  })

  //review
  let reviewAutoplau = 5000;
  document.querySelectorAll('.slider-review').forEach(function (container, index) {
    container.classList.add('slider-review-' + index);
    let swiperReview = new Swiper(".slider-review-" + index, {
      slidesPerView: 'auto',
      spaceBetween: 18,
      touchEventsTarget: 'container',
      observer: true,
      observeParents: true,
      autoplay: {
        delay: reviewAutoplau,
        disableOnInteraction: false,
      },
      pagination: sliderPagination,
      on: sliderPaginationAssist,
    });
  })

  //team
  let teamAutoplau = 5000;
  document.querySelectorAll('.slider-team').forEach(function (container, index) {
    container.classList.add('slider-team-' + index);
    let swiperTeam = new Swiper(".slider-team-" + index, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      touchEventsTarget: 'container',
      observer: true,
      observeParents: true,
      autoplay: {
        delay: teamAutoplau,
        disableOnInteraction: false,
      },
      pagination: sliderPagination,
      on: sliderPaginationAssist,
    });
  })
  let storyActiveSlider = 0;
  let swiperOurStory = new Swiper(".slider-our-story", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    direction: 'vertical',
    touchReleaseOnEdges: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
      draggable: true,
      snapOnRelease: true,
    },
    mousewheel: {
      enabled: true,
      releaseOnEdges: true,
    },
    on: {
      init: function () {
        storyActiveSlider = this.activeIndex;
        setSlideHeight(this, true);
      },
      resize: function () {
        setSlideHeight(this, false);
      },
      transitionEnd: function () {
        setSlideHeight(this, false);
      },
    }
  });
  function setSlideHeight(el, forced) {
    if (storyActiveSlider == el.activeIndex && !forced)
      return

    storyActiveSlider = el.activeIndex;
    let spaceBetween = el.params.spaceBetween;
    let slidesHeight = el.slides[el.activeIndex].offsetHeight;

    if (el.slides[el.activeIndex + 1]) {
      slidesHeight += el.slides[el.activeIndex + 1].offsetHeight + spaceBetween;
      if (el.slides[el.activeIndex + 2]) {
        slidesHeight += el.slides[el.activeIndex + 2].offsetHeight + spaceBetween;
      } else {
        if (el.slides[el.activeIndex - 1])
          slidesHeight += el.slides[el.activeIndex - 1].offsetHeight + spaceBetween;
      }
    } else {
      if (el.slides[el.activeIndex - 1])
        slidesHeight += el.slides[el.activeIndex - 1].offsetHeight + spaceBetween;
      if (el.slides[el.activeIndex - 1])
        slidesHeight += el.slides[el.activeIndex - 2].offsetHeight + spaceBetween;
    }
    el.el.style.height = slidesHeight + "px";
  }
  //-slider
});

var euro = Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
var euro2 = Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' });

function elIndex(el) {
  if (!el) return -1;
  var i = 0;
  while (el = el.previousElementSibling) {
    i++;
  }
  return i;
}

function throttle(func, limit) {
  let lastFunc
  let lastRan
  return function () {
    const context = this
    const args = arguments
    if (!lastRan) {
      func.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}