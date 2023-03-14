import styled from "@emotion/styled";

export const EllipsisWrapper = styled.div`
  padding-left: 15px;
  padding-right: 5px;

  .ellipsis-button {
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
  justify-content: flex-start;
  align-items: flex-end;
  margin-left: auto;
  .delete {
    color: #ffa7a7;
  }
`;
