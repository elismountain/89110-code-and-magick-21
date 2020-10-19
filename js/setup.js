'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var NUM_WIZARDS = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomName = function (name, surname) {
  return getRandomElement(name) + ' ' + getRandomElement(surname);
};
// создаю шаблон волшебника

var createWizard = function () {
  var wizard = {
    name: getRandomName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT),
    eyesColor: getRandomElement(WIZARD_EYES)
  };
  return wizard;
};

// создаю пустой массив
var wizards = [];

// создаю цикл до 4 волшебников
for (var i = 0; i < NUM_WIZARDS; i++) {
  wizards.push(createWizard());
}

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

// 9. Учебный проект: одеть Надежду

var setupWindowOpen = document.querySelector('.setup-open');
var setupWindowClose = document.querySelector('.setup-close');
setupWindowClose.setAttribute('tabindex', 0);
var setupUserName = document.querySelector('.setup-user-name');
setupUserName.setAttribute('minlength', 2);
setupUserName.setAttribute('maxlength', 25);
var setupOpenIcon = setupWindowOpen.querySelector('.setup-open-icon');
setupOpenIcon.setAttribute('tabindex', 0);


var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target.className !== 'setup-user-name') {
      closePopup();
    }
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  userDialog.addEventListener('click');
};

setupWindowOpen.addEventListener('click', function () {
  openPopup();
});

setupWindowOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupWindowClose.addEventListener('click', function () {
  closePopup();
});

setupWindowClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var onUserInputValidity = function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity(' ');
  }

  setupUserName.reportValidity();
};

setupUserName.addEventListener(`invalid`, onUserInputValidity);
