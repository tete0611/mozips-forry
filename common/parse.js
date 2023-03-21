module.exports = {
  /** @param {number} num  */
  parseDayToString: num => {
    switch (num) {
      case 0:
        return '일';
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      case 7:
        return '모든';
    }
  },

  /**
   * 요일별 image url 반환 함수
   * @param {Date} date 오늘날짜
   * @typedef {Object} Topic
   * @property {string} ko 한글토픽카드
   * @property {string} en 영어토픽카드
   * @returns {Topic}
   */
  getImageUrl: date => {
    switch (date.getDay()) {
      case 1:
        return {
          en: 'https://i.esdrop.com/d/f/jXycTwE2IA/JbQxHVQjDf.png',
          ko: 'https://i.esdrop.com/d/f/jXycTwE2IA/wgnSDsV87P.png',
        };
      case 2:
        return {
          en: 'https://i.esdrop.com/d/f/jXycTwE2IA/gQNsPGTYUX.png',
          ko: 'https://i.esdrop.com/d/f/jXycTwE2IA/3FraytNwMn.png',
        };
      case 3:
        return {
          en: 'https://i.esdrop.com/d/f/jXycTwE2IA/MIcVjeizFw.png',
          ko: 'https://i.esdrop.com/d/f/jXycTwE2IA/erk0XMYbhM.png',
        };
      case 4:
        return {
          en: 'https://i.esdrop.com/d/f/jXycTwE2IA/suUEE2K96A.png',
          ko: 'https://i.esdrop.com/d/f/jXycTwE2IA/GS3mIfFkC7.png',
        };
      case 5:
        return {
          en: 'https://i.esdrop.com/d/f/jXycTwE2IA/EV9yuQ6I5T.png',
          ko: 'https://i.esdrop.com/d/f/jXycTwE2IA/VAHq8KaPsj.png',
        };
      default:
        return {
          en: 'https://i.esdrop.com/d/f/jXycTwE2IA/JbQxHVQjDf.png',
          ko: 'https://i.esdrop.com/d/f/jXycTwE2IA/wgnSDsV87P.png',
        };
    }
  },
};
