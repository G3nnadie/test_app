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

});