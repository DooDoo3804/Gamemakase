import { useState } from "react";
import styled from "@emotion/styled";
import checkBox from "../assets/fontAwesomeSvg/square-check-regular.svg";
import fullCheckBox from "../assets/fontAwesomeSvg/square-check-solid.svg";

const ChackBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 29px;
  margin-left: 10px;
  width: auto;

  input[type=checkbox] {
    display: none;
  }

  label {
    display: flex;
    cursor: pointer;
  }

  div {
    display: flex;
    align-items: center;
    font-style: normal;
    font-size: 14px;
    margin-left: 15px;
  }

  label {
    height: 24px;
    width: 24px;
    background-image: url(${checkBox});
    background-repeat: no-repeat;
  }

  input[type=checkbox]:checked + label {
    height: 24px;
    width: 24px;
    background-image: url(${fullCheckBox});
  }
`;
const CheckBox = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  if (props.label) {
    const changeHandler = () => {
      setIsChecked(!isChecked);
      if (!isChecked) {
        if (props.list && !props.list.includes(props.engName)) {
          props.event(props.engName, "push");
        }
      } else {
        if (props.list && props.list.includes(props.engName)) {
          props.event(props.engName, "remove");
        }
      }
    };
    return (
      <ChackBoxWrapper>
        <input
          id={props.engName}
          type="checkbox"
          name="genre"
          value={props.engName}
          onChange={() => {
            changeHandler();
          }}
        />
        <label htmlFor={props.engName}>
        </label>
        <div>{props.korName}</div>
      </ChackBoxWrapper>
    );
  } else {
    const changeHandler = () => {
      setIsChecked(!isChecked);
      if (!isChecked) {
        props.event(!isChecked);
      } else {
        props.event(!isChecked);
      }
    };
    return (
      <div>
        <ChackBoxWrapper>
          <input
            id={props.name}
            type="checkbox"
            name="genre"
            value={props.name}
            onChange={() => {
              changeHandler();
            }}
          />
          <label htmlFor={props.name}>
          </label>
        </ChackBoxWrapper>
      </div>
    );
  }
};
export default CheckBox;
