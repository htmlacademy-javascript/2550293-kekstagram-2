const checkWorkTime = (startDayInHours, endDayInHours, startMeetingInHour, TimesMeeting) => {
  const startDay = startDayInHours.split(':');
  const endDays = endDayInHours.split(':');
  const startMeeting = startMeetingInHour.split(':');

  const removeLeadingZero = (time) => {
    if (time.startsWith('0')) {
      return time.slice(1);
    }
    return time;
  };

  const getTimeInMinutes = () => {
    const convertToMinutes = (hours, minutes) => Number(hours) * 60 + Number(minutes);
    const startDayInMinutes = convertToMinutes(...startDay.map(removeLeadingZero));
    const endDaysInMinutes = convertToMinutes(...endDays.map(removeLeadingZero));
    const startMeetingInMinutes = convertToMinutes(...startMeeting.map(removeLeadingZero));

    return {
      startDayInMinutes,
      endDaysInMinutes,
      startMeetingInMinutes
    };
  };
  const { startDayInMinutes: startTime, endDaysInMinutes: endTime, startMeetingInMinutes: meetingTime } = getTimeInMinutes();

  const getComparison = () => {
    const timeMeeting = TimesMeeting + meetingTime;
    return !(startTime > meetingTime || timeMeeting > endTime);
  }; return getComparison();
};

/* eslint-disable no-console */
console.log(checkWorkTime('08:00', '17:30', '14:00', 90)); // true
console.log(checkWorkTime('8:0', '10:0', '8:0', 120));// true
console.log(checkWorkTime('08:00', '14:30', '14:00', 90)); // false
console.log(checkWorkTime('14:00', '17:30', '08:0', 90));// false
console.log(checkWorkTime('8:00', '17:30', '08:00', 900)); // false
console.log('--------');
console.log(checkWorkTime('8:00', '17:30', '07:00', 900)); // false
console.log(checkWorkTime('8:00', '17:30', '07:00', 90)); // false
console.log(checkWorkTime('8:00', '7:30', '08:00', 900)); // false
console.log(checkWorkTime('8:00', '0:0', '08:00', 900)); // false
console.log(checkWorkTime('8:00', '8:30', '08:00', 9)); // true
console.log(checkWorkTime('8:00', '8:30', '08:00', 90)); // false


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


