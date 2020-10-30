'use strict';

(function () {
  var header = document.querySelector('.site-header');
  var menu = header.querySelector('.site-menu');
  var promoWrap = header.querySelector('.promo__wrapper');
  var logoWrapper = header.querySelector('.site-header__logo-wrapper');
  var buttonMenu = header.querySelector('.site-header__btn-menu');

  var hideMenu = function () {
    menu.classList.toggle('site-menu--hide');
    promoWrap.classList.toggle('promo__wrapper--indents');
    logoWrapper.classList.toggle('site-header__logo-wrapper--indent');
    buttonMenu.classList.add('site-header__btn-menu--open');
  };

  hideMenu();

  var onButtonMenuClick = function () {
    hideMenu();
    buttonMenu.classList.toggle('site-header__btn-menu--close');
  };

  buttonMenu.addEventListener('click', onButtonMenuClick);
})();

(function () {
  var inputTel = document.getElementById('field-tel');

  var phoneMask = function () {
    window.iMask.setiMask(inputTel, {
      mask: '+{7} (000) 000 - 00 - 00'
    });
  };

  phoneMask();
})();
