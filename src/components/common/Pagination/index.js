import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

function Pagination({ pageCount, setactivePage, activePage }) {

    return (
        <div className="d-flex pagination-Content justify-content-end ">
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={(e) => setactivePage(e.selected + 1)}
                containerClassName={styles.paginationButtons}
                previousClassName={styles.previousButton}
                nextClassName={styles.nextButton}
                disabledClassName={styles.disabledButton}
                activeClassName={styles.paginationActive}
                breakClassName={styles.paginationBreak}
                activeLinkClassName={styles.paginationActive}
                forcePage={activePage - 1}
            />
        </div>
    );
}

export default Pagination;
