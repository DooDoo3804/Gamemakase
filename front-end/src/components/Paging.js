import Pagination from 'react-js-pagination';
import {
  PagingBar
} from "../styles/PagingEmotion";

export const Paging = ({ page, count, setPage, countPerPage }) => {
  return (
    <PagingBar>
      <Pagination
        activePage={page}
        itemsCountPerPage={countPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={setPage}
      />
    </PagingBar>
  );
};