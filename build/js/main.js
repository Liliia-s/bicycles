'use strict';

let header = document.querySelector('.site-header');
let menu = header.querySelector('.site-menu');
let menuButton = header.querySelector('.site-header__btn-menu');
let promoWrap = header.querySelector('.promo__wrapper');
let logoWrapper = header.querySelector('.site-header__logo-wrapper');
let buttonMenu = header.querySelector('.site-header__btn-menu');
let inputTel = header.querySelector('.form__input--tel');

let hideMenu = function () {
  menu.classList.toggle('site-menu--hide');
  promoWrap.classList.toggle('promo__wrapper--indents');
  logoWrapper.classList.toggle('site-header__logo-wrapper--indent');
  buttonMenu.classList.add('site-header__btn-menu--open');
};

hideMenu();

let buttonMenuOnClick = function () {
  hideMenu();
  buttonMenu.classList.toggle('site-header__btn-menu--close');
};

buttonMenu.addEventListener('click', buttonMenuOnClick);

let phoneMask = IMask(inputTel, {
    mask: '+{7} (000) 000 - 00 - 00'
  });
