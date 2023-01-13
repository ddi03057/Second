const arrJudgeStepNm = ["정보제공동의", "본인인증", "서류수집", "서류전송현황", "정보입력", "사전심사신청"];
const arrLoanStepNm = ["보증승인정보", "대출신청내역", "여신거래약정", "대출약관", "대출실행"];
const pageList = [
  {
    id: 1,
    name: "고객정보 등록"
  },
  {
    id: 2,
    name: "상품안내"
  },
  {
    id: 3,
    name: "대출신청 전 사전안내"
  },
  {
    id: 4,
    name: "사전심사",
  },
  {
    id: 5,
    name: "신청 중인 대출 진행/조회/취소",
  },
  {
    id: 6,
    name: "대출신청",
  },
  {
    id: 7,
    name: "대출실행",
  }

];

const emailList = [
  {
    id: 1,
    name: "",
    title: "직접입력",
  },
  {
    id: 2,
    name: "네이버",
    title: "naver.com",
  },
  {
    id: 3,
    name: "다음",
    title: "daum.net",
  },
  {
    id: 4,
    name: "구글",
    title: "gmail.com",
  },
  {
    id: 5,
    name: "한메일",
    title: "hanmail.net",
  },
  {
    id: 6,
    name: "네이트",
    title: "nate.com",
  },
  {
    id: 7,
    name: "야후",
    title: "yahoo.com",
  },
];

const suitTestData = [
  {
      id : 0,
      title : "전문금융 소비자 여부",
      standardVal : "",
      type : "radio",
      radioId : 0,
      radioList : [
          {
              id : 0,
              name : "일반금융소비자" 
          },
          {
              id : 1,
              name : "전문금융소비자" 
          },
      ],
      fixedId : 0,
      msg : "전문금융소비자가 맞으십니까?\n전문금융소비자는 청약철회권을 행사할 수 없습니다.\n * 전문금융소비자: 국가, 금융회사, 주권상장법인 등"

  },
  {
      id : 1,
      title : "연령",
      standardVal : "",
      type : "text",
      textId : 0,
      placeholder : "숫자만 입력"

  },
  {
      id : 2,
      title : "대출 용도",
      standardVal : "",
      type : "radio",
      radioId : 1,
      radioList : [
          {
              id : 0,
              name : "운전 자금" 
          },
          {
              id : 1,
              name : "사설 자금" 
          },
      ],
      fixedId : 0,
      msg : "사설자금이 맞으십니까?\n사설자금은 비대면 대출 대상이 아닙니다.\n  *사설자금: 부동산의 매입, 신축, 증축 등"

  },
  {
      id : 3,
      title : "보유 자산",
      standardVal : "현재기준",
      type : "radio",
      radioId : 2,
      radioList : [
          {
              id : 0,
              name : "1억원 미만" 
          },
          {
              id : 1,
              name : "1억원 이상 10억원 미만" 
          },
          {
              id : 2,
              name : "10억원 이상" 
          }
      ],

  },
  {
      id : 4,
      title : "현재 소득",
      standardVal : "최근 1년 기준",
      type : "radio",
      radioId : 3,
      radioList : [
          {
              id : 0,
              name : "1억원 미만" 
          },
          {
              id : 1,
              name : "1억원 이상 10억원 미만" 
          },
          {
              id : 2,
              name : "10억원 이상" 
          }
      ],

  },
  {
      id : 5,
      title : "미래 예상 소득",
      standardVal : "",
      type : "radio",
      radioId : 4,
      radioList : [
          {
              id : 0,
              name : "현재보다 감소" 
          },
          {
              id : 1,
              name : "현재수준 유지" 
          },
          {
              id : 2,
              name : "현재보다 증가" 
          }
      ],

  },
  {
      id : 6,
      title : "부채",
      standardVal : "",
      type : "radio",
      radioId : 5,
      radioList : [
          {
              id : 0,
              name : "1억원 미만" 
          },
          {
              id : 1,
              name : "1억원 이상 10억원 미만" 
          },
          {
              id : 2,
              name : "10억원 이상" 
          }
      ],

  },
  {
      id : 7,
      title : "고정 지출",
      standardVal : "",
      type : "radio",
      radioId : 6,
      radioList : [
          {
              id : 0,
              name : "현재 소득의 10% 미만" 
          },
          {
              id : 1,
              name : "현재 소득의 10% 이상 50% 미만" 
          },
          {
              id : 2,
              name : "현재 소득의 50% 이상" 
          }
      ],

  },
  {
      id : 8,
      title : "연체 정보",
      standardVal : "",
      type : "radio",
      radioId : 7,
      radioList : [
          {
              id : 0,
              name : "현재 연체 중이며 연체 정리가 어려움" 
          },
          {
              id : 1,
              name : "현재 연체 중이나 정리 예정" 
          },
          {
              id : 2,
              name : "현재 연체 정보 없음" 
          }
      ],

  },
  {
      id : 9,
      title : "신용점수",
      standardVal : "",
      type : "radio",
      radioId : 8,
      radioList : [
        {
          id : 0,
          name : "알고 있음" 
        },
        {
          id : 1,
          name : "잘 모름"
        }
      ]
      

  },
  {
    id : 9,
    title : "점수 (1~1000점)",
    standardVal : "",
    type : "text",
    textId : 1,
    placeholder : "숫자만 입력"
  },
  {
    id : 9,
    title : "평가기관",
    standardVal : "",
    type : "select",
    selectId : 0,
    selectList : [
      {
        id : 0,
        value : "01",
        name : "KCB", //01
        title : "올크레딧"
      },
      {
        id : 1,
        value : "02",
        name : "NICE",
        title : "나이스" //02
      }
    ]
  },
  {
      id : 10,
      title : "변제방법",
      standardVal : "",
      type : "radio",
      radioId : 9,
      radioList : [
          {
              id : 0,
              name : "사업 소득" 
          },
          {
              id : 1,
              name : "임대 소득" 
          },
          {
              id : 2,
              name : "금융 소득" 
          },
          {
              id : 3,
              name : "기타 소득" 
          }
      ],

  },
  {
      id : 11,
      title : "교부 받을 이메일 주소",
      standardVal : "",
      type : "text",
      textId : 2,
      placeholder : ""
      

  }
];

const applyInfoInputData = [
  {
    id: 0,
    title: "금리종류",
    type: "text"
  },
  {
    id: 1,
    title: "자금용도",
    type: "radio",
    radioId: 0,
    radioList : [
      {
          id : 0,
          value : "사업장운영자금" 
      },
      {
          id : 1,
          value : "원부자재구입" 
      },
      {
          id : 2,
          value : "기타" 
      }
    ],
  },
  {
    id: 2,
    title: "할부금 및 이자납입일 - 매월",
    type: "radio",
    radioId: 1,
    radioList: [
      {
          id : 0,
          value : "1일" 
      },
      {
          id : 1,
          value : "10일" 
      },
      {
          id : 2,
          value : "20일" 
      },
      {
          id : 3,
          value : "직접입력" 
      }
  
    ]
  },
  {
    id: 3,
    title: "대출금 입금 및 자동이체 계좌번호",
    type: "select",
    selectId: 0,
    selectList: [
      {
        id: 0,
        bru: "기업",
        accNum: "123-45678-00-00000",
        name: "기업 123-45678-00-00000"
      }
    ]
  }
];

export default (props)=> {
  switch (props) {
    case 'email': return emailList;
    case 'judgeStepNm': return arrJudgeStepNm;
    case 'loanStepNm': return arrLoanStepNm
    case 'page': return pageList;
    case 'SuitTest': return suitTestData; //적합성적정성검사 데이터
    case 'ApplyInfoInput': return applyInfoInputData; //대출신청서작성 및 실행요청
    default : return null;
  }
};