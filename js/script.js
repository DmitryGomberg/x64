class DynamicAdapt {
   constructor(type) {
      this.type = type;
   }

   init() {
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = [...document.querySelectorAll('[data-da]')];

      // наполнение оbjects объктами
      this.nodes.forEach((node) => {
         const data = node.dataset.da.trim();
         const dataArray = data.split(',');
         const оbject = {};
         оbject.element = node;
         оbject.parent = node.parentNode;
         оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
         оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
         оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.оbjects.push(оbject);
      });

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = this.оbjects
         .map(({
            breakpoint
         }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
         .filter((item, index, self) => self.indexOf(item) === index);

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaQueries.forEach((media) => {
         const mediaSplit = media.split(',');
         const matchMedia = window.matchMedia(mediaSplit[0]);
         const mediaBreakpoint = mediaSplit[1];

         // массив объектов с подходящим брейкпоинтом
         const оbjectsFilter = this.оbjects.filter(
            ({
               breakpoint
            }) => breakpoint === mediaBreakpoint
         );
         matchMedia.addEventListener('change', () => {
            this.mediaHandler(matchMedia, оbjectsFilter);
         });
         this.mediaHandler(matchMedia, оbjectsFilter);
      });
   }

   // Основная функция
   mediaHandler(matchMedia, оbjects) {
      if (matchMedia.matches) {
         оbjects.forEach((оbject) => {
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
         });
      } else {
         оbjects.forEach(
            ({
               parent,
               element,
               index
            }) => {
               if (element.classList.contains(this.daClassname)) {
                  this.moveBack(parent, element, index);
               }
            }
         );
      }
   }

   // Функция перемещения
   moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
         destination.append(element);
         return;
      }
      if (place === 'first') {
         destination.prepend(element);
         return;
      }
      destination.children[place].before(element);
   }

   // Функция возврата
   moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
         parent.children[index].before(element);
      } else {
         parent.append(element);
      }
   }

   // Функция получения индекса внутри родителя
   indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
   }

   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   arraySort(arr) {
      if (this.type === 'min') {
         arr.sort((a, b) => {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }
               if (a.place === 'first' || b.place === 'last') {
                  return -1;
               }
               if (a.place === 'last' || b.place === 'first') {
                  return 1;
               }
               return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
         });
      } else {
         arr.sort((a, b) => {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }
               if (a.place === 'first' || b.place === 'last') {
                  return 1;
               }
               if (a.place === 'last' || b.place === 'first') {
                  return -1;
               }
               return b.place - a.place;
            }
            return b.breakpoint - a.breakpoint;
         });
         return;
      }
   }
}

const da = new DynamicAdapt("max");
da.init();



var swipedvsr = new Swiper(".swiper-container-s1", {
   pagination: {
      el: ".swiper-pagination-s1",
      clickable: true,
   },
   spaceBetween: 30,
});

var swiper = new Swiper(".swiper-container-s2", {
   navigation: {
      nextEl: ".swiper-button-next-s2",
      prevEl: ".swiper-button-prev-s2",
   },
   breakpoints: {
      // when window width is >= 320px
      300: {
         slidesPerView: 1.5,
         spaceBetween: 15,
      },
      // when window width is >= 480px
      500: {
         slidesPerView: 3.3,
         spaceBetween: 16,
      },
      // when window width is >= 640px
      800: {
         slidesPerView: 4.3,
         spaceBetween: 32,
      }
   }
});
var swidsvsvper = new Swiper(".swiper-container-s3", {
   navigation: {
      nextEl: ".swiper-button-next-s3",
      prevEl: ".swiper-button-prev-s3",
   },
   breakpoints: {
      // when window width is >= 320px
      300: {
         slidesPerView: 1.2,
         spaceBetween: 15,
      },
      // when window width is >= 480px
      500: {
         slidesPerView: 1.5,
         spaceBetween: 16,
      },
      // when window width is >= 640px
      800: {
         slidesPerView: 2.2,
         spaceBetween: 32,
      }
   }
});
var swidsvsvxczper = new Swiper(".swiper-container-s4", {
   navigation: {
      nextEl: ".swiper-button-next-s4",
      prevEl: ".swiper-button-prev-s4",
   },
   breakpoints: {
      // when window width is >= 320px
      300: {
         slidesPerView: 3.3,
         spaceBetween: 15,
      },
      // when window width is >= 480px
      500: {
         slidesPerView: 4.3,
         spaceBetween: 16,
      },
      // when window width is >= 640px
      800: {
         slidesPerView: 5.3,
         spaceBetween: 24,
      },
      1500: {
         slidesPerView: 6.5,
         spaceBetween: 32,
      }
   }
});

$(document).ready(function () {
   const w = $(document).width();
   console.log(w);
   if (w < '600') {
      $('.header__close-mob-menu, .header__bottom-icon-menu').click(function (event) {
         $('.header__menu-mob').toggleClass('active');
         $('body').toggleClass('lock');
      });
      $('.footer__col-title').addClass('panel-heading');
   } else {
      $('.header__menu-close-mnu, .header__bottom-menu, .header__bottom-icon-menu').click(function (event) {
         $('.header__menu').toggleClass('active');
         $('body').toggleClass('lock');
         $('.menu__open').toggleClass('close');
      });
      $('.footer__col-title').removeClass('panel-heading');
   };
   $('.header__bottom-search, .header__close-mob-search, .header__bottom-icon-search').click(function (event) {
      $('.header__search').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   $('.header__close-mob-filter, .filter__open').click(function (event) {
      $('.header__filter').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   $('.header__bottom-icon-img-user, .header__close-mob-cart-invite, .header__bottom-link-user').click(function (event) {
      $('.header__invite').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   if (w < '960') {
      $('.s2-slide-link').text('Добавить');
   }

   $('.header__registr-link-on-login, .header__close-mob-cart-login, .header__invite-login-registr').click(function (event) {
      $('.header__login').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   $('.header__close-mob-cart-accaunt, .arrow-menu-accaunt').click(function (event) {
      $('.header__accaunt').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   if (w < '490') {
      $('.a-s1-tab').click(function (event) {
         $('.header__accaunt').toggleClass('active');
         $('body').toggleClass('lock');
         event.preventDefault();
      });
   }
   $('.header__close-mob-cart-registr, .header__login-regist').click(function (event) {
      $('.header__registr').toggleClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   $('.header__registr-link-on-login').click(function (event) {
      $('.header__registr').toggleClass('active');
      $('.header__login').addClass('active');
      $('body').toggleClass('lock');
      event.preventDefault();
   });
   let header = $('.header__bottom');
   $(window).scroll(function () {
      if ($(this).scrollTop() > 5) {
         header.addClass('header_fixed');

      } else {
         header.removeClass('header_fixed');
      }
      if ($(this).scrollTop() > 370) {
         $('.filter__open').addClass('fix');
      } else {
         $('.filter__open').removeClass('fix');
      }
   });
   var myvalue = $('.header__bottom-icon-num').data('value');
   $('.header__bottom-icon-bag, .header__close-mob-cart, .header__close-mob-cartf').click(function (event) {
      if (myvalue > 0) {
         $('.header__cartf').toggleClass('active');
         $('body').toggleClass('lock');
         event.preventDefault();
      } else {
         $('.header__cart-empty').toggleClass('active');
         $('body').toggleClass('lock');
         event.preventDefault();
      }
   });
   $('.header__search-reset').click(function (event) {
      $('.header__search-new').addClass('hide');
   });
   $(".tab_item").hide();
   $(".tab_item").eq(1).fadeIn();
   $(".tab").click(function () {
      $(".tab").removeClass("active").eq($(this).index()).addClass("active");
      $(".tab_item").hide().eq($(this).index()).fadeIn();
   }).eq(1).addClass("active");

   $(".tab_item-1").hide();
   $(".tab_item-1").eq(0).fadeIn();
   $(".tab-1").click(function () {
      $(".tab-1").removeClass("active").eq($(this).index()).addClass("active");
      $(".tab_item-1").hide().eq($(this).index()).fadeIn();
   }).eq(0).addClass("active");



   $('.panel-heading').removeClass('in').next().slideUp();
   $('.panel-heading').click(function () {
      $(this).toggleClass('in').next().slideToggle();
      $('.panel-heading').not(this).removeClass('in').next().slideUp();
      event.preventDefault();
   });
});