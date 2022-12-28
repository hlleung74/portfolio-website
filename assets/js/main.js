document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Change navigation style when scroll
   */
  const header = document.querySelector(".header");
  const sectionOne = document.querySelector(".get-started");

  const sectionOneOptions = {
    rootMargin: "-200px 0px 0px 0px"
  };

  const sectionOneObserver = new IntersectionObserver(function(
    entries,
    sectionOneObserver
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        header.classList.add("nav-scrolled");
        document.getElementById("logoImg").src="assets/img/logos/logo-dark_without-bg.png";
        document.getElementById("brand-name").style="color: #35455D";

      } else {
        header.classList.remove("nav-scrolled");
        document.getElementById("logoImg").src="assets/img/logos/logo-light_without-bg.png";
        document.getElementById("brand-name").style="color: #f4f4f4";
      }
    });
  },
  sectionOneOptions);

  sectionOneObserver.observe(sectionOne);

  /*
   * Match Navigation Bar and current section
   */
  const sections = document.querySelectorAll("section");
  const navLi = document.querySelectorAll(".navbar ul li a");
  window.onscroll = () => {
  var current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id"); }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
};

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {
    jQuery(document).ready(function($){

      let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
      let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
      let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';
      
      var $container = $('.portfolio-container');
      $container.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort,
      });

      $('.portfolio-flters li').click(function(){
        $('.portfolio-flters .filter-active').removeClass('filter-active');
        $(this).addClass('filter-active');
           
        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          sortBy: portfolioSort,
        });
        return false;
      }); 

      /* Load More */
      var initShow = 3; //number of images loaded on init & onclick load more button
      var counter = initShow; //counter for load more button
      var iso = $container.data('isotope'); // get Isotope instance
      //console.log(iso.elemCount);
             
      loadMore(initShow); //execute function onload
           
      function loadMore(toShow) {
                
        $container.find(".hidden").removeClass("hidden");
                
        var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
          //console.log(item.element);
          return item.element;
        });
        $(hiddenElems).addClass('hidden');
        $container.isotope('layout');
                
        //when no more to load, hide show more button
        if (hiddenElems.length == 0) {
          $("#load-more").hide();
        } 
        else {
          $("#load-more").show();
        };

      }

      /* append load more button */
      $container.after('<div class="viewWorks"><a href="#" id="load-more">Load More</a></div>');
            
      //when load more button clicked
      $(document).on("click", "#load-more", function(e) {
        e.preventDefault();
                
        if ($('#filters').data('clicked')) {
          //when filter button clicked, set initial value for counter
          counter = initShow;
          j$('#filters').data('clicked', false);
        } else {
          counter = counter;
        };
                
        counter = counter + initShow;
                
        loadMore(counter);
      });
    });
  }

  
  

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Hero Header Resize
   */
  $.fn.resizeText=function () {
  var el=this;
  if (el.length>1) return el.each(function () {
    $(this).resizeText();
  });

var resizeText=function () {
  console.log(el.attr("class"));
    var fontsize=parseInt(el.css("font-size"));
    var width=el.width();
    var rentwidth=el.parent().width();
  console.log(width, rentwidth, fontsize);
    if (width<rentwidth){
    while (width<rentwidth) {
    el.css("font-size",fontsize++);
    width=el.width();
    }
    el.css("font-size",fontsize--);
    return;
    }
    while (width>rentwidth) {
    el.css("font-size",fontsize--);
    width=el.width();
    }
    return;
    }
resizeText();
$(window).on("resize",resizeText);
;
};
$(".hero-header").resizeText();
 


});