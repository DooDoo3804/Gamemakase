import styled from "@emotion/styled";
import { Common } from "../styles/Common";
import xmark from "../assets/fontAwesomeSvg/xmark-white.svg";

const TagWrapper = styled.div`
    background-color: rgba(184, 162, 207, 0.77);
    border-radius: 15px;
    height: 25px;
    margin: 5px 10px 5px 0px;
    
    display: flex;
    align-items: center;

    :hover {
        background-color: ${Common.colors.mainColor06};
        cursor: pointer;
    }

    .value {
        font-family: 'Sarpanch';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        margin-left: 12px;
        height: 100%;
    };
    .xmark {
        z-index: 999;
        height: 12px;
        margin-left: 10px;
        margin-right: 10px;
    };
`;

const Tag = (props) => {
    return (
        <TagWrapper onClick={() => {props.click(props.value)}}>
            <div className="value">{props.value}</div>
            <img src={xmark} alt="xmark" className="xmark" onClick={(e) => {
                e.stopPropagation();
                props.delete(props.value)}}></img>
        </TagWrapper>
    );
};

export default Tag;
