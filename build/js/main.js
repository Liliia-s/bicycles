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
  // var formButtom = document.querySelector('.form-btn');
  var MIN_TITLE_LENGTH = 22;

  var phoneMask = function () {
    window.iMask.phone(inputTel, {
      mask: '+{7} (000) 000 - 00 - 00',
    });
  };

  phoneMask();

  var onInputTelInput = function () {
    var numberLength = inputTel.value.length;

    if (numberLength < MIN_TITLE_LENGTH) {
      inputTel.setCustomValidity('Введите пожалуйста 10 цифр номера телефона.');
    } else {
      inputTel.setCustomValidity('');
    }
    inputTel.reportValidity();
  };

  inputTel.addEventListener('input', onInputTelInput);

})();
