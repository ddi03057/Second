/**
 * 
 * @param {*} props 
 * radioData
 * styleSeleList
 * @returns 
 */
function RadioInlineComponent(props) {
  const objRadioData = props.radioData;
  console.log(typeof props.onChangeFn);
  return (
    <>
      <div className={props.styleSeleList}>
        {
          objRadioData.radioList.map((data, idx) => {
            return (
              <div key={`sRadio${objRadioData.id}_${data.id}`} className="item">
                <input type="radio"
                  name={`sRadio${objRadioData.id}`}
                  id={`sRadio${objRadioData.id}_${data.id}`}
                  value={data}
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
  );
}

export default RadioInlineComponent;