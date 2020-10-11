'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomName = function (name, surname) {
  return getRandomElement(name) + ' ' + getRandomElement(surname);
};

var wizards = [
  {
    name: getRandomName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT),
    eyesColor: getRandomElement(WIZARD_EYES)
  },
  {
    name: getRandomName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT),
    eyesColor: getRandomElement(WIZARD_EYES)
  },
  {
    name: getRandomName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT),
    eyesColor: getRandomElement(WIZARD_EYES)
  },
  {
    name: getRandomName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: getRandomElement(WIZARD_COAT),
    eyesColor: getRandomElement(WIZARD_EYES)
  }
];

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

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
