$(document).ready(function () {

  // Lang
  $('.lang').on('click', function() {
    $(this).toggleClass('lang--open');
    $('.lang__list').slideToggle(200);
  });

  // Modal
  $('.modal__close, .modal__line').on('click', function(e) {
    e.preventDefault();
    $('.modal').slideUp(200);
  })

  $('.open-modal--info').on('click', function(e) {
    e.preventDefault();
    $('.modal--info').slideToggle(200);
  });

  $('.open-modal--recipient').on('click', function(e) {
    e.preventDefault();
    $('.modal--recipient').slideToggle(200);
  });

  $('.open-modal--name').on('click', function(e) {
    e.preventDefault();
    $('.modal--name').slideToggle(200);
  });

  $('body').mouseup(function (e) {
    let modalContent = $(".modal__box");
    if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
      $('.modal').fadeOut(200);
    }
  });

  // Nav
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');

    function updateMenuVisibility() {
      const isKeyboardOpen = window.visualViewport.height < window.innerHeight;
      nav.style.display = isKeyboardOpen ? 'none' : 'block';
    }

    // Обновляем при изменении визуального вьюпорта (работает при появлении клавиатуры)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateMenuVisibility);
    }

    // На всякий случай — слушаем фокус и блюр
    document.querySelectorAll('input, textarea').forEach((input) => {
      input.addEventListener('focus', updateMenuVisibility);
      input.addEventListener('blur', () => {
        // Ждём чуть-чуть, вдруг переходит на другое поле
        setTimeout(updateMenuVisibility, 50);
      });
    });
  });



  let startY = 0;
  let pulling = false;
  let pulledEnough = false;

  document.addEventListener('touchstart', (e) => {
    if (document.scrollingElement.scrollTop === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (!pulling) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 60) {
      document.getElementById('pull-to-refresh').style.top = '0px';
      pulledEnough = true;
    }
  });

  document.addEventListener('touchend', () => {
    if (pulledEnough) {
      location.reload(); // Принудительное обновление
    } else {
      document.getElementById('pull-to-refresh').style.top = '-50px';
    }
    pulling = false;
    pulledEnough = false;
  });

});