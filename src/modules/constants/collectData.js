const arrJudgeStepNm = ["정보제공동의", "본인인증", "서류수집", "서류전송현황", "정보입력", "사전심사신청"];
const arrLoanStepNm = ["보증승인정보", "대출신청내역", "여신거래약정", "대출약관", "대출실행"];

const detailData = 
  {
    id: 0,
    userNm: "김동협",
    loanMn: "100000000",
    lendrate : 2.688
  }


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

const custAgreeData = [
  {
      id: 1,
      title: "(필수) 개인(신용)정보 수집 이용 및 제공관련 고객권리 안내문",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2017110617593821483973066352935.pdf"

  },
  {
      id: 2,
      title: "(필수) 개인(신용)정보 수집 이용 동의, 고유식별번호 수집 이용 동의",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2019031909261764480323824044447.pdf"
  },
  {
      id: 3,
      title: "(필수) 개인(신용)정보 수집이용 제공 동의(여신금융거래)",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2020262473283826319128117808560.pdf"
  },
  {
      id: 4,
      title: "(필수) 개인(신용)정보 수집이용 제공 동의(비여신금융거래)",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2022053115131329259593606625324.pdf"

  },
  {
      id: 5,
      title: "(필수) 개인정보 및 기업정보의 수집 · 이용 · 제공 활용 동의서(신용보증기금)",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2022053115164629259806850189960.pdf"

  },
  {
      id: 6,
      title: "(필수) 중소기업지원사업 통합관리 시스템 정보 활용을 위한 동의서(신용보증기금)",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2022021612253920263835375609685.pdf"

  },
  {
      id: 7,
      title: "(필수) 여신금융협회 이용약관 동의",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2022060710060229845969269035242.pdf"

  },
  {
      id: 8,
      title: "(필수) 여신금융협회 개인정보 수집 및 이용",
      type: "pdf",
      pdfvalue: "/fup/customer/form/2022060710060229845969269035242.pdf"

  }
];

const applyInfoInputData = [
  {
    id: 0,
    title: "금리종류",
    type: "text",
    textId: 0,
    value: "고객 적용 금리"
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
    id: 2,
    title: "할부금 및 이자납입일 - 매월",
    type: "text",
    textId: 1
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
      },
      {
        id: 1,
        bru: "국민",
        accNum: "123-45678-00-00000",
        name: "국민 123-45678-00-00000"
      }
    ]
  }
];

const untactAgrmData = [
  {
      id: 0,
      title: "(필수) 기업대출 상품설명서",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 1,
      title: "(필수) 여신거래약정서(기업용)",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 2,
      title: "(필수) 신용보증약정서",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 3,
      title: "(필수) 신용보증약정 설명서",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 4,
      title: "(필수) 은행여신거래 기본약관(기업용)",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 5,
      title: "(필수) 금리인하요구원 안내 확인서",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 6,
      title: "(필수) 대출신청서",
      type: "text",
      pdfvalue: ""

  },
  {
      id: 7,
      title: "재단의 보증은 ⌈지역신용보증재단법⌋에 의한 특수한 보증으로, ⌈민법⌋상의 보증과는 다소 차이가 있습니다.",//큰글자
      content: " - 채권자의 보증채무이행청구시기, 재단의 보증채무이행의 범위, 채권자의 통지의무 등에서 차이가 있습니다.",//작은 글자
      type: "check"
  },
  {
      id: 8,
      title: "재단이 보증을 하는 경우에는 보증료를 납부하셔야 합니다.",
      contentList: [
          {
              id: 0,
              content1: " - 보증을 하는 날에 보증기한까지의 보증료를 미리 납부하셔야 합니다."
          },
          {
              id: 1,
              content2: " - 보증료율은 보증금액, 보증기간 등에 따라 최고 연율 2.0%이내에서 결정되며, 정상상환하여 일부 보증료 환급이 있는 경우에 한하여 사전통지 없이 본인계좌로 환급됩니다."
          }
      ],
      type: "check1"
  },
  {
      id: 9,
      title: "본인에 대하여 이 약정서 제5조에서 정한 사전구상 사유가 발생한 경우 재단은 별도의 사전통지나 독촉절차 없이도 법적조치를 할 수 있습니다.",
      content: " - 법적조치와 관련하여 재단이 대신 지급한 제비용은 본인이 부담하셔야 합니다.",
      type: "check"
  },
  {
      id: 10,
      title: "재단이 채권자에 대하여 보증채무를 이행한 경우, 본인은 보증채무이행 금액과 손해금을 상환하셔야 합니다.",
      contentList: [
          {
              id: 0,
              content1: " - 손해금율은 법령상의 최고 연율20%의 범위내에서 금융회사의 연체대출금리를 참작하여 재단의 이사회에서 정합니다."
          },
          {
              id: 1,
              content2: " - 재단이 보증채무이행으로 취득한 권리의 보전, 이전, 행사 등과 관련하여 비용을 지출한 경우, 본인은 이를 상환하셔야 합니다."
          }
      ],
      type: "check1"
  },
  {
      id: 11,
      title: "본인은 이 약정서의 중요한 내용 및 보증기업의 채무관련 신용정보 등을 충분히 읽고 확인하였으며, 약정서 사본은 재단 또는 금융회사 모바일앱을 통해 확인하는 것에 동의하는 경우에는 약정서에 서명하여 주시기 바랍니다. * 채무관련 신용정보란 신용정보집중기관으로부터 제공받은 채무자의 대출정보, 채무보증정보, 연체정보, 대위변제・대지급정보 및 부도정보를 말한다.",
      type: "check"
  },
  {
      id: 12,
      title: "대출실행 후 취소/변경이 불가합니다.",
      type: "check"
  },
  {
      id: 13,
      title: "본인과 관련하여 금일 현재 가정법원에 후견(성년후견 ・ 한정후견 ・ 특정후견 ・ 임의후견 ・ 이하 같음)개시심판을 청구하였거나,가정법원에서 후견 개시결정을 받은 사실이 없음을 확인합니다.",
      type: "check"
  },
  {
      id: 14,
      title: "이자할부금 등 지급을 지체한 경우, 기본약관 제7조에 불구하고 은행의 통지가 없는 경우에도 여신금액에 대하여 곧 기한 전 채무변제의무가 발생하며 지연배상금률을 적용함에 있어 본인에게 통지 여신만기 도래시 만기도래사실(기간연장 가능여부 포함)에 대한 통지\n여신실행(기간연장 포함)시 실행사실에 대한 통지",
      type: "check"
  },
  {
      id: 15,
      title: "신용보증 약정서 제3조(보증료 등의 납부)에 의거 납부하여야 할 보증료 등을 대출금이자 자동이체 출금계좌에서 인출하여 수납 처리 하는 것에 동의하며 보증료 등 납부와 관련한 제반사항에 대하여는 신용보증기관에서 정한 방법 및 은행의 자동이체 약관을 따르기로 합니다.",
      type: "check"
  },
];

const grtInfoData = [
  {
      id: 1,
      title: "주 사업장 소유자",
      type: "radio",
      radioId: 0,
      radioList: [
          {
              id: 0,
              value: "본인"
          },
          {
              id: 1,
              value: "배우자"
          },
          {
              id: 2,
              value: "타인"
          },
      ],
      msg : "배우자, 타인 선택시 진행이 불가합니다."
  },
  {
      id: 2,
      title: "주 사업장 관리 침해(최근 1년 이내)",
      type: "radio",
      radioId: 1,
      radioList: [
          {
              id: 0,
              value: "있음"
          },
          {
              id: 1,
              value: "없음"
          },
      ],
  },
  
  {
      id: 3,
      title: "주민등록상 주소지와 실제 거주지 주소가 같습니까?",
      type: "radio",
      radioId: 2,
      radioList: [
          {
              id: 0,
              value: "있음"
          },
          {
              id: 1,
              value: "없음"
          },
      ],

  },
  {
    id: 4,
    title: "주소찾기",
    type: "search",
    searchId: 1
  },
  {
      id: 5,
      title: "주민등록상 주소지 소유자",
      type: "radio",
      radioId: 3,
      radioList: [
          {
              id: 0,
              value: "본인"
          },
          {
              id: 1,
              value: "배우자"
          },
          {
              id: 2,
              value: "타인"
          },
      ],
  },
  {
      id: 6,
      title: "거주 주택 소유자",
      type: "radio",
      radioId: 4,
      radioList: [
          {
              id: 0,
              value: "본인"
          },
          {
              id: 1,
              value: "배우자"
          },
          {
              id: 2,
              value: "타인"
          },
      ],
  },
  {
      id: 7,
      title: "본인 또는 배우자 명의로 소유하고 있는 주택(실거주 불문)이 있습니까?",
      type: "radio",
      radioId: 5,
      radioList: [
          {
              id: 0,
              value: "예"
          },
          {
              id: 1,
              value: "아니요"
          },
      ],
  },
  {
      id: 8,
      title: "거주 주택 권리 침해(최근 1년 이내)",
      type: "radio",
      radioId: 6,
      radioList: [
          {
              id: 0,
              value: "있음"
          },
          {
              id: 1,
              value: "없음"
          },
      ],
  },
  {
      id: 9,
      title: "대출 희망 금액",
      type: "text",
      textId: 0
  },
  {
      id: 10,
      title: "대출 기간",
      type: "select",
      selectId:0,
      selectList: [
          {
              id: 0,
              name: "5"
          },
          {
              id: 1,
              name: "8"
          },
      ],
  },
];

const selfCheckData = [
  {
    id: 1,
    title: "1. 영리목적으로 사업을 영위하는 개인기업에 해당하십니까?",
    type: "radio",
    radioId: 0,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 2,
    title: "2. 보증금지/제한 기업 또는 보증제한/취급유의/지역신용보증재단 우선취급업종 영위기업에 해당되십니까?",
    type: "radio",
    radioId: 1,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 3,
    title: "3. 심사항목 저촉사항이 있습니까?",
    type: "radio",
    radioId: 2,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 4,
    title: "4. 신청기업의 실제경영자가 사업자등록증상 대표자입니까?",
    type: "radio",
    radioId: 3,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 5,
    title: "5. 사업자등록상 공동대표자가 있습니까?",
    type: "radio",
    radioId: 4,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 6,
    title: "6. 신청일 현재 신청기업 이외에 다른 기업을 운영 중에 있으며, 해당 기업이 신용보증기금, 기술보증기금, 지역신용보증재단에 보증잔액이 있습니까?",
    type: "radio",
    radioId: 5,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 7,
    title: "7. 신청일 현재 신용보증기금 또는 기술보증기금 보증잔액이 있습니까?",
    type: "radio",
    radioId: 6,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 8,
    title: "8. 사업자등록증상 개업일로부터 1년이 지났습니까?",
    type: "radio",
    radioId: 7,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
  {
    id: 9,
    title: "9. 최근 1년 이내 대표자(실제경영자)가 변동 된 사실이 있습니까?",
    type: "radio",
    radioId: 8,
    radioList: [
      {
        id: 0,
        name: "예",
        value: "예"
      },
      {
        id: 1,
        name: "아니요",
        value: "아니요"
      },
    ],
  },
];

export default (props)=> {
  switch (props) {
    case 'detail' : return detailData; // 상품안내 고객데이터
    case 'email': return emailList;
    case 'judgeStepNm': return arrJudgeStepNm;
    case 'loanStepNm': return arrLoanStepNm
    case 'page': return pageList;
    case 'SuitTest': return suitTestData; //적합성적정성검사 데이터
    case 'CustAgree' : return custAgreeData; // 고객동의 데이터
    case 'ApplyInfoInput': return applyInfoInputData; //대출신청서작성 및 실행요청
    case 'UntactAgrm' : return untactAgrmData; //비대면 약정
    case 'GrtInfoInput' : return grtInfoData; //조사자료 자가체크 //사전심사자료작성
    case 'SelfCheck' : return selfCheckData; //자가진단 체크리스트
    default : return null;
  }
};
