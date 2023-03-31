const foods = [
  {
    name: '청년찌개',
    distance: 227,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%B2%AD%EB%85%84%EC%B0%8C%EA%B0%9C/place/1907369165?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: undefined,
  },
  {
    name: '경주박가국밥',
    menu: ['돼지국밥'],
    distance: 127,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EA%B2%BD%EC%A3%BC%EB%B0%95%EA%B0%80%EA%B5%AD%EB%B0%A5/place/1574090129?c=15,0,0,0,dh&placePath=%3Fentry%253Dpll',
    description: undefined,
  },
  {
    name: '김치찜은 못참지',
    menu: ['김치찜'],
    distance: 0,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EA%B9%80%EC%B9%98%EC%B0%9C%EC%9D%80%EB%AA%BB%EC%B0%B8%EC%A7%80/place/1027480323?c=15,0,0,0,dh&placePath=%3Fentry%253Dpll',
    description: undefined,
  },
  {
    name: '브라운돈까스',
    menu: ['돈까스'],
    distance: 226,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%B8%8C%EB%9D%BC%EC%9A%B4%EB%8F%88%EA%B9%8C%EC%8A%A4/place/1474495605?c=15,0,0,0,dh&placePath=%3Fentry%253Dpll',
    description: '코아루 상가',
  },
  {
    name: '고궁삼계탕',
    menu: ['삼계탕(15,000)'],
    distance: 70,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EA%B3%A0%EA%B6%81%EC%82%BC%EA%B3%84%ED%83%95/place/16390652?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: '인삼주 줌',
  },
  {
    name: '초밥집',
    menu: ['초밥', '우동'],
    distance: 88,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%B4%88%EB%B0%A5%EC%A7%91/place/36419383?c=15,0,0,0,dh&placePath=%3Fentry%253Dpll',
    description: '맛있고, 비쌈',
  },
  {
    name: '가츠더태화(katsu the Taehwa)',
    menu: ['돈까스'],
    distance: 600,
    link: 'https://map.naver.com/v5/search/%EA%B0%80%EC%B8%A0%EB%8D%94%ED%83%9C%ED%99%94/place/1127193902?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: '슬로우푸드',
  },
  {
    name: '더 맛있는 감자탕',
    menu: ['감자탕', '뼈칼국수', '해장국'],
    distance: 330,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%8D%94%20%EB%A7%9B%EC%9E%88%EB%8A%94%20%EA%B0%90%EC%9E%90%ED%83%95/place/1244172407?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: undefined,
  },
  {
    name: '미림숯불갈비',
    distance: 100,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%AF%B8%EB%A6%BC%EC%88%AF%EB%B6%88%EA%B0%88%EB%B9%84/place/1688766498?c=15,0,0,0,dh&placePath=%3Fentry%253Dpll',
    description: undefined,
  },
  {
    name: '정지간 한식뷔페',
    distance: 490,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%A0%95%EC%A7%80%EA%B0%84%20%ED%95%9C%EC%8B%9D%EB%B7%94%ED%8E%98/place/1647968025?c=16.19,0,0,0,dh&isCorrectAnswer=true',
    description: undefined,
  },
  {
    name: '본정',
    menu: ['돈까스', '냉소바', '우동'],
    distance: 615,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%B3%B8%EC%A0%95/place/1151131688?c=15,0,0,0,dh&placePath=%3Fentry%253Dbmp',
    description: undefined,
  },
  {
    name: '멘모찌',
    menu: ['우동', '김초밥'],
    distance: 630,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%A9%98%EB%AA%A8%EC%B0%8C/place/1174939545?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: undefined,
  },
  {
    name: '밥플릭스',
    distance: 0,
    description: undefined,
  },
  {
    name: '우게츠',
    menu: ['덮밥류', '카레'],
    distance: 440,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%9A%B0%EA%B2%8C%EC%B8%A0/place/1741360902?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: '가격이 착한 편',
  },
  {
    name: '봉평막국수&보쌈',
    menu: ['보쌈', '막국수', '만두'],
    distance: 350,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%B4%89%ED%8F%89%EB%A7%89%EA%B5%AD%EC%88%98&%EB%B3%B4%EC%8C%88/place/1467156973?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: undefined,
  },
  {
    name: '신우성 돈까스',
    menu: ['돈까스', '우동', '유부초밥'],
    distance: 400,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%8B%A0%EC%9A%B0%EC%84%B1%EB%8F%88%EA%B9%8C%EC%8A%A4/place/1929589232?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: '양 많음, 맛도 괜찮',
  },
  {
    name: '게수작',
    menu: ['대게요리'],
    distance: 356,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EA%B2%8C%EC%88%98%EC%9E%91/place/1655006320?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: undefined,
  },
  {
    name: '송선화',
    menu: ['냉소바정식', '우삼겹정식', '송선화정식', '대게장알밥정식'],
    distance: 0,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%86%A1%EC%84%A0%ED%99%94/place/1311124912?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: '배달집으로 전향됨',
  },
  {
    name: '엄마밥상',
    menu: ['생선구이정식'],
    distance: 230,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EC%97%84%EB%A7%88%EB%B0%A5%EC%83%81/place/31237966?c=15,0,0,0,dh&placePath=%3Fentry%253Dbmp',
    description: undefined,
  },
  {
    name: '풍로옥',
    menu: ['냉면', '닭개장'],
    distance: 680,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%ED%92%8D%EB%A1%9C%EC%98%A5/place/1417364975?c=15.44,0,0,0,dh&isCorrectAnswer=true',
    description: '14:40~17:00 브레이크타임',
  },
  {
    name: '류센소',
    menu: ['일본식 라멘', '돈까스'],
    distance: 712,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%A5%98%EC%84%BC%EC%86%8C/place/1099377545?c=15.44,0,0,0,dh&isCorrectAnswer=true',
    description: '지인 추천 맛집, 라멘집이지만 돈까스를 꼭 먹어보라고 함, 15:00~17:00 브레이크타임',
  },
  {
    name: '돈돈카츠',
    menu: ['돈까스'],
    distance: 0,
    description: '배달 중심 집',
  },
  {
    name: '행복한 밥상',
    menu: ['갈치 무 조림', '고등어 무 조림', '닭개장', '돼지찌개'],
    distance: 15,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%ED%96%89%EB%B3%B5%ED%95%9C%EB%B0%A5%EC%83%81/place/38598763?c=15,0,0,0,dh&placePath=%3Fentry%253Dbmp',
  },
  {
    name: '행루즈버거',
    menu: ['수제버거'],
    distance: 660,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%ED%96%89%EB%A3%A8%EC%A6%88%EB%B2%84%EA%B1%B0/place/1315168969?c=15,0,0,0,dh&isCorrectAnswer=true',
  },
  {
    name: '부용',
    menu: ['짬뽕', '비빔짬짜'],
    distance: 144,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%B6%80%EC%9A%A9/place/1837108539?c=15,0,0,0,dh&placePath=%3Fentry%253Dbmp',
  },
  {
    name: '황금코다리',
    menu: ['코다리 찜'],
    distance: 200,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%ED%99%A9%EA%B8%88%EC%BD%94%EB%8B%A4%EB%A6%AC/place/1222998277?c=15,0,0,0,dh&isCorrectAnswer=true',
    description: '막걸리 무한리필',
  },
  {
    name: '부림 해물손칼국수',
    menu: ['해물칼국수', '수제비', '돈까스', '만두', '얼큰칼국수'],
    distance: 550,
    link: 'https://map.naver.com/v5/search/%EC%9A%B8%EC%82%B0%20%EC%82%BC%EC%82%B0%20%EB%B6%80%EB%A6%BC%ED%95%B4%EB%AC%BC%EC%86%90%EC%88%98%EC%A0%9C%EB%B9%84/place/19571730?c=15,0,0,0,dh&placePath=%3Fentry%253Dbmp',
    description: '얼큰칼국수 된장맛 남, 양 엄청 많음',
  },
];

module.exports = {
  foods: foods,
};
