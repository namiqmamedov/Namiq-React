import { useState } from "react";
import { MetaData } from "../../../models/pagination"
import { Box, Typography, Pagination } from "@mui/material";

interface Props {
    metaData: MetaData;
    onPageChange: (page:number) => void;
}

const AppPagination = ({metaData,onPageChange}:Props) => {
    const {currentPage,totalCount,totalPages,pageSize} = metaData;
    const [pageNumber,setPageNumber] = useState(currentPage);

    const handlePageChange = (page: number) => {
        setPageNumber(page);
        onPageChange(page);
    }

  return (
    // <ul className="pagination pagination-sm flex justify-center mt-4">
    // <li className="page-item disabled">
    // <a className="page-link" href="#">
    //     &laquo;
    // </a>
    // </li>
    // <li className="page-item active">
    // <a className="page-link" href="#">
    //     {totalPages}
    // </a>
    // </li>
    // <li className="page-item">
    // <a className="page-link" href="#">
    //     &raquo;
    // </a>
    // </li>
    // </ul>
    <Box display='flex' justifyContent='space-between' alignItems='center' >
    <Typography>
      Displaying {(currentPage-1)*pageSize+1} 
      - 
      {currentPage*pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
    </Typography>
    <Pagination
    color='secondary'
    size='large'
    count={totalPages}
    page={pageNumber}
    onChange={(_e, page) => handlePageChange(page)}
    />
</Box>
  )
}

export default AppPagination