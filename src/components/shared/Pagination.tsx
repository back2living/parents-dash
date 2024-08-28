import {Dispatch, SetStateAction} from "react";

type PaginationType = {
    pageNum: number;
    totalPages: number;
    setPageNum: Dispatch<SetStateAction<number>>
}

const Pagination = ({pageNum, totalPages, setPageNum}: PaginationType) => {
    const prevPage = () => setPageNum(pageNum - 1);
    const nextPage = () => setPageNum(pageNum + 1);

    let middlePagination;

    if (totalPages <= 5) {
        middlePagination = [...Array(totalPages)].map((_, index) => {
            return <button className={"pagination-btn"} key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === index + 1}>
                {index + 1}
            </button>
        });
    }

    if (totalPages > 5) {
        const startValue = Math.floor((pageNum - 1) / 5) * 5;
        middlePagination = <>
            {[...Array(5)].map((_, index) => {
                const pageNumber = startValue + index + 1;

                return <button className={"pagination-btn"} disabled={pageNum === pageNumber} key={pageNumber} onClick={() => {
                    setPageNum(pageNumber);
                }}>
                    {pageNumber}
                </button>
            })}

            <button className={"pagination-btn"} onClick={() => setPageNum(6)}>...</button>
            <button className={"pagination-btn"} onClick={() => setPageNum(totalPages)}>{totalPages}</button>
        </>
    }

    /**
     * if the total number of pages is greater than 5 and the current page number is greater than 5.
     * calculate the startValue of the page
     * show the first five buttons....1,2,3,4,5
     * the buttons must have the correct numbers.
     * get the ellipses number...the start value + the length of the array i.e 5 + 1
     *
     * */

    if (totalPages > 5 && pageNum > 5) {
        const startValue = Math.floor((pageNum - 1) / 5) * 5;
        let prevEllipsesNumber: number;
        let nextEllipsesNumber: number;
        if (totalPages - pageNum >= 5) {

            prevEllipsesNumber = startValue;

            middlePagination = <>
                <button className={"pagination-btn"} onClick={() => setPageNum(1)}>1</button>
                <button className={"pagination-btn"} onClick={() => setPageNum(prevEllipsesNumber)}>...</button>
                <button className={"pagination-btn"} onClick={() => setPageNum(startValue)}>{startValue}</button>


                {[...Array(5)].map((_, index, array) => {
                    nextEllipsesNumber = startValue + array.length + 1;
                    return <button className={"pagination-btn"} disabled={pageNum === startValue + index + 1} key={startValue + index + 1} onClick={() => {
                        setPageNum(startValue + index + 1);
                    }}>
                        {startValue + index + 1}
                    </button>
                })}

                <button className={"pagination-btn"} onClick={() => setPageNum(nextEllipsesNumber)}>...</button>
                <button className={"pagination-btn"} onClick={() => setPageNum(totalPages)}>{totalPages}</button>
            </>
        } else {
            // const pagesLeft = totalPages - pageNum;
            prevEllipsesNumber = startValue;
            middlePagination = <>
                <button className={"pagination-btn"} onClick={() => setPageNum(1)}>1</button>
                <button className={"pagination-btn"} onClick={() => setPageNum(prevEllipsesNumber)}>...</button>
                <button className={"pagination-btn"} onClick={() => setPageNum(startValue)}>{startValue}</button>


                {[...Array(totalPages)].map((_, index) => {
                    return <button className={"pagination-btn"} style={{display: (totalPages < startValue + index + 1) ? "none": ""}} disabled={pageNum === startValue + index + 1} key={startValue + index + 1} onClick={() => {
                        setPageNum(startValue + index + 1);
                    }}>
                        {startValue + index + 1}
                    </button>
                })}
            </>
        }
    }

    return totalPages > 1 && (
        <div className={"flex-center flex-wrap justify-center gap-2 lg:gap-6 p-4 mt-4"}>
            <button className={"pagination-direction-btn"} disabled={pageNum === 1} onClick={prevPage}>{"Prev"}</button>

            <div className={"flex gap-1 lg:gap-2"}>
                {middlePagination}
            </div>

            <button className={"pagination-direction-btn"} disabled={pageNum === totalPages} onClick={nextPage}>{"Next"}</button>
        </div>
    );
};

export default Pagination;