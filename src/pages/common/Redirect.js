//토큰체크
//진행상태체크
//체크되면 navigate

import { useState } from "react";
import { useNavigate } from "react-router";
import { loginDomain } from "../../modules/common/boxlogin";
import callOpenApi, { authorization } from "../../modules/common/tokenBase";
import AlertModal from "../../modules/components/AlertModal";
import PathConstants from "../../modules/constants/PathConstants";


export default ()=> {
  let navigate = useNavigate();
  let [progState, setProgState] = useState("");
  const successFn = (res)=> {
    setProgState(res.data);
  }
  
  const errorFn = ()=> {
  
  }
  if(authorization(null)) { //토큰있음
    //진행상태체크
    let param = {};
    callOpenApi("", param, successFn, errorFn);
    switch(progState) {
      case "" : 
        navigate(
          PathConstants.GUIDE_DETAIL,
          {}
        );
    }

  }else { //토큰없음
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <AlertModal 
        show={show}
        msg="로그인을 하시겠습니까?"
        btnNm={["확인", "취소"]}
        onClickFn={(btnIdx) => {
          if(btnIdx === 0) {
            window.location.href = loginDomain() + "/COM001/login.do?callType=spa";
          }else {
            handleClose();
            navigate(
              PathConstants.GUIDE_DETAIL
            );
          }
      }}
      />
    );
  }
};