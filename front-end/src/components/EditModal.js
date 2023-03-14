import { useState, useRef } from "react"
import { 
    EllipsisWrapper,
    EditModalWrapper, } from "../styles/EditModalEmotion";
import ellipsis from "../assets/fontAwesomeSvg/ellipsis-vertical-solid.svg";

const EditModal = () => {
    const [showModal, setShowModal] = useState(false);

    const wrapperRef = useRef();
    const handleClose = () => {
        setShowModal(false);
    };

    if (!showModal) {
        return (
            <EllipsisWrapper className="ellipsis-button"
                onClick={() => { setShowModal(!showModal) }}>
                <img src={ellipsis} alt="ellipsis" className="ellipsis" />
            </EllipsisWrapper>
        )
    };
    
    return (
        <EditModalWrapper
            className="editModal"
            ref={wrapperRef}
            onClick={(e) => {
                if (wrapperRef.current !== e.target) {
                    handleClose();
                }
            }}
            exit={{ opacity: 0 }}
        >
            <span className="edit">edit</span>
            <span className="delete">delete</span>
        </EditModalWrapper>
    );
};

export default EditModal;