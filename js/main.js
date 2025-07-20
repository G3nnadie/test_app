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

  let startY = 0;
  let isPulling = false;

  document.addEventListener('touchstart', (e) => {
    if (document.scrollingElement.scrollTop === 0) {
      startY = e.touches[0].clientY;
      isPulling = true;
    }
  });

  document.addEventListener('touchmove', (e) => {
    if (!isPulling) return;

    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 60) {
      document.body.classList.add('pull-refreshing');
    }
  });

  document.addEventListener('touchend', () => {
    if (document.body.classList.contains('pull-refreshing')) {
      // Обновляем страницу
      location.reload();
    }
    isPulling = false;
    document.body.classList.remove('pull-refreshing');
  });

  document.addEventListener('touchstart', () => {
  alert('touchstart работает!');
});

});