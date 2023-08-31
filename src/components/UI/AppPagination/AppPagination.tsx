import { useEffect, useState } from "react";
import { MetaData } from "../../../models/pagination"
import { Box, Pagination } from "@mui/material";
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


const AppPagination = ({metaData,onPageChange,category,tag}:Props) => {
    const {currentPage,totalCount,totalPages,pageSize} = metaData;
    const [pageNumber,setPageNumber] = useState(currentPage);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        setPageNumber(page);
    }, [page]);

    const handlePageChange = (newPage: number) => {

      setPageNumber(newPage);

      const querySearchTerm = searchParams.get('q');
  
      dispatch(setTotalResults(totalCount));
  
      onPageChange(newPage, querySearchTerm || undefined);
  
      searchParams.set('page', newPage.toString());
  
      if (category) {
          searchParams.set('category', category);
      }
  
      if (tag) {
          searchParams.set('tag', tag);
      }

      navigate(`?${searchParams.toString()}`);
  }

  return (
    <>
    <Box className="app-pagination" display='flex' justifyContent='space-between' alignItems='center' sx={{mb: 2}} >
        <p className="mb-0 text-[18px]">
          Displaying {(pageNumber-1)*pageSize+1} 
          - 
          {pageNumber*pageSize > totalCount ? totalCount : pageNumber * pageSize} of {totalCount} items
        </p>
        <Pagination
          size='large'
          count={totalPages}
          page={pageNumber}
          onChange={(_e, newPage) => handlePageChange(newPage)}
        />
    </Box>
    </>

  )
}

export default AppPagination