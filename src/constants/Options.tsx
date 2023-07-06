export type OptionType = {
  value: number;
  label: string;
};

export const categoryOptions: OptionType[] = [
  { value: 1, label: '교육, 학문' },
  { value: 2, label: '컴퓨터, 통신' },
  { value: 3, label: '게임' },
  { value: 4, label: '예술' },
  { value: 5, label: '생활' },
  { value: 6, label: '건강' },
  { value: 7, label: '사회, 정치' },
  { value: 8, label: '경제' },
  { value: 9, label: '여행' },
  { value: 10, label: '스포츠, 운동' },
  { value: 11, label: '쇼핑' },
  { value: 12, label: '지역' },
  { value: 13, label: '연애, 결혼' },
  { value: 14, label: '음악, 연주' },
  { value: 15, label: '요리' },
  { value: 16, label: '방송, 연예인' },
  { value: 17, label: '피부, 화장품' },
  { value: 18, label: '반려동물' },
];

export const deadlineOptions: OptionType[] = [
  { value: 0, label: '마감 없음' },
  { value: 3, label: '3시간 후 마감' },
  { value: 6, label: '6시간 후 마감' },
  { value: 12, label: '12시간 후 마감' },
  { value: 24, label: '24시간 후 마감' },
];

export const residenceOptions: OptionType[] = [
  { value: 1, label: '서울특별시' },
  { value: 2, label: '부산광역시' },
  { value: 3, label: '대구광역시' },
  { value: 4, label: '인천광역시' },
  { value: 5, label: '광주광역시' },
  { value: 6, label: '대전광역시' },
  { value: 7, label: '울산광역시' },
  { value: 8, label: '세종특별자치시' },
  { value: 9, label: '경기도' },
  { value: 10, label: '강원특별자치도' },
  { value: 11, label: '충청남도' },
  { value: 12, label: '충청북도' },
  { value: 13, label: '전라남도' },
  { value: 14, label: '전라북도' },
  { value: 15, label: '경상남도' },
  { value: 16, label: '경상북도' },
  { value: 17, label: '제주특별자치도' },
];

export const reportOptions: OptionType[] = [
  { value: 1, label: '개인정보 노출 게시물입니다.' },
  { value: 2, label: '스팸홍보/도배 게시물 입니다.' },
  { value: 3, label: '욕설/혐오/차별적 표현이 포함된 게시물입니다.' },
  { value: 4, label: '음란성 또는 청소년에게 부적합한 게시물입니다.' },
  { value: 5, label: '불법정보가 포함된 게시물입니다.' },
];
