//link
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

//slider
$(function(){
	$('.slider').slick({
		arrows: true,
    prevArrow: '<div class="slide-arrow prev-arrow"></div>',
    nextArrow: '<div class="slide-arrow next-arrow"></div>',
    centerMode: true,
    centerPadding: '33.333vw',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 751,
      settings: {
        centerMode: false
      }
    }
  ],
	});
});

//アコーディオン（WORKS）
document.addEventListener('DOMContentLoaded', () => {
    const accordionMenus = document.querySelectorAll('.accordion-menu');

    accordionMenus.forEach(menu => {
        const toggle = menu.querySelector('.accordion-toggle');
        const content = menu.querySelector('.accordion-content');

        if (!toggle || !content) {
            return;
        }

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-open');
            content.classList.toggle('is-open');

            if (content.classList.contains('is-open')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });

        content.style.maxHeight = '0';
    });
});

//アコーディオン（OVERVIEW）
document.addEventListener('DOMContentLoaded', () => {
    const accordionMenus = document.querySelectorAll('.js-accordion-menu');
    const breakpoint = 750;

    accordionMenus.forEach(menu => {
        const toggle = menu.querySelector('.js-accordion-toggle');
        const content = menu.querySelector('.js-accordion-content');

        if (!toggle || !content) return;

        toggle.addEventListener('click', () => {
            if (window.innerWidth <= breakpoint) {
                toggle.classList.toggle('is-open');
                content.classList.toggle('is-open');

                if (content.classList.contains('is-open')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
            }
        });

        const handleResize = () => {
            if (window.innerWidth > breakpoint) {
                toggle.classList.remove('is-open');
                content.classList.remove('is-open');
                content.style.maxHeight = 'none';
            } else {
                if (!content.classList.contains('is-open')) {
                    content.style.maxHeight = '0';
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
    });
});
