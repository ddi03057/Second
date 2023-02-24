//-----------------------------------------------------------------------------------------------------------------------
// * 고객사 전용(공통함수 필요시 추가해서 사용)
// * 작성일 : 2014-01-15
//-----------------------------------------------------------------------------------------------------------------------

/**
 * 인증서 필터링 설정값
 * CERT_Accept_Koscom
 * CERT_Accept_YesSign
 */
/*
var CERT_Accept_Koscom_sample
    = "1.2.410.200004.5.1.1.7|"  //증권전산, 법인, 상호연동
    + "1.2.410.200004.5.1.1.9|"  //증권전산, 개인, 용도제한(개인)*
    + "1.2.410.200004.5.1.1.5|"  //증권전산, 개인, 상호연동
    + "1.2.410.200004.5.2.1.2|"  //정보인증, 개인, 상호연동
    + "1.2.410.200004.5.2.1.1|"  //정보인증, 법인, 상호연동
    + "1.2.410.200004.5.3.1.9|"  //전산원,   개인, 상호연동
    + "1.2.410.200004.5.3.1.2|"  //전산원,   법인, 상호연동
    + "1.2.410.200004.5.4.1.1|"  //전자인증, 개인, 상호연동
    + "1.2.410.200004.5.4.1.2|"  //전자인증, 법인, 상호연동
    + "1.2.410.200005.1.1.1|"    //금결원,  개인, 상호연동
    + "1.2.410.200005.1.1.5|"    //금결원,  법인, 상호연동
    + "1.2.410.200012.1.1.1|"    //무역정보, 개인, 상호연동
    + "1.2.410.200012.1.1.3|"    //무역정보, 법인, 상호연동
;

var CERT_Accept_YesSign_sample
    = "1.2.410.200005.1.1.1|"    //금결원, 개인, 상호연동
    + "1.2.410.200005.1.1.2|"    //금결원, 법인, 용도제한(은행/보험/카드)
    + "1.2.410.200005.1.1.4|"    //금결원, 개인, 용도제한(은행/보험/카드)
    + "1.2.410.200005.1.1.5|"    //금결원, 법인, 상호연동
    + "1.2.410.200005.1.1.6.1|"  //금결원, 법인, 용도제한(기업뱅킹)
    + "1.2.410.200004.5.4.1.1|"  //전자인증, 개인, 상호연동
    + "1.2.410.200004.5.4.1.2|"  //전자인증, 법인, 상호연동
    + "1.2.410.200004.5.1.1.7|"  //증권전산, 법인, 상호연동
    + "1.2.410.200004.5.1.1.5|"  //증권전산, 개인, 상호연동
;
*/