/**
 * 라디오 버튼 컴포넌트
 * @param {*} props 
 * radioData : 반복할 라디오 데이터(필수)
 * styleSeleList sele-list 클래스명(필수)
 * checked : 체크 할 id값(필수)
 * onChange : 변경이벤트(필수)
 * @returns 
 */
function RadioInlineComponent(props) {
  const objRadioData = props.radioData;
  console.log("넘어온check값", props.checked);
  if (props.showYn) {
    return (
      <>
        <div className={props.styleSeleList}>
          {
            objRadioData.radioList.map((data, idx) => {
              console.log("컴포넌트의check값", data.id)
              return (
                <div key={`sRadio${objRadioData.id}_${data.id}`} className="item">
                  <input type="radio"
                    name={`sRadio${objRadioData.id}`}
                    id={`sRadio${objRadioData.id}_${data.id}`}
                    value={data}
                    checked={(props.checked == data.id) ? true : false}
                    onChange={(e) => {
                      props.onChangeFn(data.id);
                    }}
                  />
                  <label htmlFor={`sRadio${objRadioData.id}_${data.id}`} className="item-cont">
                    {data.value}
                  </label>
                </div>

              )
            })
          }
        </div>
      </>
    )
  } else {
    return null;
  }
}

export default RadioInlineComponent;