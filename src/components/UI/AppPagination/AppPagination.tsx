import { useEffect, useState } from "react";
import { MetaData } from "../../../models/pagination"
import { Box, Typography, Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTotalResults } from "../../../store/slice/blogSlice";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number, searchTerm?: string) => void;
    searchTerm?: string;
    category?: string; 
    tag?: string; 
}


const AppPagination = ({metaData,onPageChange,searchTerm,category,tag}:Props) => {
    const {currentPage,totalCount,totalPages,pageSize} = metaData;
    const [pageNumber,setPageNumber] = useState(currentPage);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        // Update the pageNumber state with the current page
        setPageNumber(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {
      // Update the page number state
      setPageNumber(newPage);

      // Get the current search term from the query parameters
      const querySearchTerm = searchParams.get('q');

      dispatch(setTotalResults(totalCount));

      // Call the onPageChange callback with the page number and search term
      onPageChange(newPage, querySearchTerm || undefined);

      // Update the search parameters with the new page number and search term
      searchParams.set('page', newPage.toString());
     
      if(searchTerm) {
        searchParams.set('q', searchTerm || '');
      }

      if (category) {
        searchParams.set('category', category);
      }

      if (tag) {
        searchParams.set('tag', tag);
      }

      // Navigate to the new URL
      navigate(`?${searchParams.toString()}`);
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
      Displaying {(pageNumber-1)*pageSize+1} 
      - 
      {pageNumber*pageSize > totalCount ? totalCount : pageNumber * pageSize} of {totalCount} items
    </Typography>
    <Pagination
      color='secondary'
      size='large'
      count={totalPages}
      page={pageNumber}
      onChange={(_e, newPage) => handlePageChange(newPage)}
    />
</Box>
  )
}

export default AppPagination