
// Функция для проверки длины строки.
// Удаление пробелов автоматом происходит.
// Сделал локальный обзор операторов. 'string' хочется дважды использовать.

{const getCheckString = (string, amountLetters) => {
  const newString = string.replaceAll(' ', '');

  if (newString.length < amountLetters) {
    return true;
  }

  if (newString.length >= amountLetters) {
    return false;
  }
};

getCheckString('Привет, как дела', 15); //true
getCheckString('Привет, как дела', 14); //false
}


// Функция для проверки, является ли строка палиндромом.
// Удаление пробелов автоматом происходит
// Регистры не учитываются

{const getPalindrome = (string) => {
  const newString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = newString.split('').reverse().join('');
  if (newString === reverseString) {
    return true;
  }

  return false;
};

getPalindrome('sйй'); //false
getPalindrome('s'); //true
getPalindrome('ДоВоД'); //true
}


// Функция для извлечения целого положительного числа из строк
// Пробелы, длинные строки учитываются с помощью Global range
// Класс /d = минус все слова

{const leaveOnlyLetters = (string) => {
  const newString = string.replace(/\D/g, '');
  if (newString.length === 0) {
    return NaN;
  }
  return newString;
};

leaveOnlyLetters('!@#$%   ^&*()      _+=-~[]{}       ;:/.,<>?|""      1234567890'); //1234567890
leaveOnlyLetters('!@#$%   ^&*()      _+=-~[]{}       ;:/.,<>?|""      '); //NaN

}
