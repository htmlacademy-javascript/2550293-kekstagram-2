
// Функция для проверки длины строки.
// Удаление пробелов автоматом происходит.
// Сделал локальный обзор операторов. 'string' хочется дважды использовать.

const checkStringLength = (str, maxLength) => str.length <= maxLength;

checkStringLength ('Привет, как дела', 15); //true
checkStringLength ('Привет, как дела', 14); //false
checkStringLength('проверяемая строка', 18); // true


// Функция для проверки, является ли строка палиндромом.
// Удаление пробелов автоматом происходит
// Регистры не учитываются

const checkPalindrome = (string) => {
  const newString = string.toLowerCase().replace(/\s/g, '');
  const reverseString = newString.split('').reverse().join('');
  return newString === reverseString;
};

checkPalindrome('sйй'); //false
checkPalindrome('s'); //true
checkPalindrome('ДоВоД'); //true


// Функция для извлечения целого положительного числа из строк
// Пробелы, длинные строки учитываются с помощью Global range
// Класс /d = минус все слова

const leaveOnlyLetters = (input) => {
  const str = String(input);
  const digits = str.match(/\d/g);
  if (!digits) {
    return NaN;
  }

  const result = parseInt(digits.join(''), 10);

  return result;
};

leaveOnlyLetters('!@#$%   ^&*()      _+=-~[]{}       ;:/.,<>?|""      1234567890'); //1234567890
leaveOnlyLetters('!@#$%   ^&*()      _+=-~[]{}       ;:/.,<>?|""      '); //NaN


