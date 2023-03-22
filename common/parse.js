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
};
