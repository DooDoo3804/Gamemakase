import Pagination from "react-js-pagination";
import styled from "@emotion/styled";
import { Common } from "../styles/Common";

const PagingBar = styled.div`
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .pagination {
    display: flex;
    justify-content: center;
    height: 80px;
    margin-top: 25px;
    margin-bottom: 0px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    width: 32px;
    height: 32px;
    margin-left: 8px;
    margin-right: 8px;

    border: 1px solid ${Common.colors.white01};
    border-radius: 7px;
    background-color: rgba(217, 217, 217, 0.3);

    display: flex;
    justify-content: center;
    align-items: center;

    line-height: 30px;
    font-size: 20px;
    font-family: "bitbit";
  }
  ul.pagination li:hover {
    background-color: rgba(217, 217, 217, 0.5);
  }

  ul.pagination .active a {
    color: ${Common.colors.mainColor02};
  }

  ul.pagination .active {
    background-color: rgba(217, 217, 217, 0.5);
  }

  ul.pagination a {
    text-decoration: none;
    padding-top: 2px;
    color: ${Common.colors.white01};
  }

  ul.pagination li a:hover {
    color: ${Common.colors.mainColor04};
  }
`;

export const Paging = ({ page, count, setPage, countPerPage }) => {
  return (
    <PagingBar>
      <Pagination
        activePage={page}
        itemsCountPerPage={countPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    </PagingBar>
  );
};
