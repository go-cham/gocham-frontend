export type OptionType = {
  value: string;
  label: string;
};

export const categoryOptions: OptionType[] = [
  { value: "교육, 학문", label: "교육, 학문" },
  { value: "컴퓨터통신", label: "컴퓨터통신" },
  { value: "게임", label: "게임" },
  { value: "엔터테인먼트, 예술", label: "엔터테인먼트, 예술" },
  { value: "생활", label: "생활" },
  { value: "건강", label: "건강" },
  { value: "사회, 정치", label: "사회, 정치" },
  { value: "경제", label: "경제" },
  { value: "여행", label: "여행" },
  { value: "스포츠, 운동", label: "스포츠, 운동" },
  { value: "쇼핑", label: "쇼핑" },
  { value: "지역", label: "지역" },
  { value: "연애, 결혼", label: "연애, 결혼" },
  { value: "음악, 연주", label: "음악, 연주" },
  { value: "요리", label: "요리" },
  { value: "쇼핑", label: "쇼핑" },
  { value: "방송, 연예인", label: "방송, 연예인" },
  { value: "피부과", label: "피부과" },
  { value: "반려동물", label: "반려동물" },
];

export const deadlineOptions: OptionType[] = [
  { value: "3", label: "3시간 후 마감" },
  { value: "6", label: "6시간 후 마감" },
  { value: "12", label: "12시간 후 마감" },
  { value: "24", label: "24시간 후 마감" },
];

export const residenceOptions: OptionType[] = [
  { value: "서울특별시", label: "서울특별시" },
  { value: "부산광역시", label: "부산광역시" },
  { value: "대구광역시", label: "대구광역시" },
  { value: "인천광역시", label: "인천광역시" },
  { value: "광주광역시", label: "광주광역시" },
  { value: "대전광역시", label: "대전광역시" },
  { value: "울산광역시", label: "울산광역시" },
  { value: "세종특별자치시", label: "세종특별자치시" },
  { value: "경기도", label: "경기도" },
  { value: "강원도", label: "강원도" },
  { value: "충청북도", label: "충청북도" },
  { value: "충청남도", label: "충청남도" },
  { value: "전라북도", label: "전라북도" },
  { value: "전라남도", label: "전라남도" },
  { value: "경상북도", label: "경상북도" },
  { value: "경상남도", label: "경상남도" },
  { value: "제주특별자치도", label: "제주특별자치도" },
];

export const jobOptions: OptionType[] = [
  { value: "중, 고등학생", label: "중, 고등학생" },
  { value: "대학 및 대학원생", label: "대학 및 대학원생" },
  { value: "회사원", label: "회사원" },
  { value: "자영업자", label: "자영업자" },
  { value: "취업준비생", label: "취업준비생" },
  { value: "프리랜서", label: "프리랜서" },
  { value: "기타", label: "기타" },
];
