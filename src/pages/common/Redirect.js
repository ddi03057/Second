//토큰체크
//진행상태체크
//체크되면 navigate

import { useState, useEffect, useLayoutEffect} from "react";
import { useNavigate, useParams } from "react-router";
import { loginDomain } from "../../modules/common/boxlogin";
import { oslLogin, oslLogout } from "../../modules/common/oslLogin";
import { isToken } from "../../modules/common/tokenBase";
import AlertModal from "../../modules/components/AlertModal";
import PathConstants from "../../modules/constants/PathConstants";


export default (props)=> {
  let {type} = useParams();
  const [tokenYn, setTokenYn] = useState(false);
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("type", type);
  console.log("tokenYn", tokenYn);

  useLayoutEffect(()=> {
    if(!isToken()) {
      handleShow();
    }else {
      setTokenYn(true);
    }
  }, []);

  useEffect(()=> {
    if(tokenYn) {
      if(type === "first") {
        navigate(PathConstants.PREJUDGE_CUSTAGREE);
      }else if(type === "expire") {
        navigate(PathConstants.MAIN,{state: {tabIdx: 21}});
      }else {
        navigate(PathConstants.GUIDE_DETAIL);
      }
    }
  }, [tokenYn]);
  
    
    
  //console.log("authorization", authorization(null));
  // if(!!type) { //토큰있음
  //   switch(type) {
  //     case "first" :
  //       //alert(type);
  //       navigate(PathConstants.PREJUDGE_CUSTAGREE);
  //       break;
  //     case "state" :
  //       navigate(PathConstants.MAIN,{state: {tabIdx: 2}});
  //       break;
  //     default : 
  //       navigate(PathConstants.GUIDE_DETAIL);
  //   }

  // } //토큰없음

  let msg = "로그인을 하시겠습니까?"
  if(type === "expire") msg = "세션이 종료되었습니다.\n" + msg;
  else msg = "로그인이 필요한 서비스입니다.\n" + msg;
  return (
    <>
    {
      show&&
        <AlertModal 
          show={show}
          msg={msg}
          btnNm={["확인", "취소"]}
          onClickFn={(btnIdx) => {
            
            if(btnIdx === 0) {
              oslLogin();
            }else {
              handleClose();
              navigate(
                PathConstants.GUIDE_DETAIL
              );
            }
        }}
        />
    }
    </>
  );

  
};