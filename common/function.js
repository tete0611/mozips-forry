const { format } = require('date-fns');
const { ko } = require('date-fns/locale/ko');

module.exports = {
  /**
   * 시간 포맷 함수
   * @param date iso 날짜
   * @param dateFormat 포맷형식(선택)
   */
  formatToUtc: (date, dateFormat) => {
    return date
      ? format(new Date(date), dateFormat ?? 'yyyy-MM-dd HH:mm', {
          locale: ko,
        })
      : '-';
  },
  /**
   * 한국시간 -> 영국시간(-9시간) 변환함수
   * @param data 날짜(date time)
   *
   */
  convertUTC: date => {
    if (typeof date === 'object' && date instanceof Date) {
      return date.setHours(date.getHours() - 9);
    } else if (typeof date === 'number') {
      return date >= 9 ? date - 9 : date + 15;
    }
  },
};
