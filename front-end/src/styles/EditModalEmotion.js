import styled from "@emotion/styled";
import { Common } from "./Common";

export const EllipsisWrapper = styled.div`
  padding-left: 15px;
  padding-right: 5px;

  .ellipsis-button {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-left: auto;
  }

  .ellipsis {
    height: 20px;
    cursor: pointer;
  }

  .ellipsis:hover {
    height: 25px;
  }
`;

export const EditModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  align-items: flex-end;
  font-size: 16px;

  .xmark-svg {
    height: 15px;
    margin-bottom: 7px;
  }

  .modal-inner {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .delete {
    cursor: pointer;
    color: ${Common.colors.cancelRedText};
  }
  
  .delete:hover {
    color: #FFA4A4;
  }

  .edit {
    cursor: pointer;
  }

  .edit:hover {
    color: ${Common.colors.lightGray01};
  }
`;
