const { format } = require('date-fns');
const { ko } = require('date-fns/locale/ko');
/**
 * 시간 포맷 함수
 * @param date iso 날짜
 * @param dateFormat 포맷형식(선택)
 */
export const formatToUtc = (
  date: Date | string | null | undefined,
  dateFormat?: string,
): string => {
  return date
    ? format(new Date(date), dateFormat ?? 'yyyy-MM-dd HH:mm', {
        locale: ko,
      })
    : '-';
};
