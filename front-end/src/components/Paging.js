import Pagination from 'react-js-pagination';
import {
  PagingBar
} from "../styles/PagingEmotion";

export const Paging = ({ page, count, setPage }) => {
  return (
    <PagingBar>
      <Pagination
        activePage={page}
        itemsCountPerPage={6}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={setPage}
      />
    </PagingBar>
  );
};