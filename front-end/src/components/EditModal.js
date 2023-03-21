import { useState, useRef } from "react";
import { EllipsisWrapper, EditModalWrapper } from "../styles/EditModalEmotion";
import ellipsisSvg from "../assets/fontAwesomeSvg/ellipsis-vertical-solid.svg";
import xmarkSvg from "../assets/fontAwesomeSvg/xmark.svg";

const EditModal = (props) => {
    const [showModal, setShowModal] = useState(false);

    const wrapperRef = useRef();
    const handleClose = () => {
        setShowModal(false);
    };

    if (!showModal) {
        return (
            <EllipsisWrapper
                className="ellipsis-button"
                onClick={() => {
                    setShowModal(!showModal);
                }}
            >
                <img src={ellipsisSvg} alt="ellipsis" className="ellipsis" />
            </EllipsisWrapper>
        );
    }

    return (
        <EditModalWrapper className="editModal" exit={{ opacity: 0 }}>
            <img
                src={xmarkSvg}
                alt="xmarkSvg"
                className="xmark-svg"
                ref={wrapperRef}
                onClick={(e) => {
                    if (wrapperRef.current === e.target) {
                        handleClose();
                    }
                }}
            />
            <div className="modal-inner">
                <span onClick={props.editFunction} className="edit">수정</span>
                <span onClick={props.deleteFunction} className="delete">삭제</span>
            </div>
        </EditModalWrapper>
    );
};

export default EditModal;
