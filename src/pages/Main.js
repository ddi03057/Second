import { useEffect, useState } from "react";
import Detail from "./guide/Detail";
import Progress from "./common/Progress";
import MyLon from "./postmanagement/MyLon";
import TabComponent from "./common/TabComponent";
import PathConstants from "../modules/constants/PathConstants";
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
  /**
   * state = {tabIdx: 0,1,2}
   */
  const { state } = useLocation();
  const propsTabIdx = state.tabIdx;

  if(!propsTabIdx) propsTabIdx=1;
  let [tabIdx, setTabIdx] = useState(propsTabIdx); //0,1,2
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
        (tabIdx === 2)&&
          <Progress />
      }
    </>
  )
}

export default Main;