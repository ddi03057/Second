import { useEffect, useState } from "react";
import Detail from "./guide/Detail";
import Progress from "./common/Progress";
import MyLon from "./postmanagement/MyLon";
import TabComponent from "./common/TabComponent";
import PathConstants from "../modules/constants/PathConstants";

import axios from "axios";

import { useLocation } from "react-router";

const tabList = [
  {
    id: 0,
    link: PathConstants.GUIDE_DETAIL,
    name: "상품안내"
  },
  {
    id: 1,
    link: "",
    name: "나의대출"
  },
  {
    id: 2,
    link: "",
    name: "진행상태"
  }
];


function Main(props) {
  let propsTabIdx = 0;
  /**
   * state = {tabIdx: 0,1,2}
   */
  const { state } = useLocation();
  try {
    propsTabIdx = state.tabIdx;
  }catch {
    //에러페이지
  }

  if(propsTabIdx != 0 && !propsTabIdx) propsTabIdx = 0;
  const [tabIdx, setTabIdx] = useState(propsTabIdx); //0,1,2
  useEffect(()=> {
    console.log(tabIdx);

    setTabIdx(tabIdx);
  }, [tabIdx]);

  
  return (
    <>
      <TabComponent 
        styleMark="state-mark s-red"
        tabList={tabList}
        tabIdx={tabIdx}
        setTabIdx={setTabIdx}
      />
      {
        (tabIdx === 0)&&
          <Detail />
      }
      {
        (tabIdx === 1)&&
          <MyLon />
      }
      {
        (tabIdx.toString().substring(0,1) === "2")&&
          <Progress progState={tabIdx.toString().substring(1,2)} />
      }
    </>
  )
}

export default Main;