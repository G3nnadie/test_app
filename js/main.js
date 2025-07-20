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
    modalIsOpen = false;
  })

  $('.open-modal--info').on('click', function(e) {
    e.preventDefault();
    $('body').addClass('no-scroll');
    $('.modal--info').slideDown(200);
    modalIsOpen = true;
  });

  $('.open-modal--recipient').on('click', function(e) {
    e.preventDefault();
    $('body').addClass('no-scroll');
    $('.modal--recipient').slideDown(200);
    modalIsOpen = true;
  });

  $('.open-modal--name').on('click', function(e) {
    e.preventDefault();
    $('body').addClass('no-scroll');
    $('.modal--name').slideDown(200);
    modalIsOpen = true;
  });

  $('body').mouseup(function (e) {
    let modalContent = $(".modal__box");
    if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
      $('.modal').slideUp(200);
      modalIsOpen = false;
      $('body').removeClass('no-scroll');
    }
  });

  const modals = document.querySelectorAll('.modal');

  modals.forEach(modal => {
    const modalBox = modal.querySelector('.modal__box');
    let startY = 0;
    let endY = 0;

    modalBox.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    modalBox.addEventListener('touchmove', (e) => {
      endY = e.touches[0].clientY;
    });

    modalBox.addEventListener('touchend', () => {
      const diff = endY - startY;
      const minSwipeDistance = 80;

      if (diff > minSwipeDistance) {
        $('.modal').slideUp(200);
        modalIsOpen = false;
        $('body').removeClass('no-scroll');
      }
    });
  });

  // Input only number
  const input = document.querySelector('.input-num');
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
  });

  // Nav
  let isInputFocused = false;

  const nav = document.querySelector('.nav');

  document.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('focus', () => {
      isInputFocused = true;
      nav.style.display = 'none';
    });

    input.addEventListener('blur', () => {
      // Ждём и проверяем, остался ли кто-то с фокусом
      setTimeout(() => {
        if (!document.querySelector('input:focus, textarea:focus')) {
          isInputFocused = false;
          nav.style.display = 'block';
        }
      }, 50);
    });
  });

  // Update page
  let modalIsOpen = false; // флаг, который надо устанавливать при открытии/закрытии модалки

  let startY = 0;
  let pulling = false;
  let pulledEnough = false;

  document.addEventListener('touchstart', (e) => {
    if (modalIsOpen) return; // Если модалка открыта — не начинаем свайп вниз
    if (document.scrollingElement.scrollTop === 0) {
      startY = e.touches[0].clientY;
      pulling = true;
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (modalIsOpen) return; // Если модалка открыта — игнорируем свайпы вниз
    if (!pulling) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 60) {
      document.getElementById('pull-to-refresh').style.top = '0px';
      pulledEnough = true;
    }
  });

  document.addEventListener('touchend', () => {
    if (modalIsOpen) return; // Если модалка открыта — не обновляем страницу
    if (pulledEnough) {
      location.reload(); // Обновление страницы
    } else {
      document.getElementById('pull-to-refresh').style.top = '-50px';
    }
    pulling = false;
    pulledEnough = false;
  });

});