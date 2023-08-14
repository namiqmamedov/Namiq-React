import { debounce } from '@mui/material';
import {  useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/configureStore';
import { setBlogParams,setHasSubmitted,setSearchResults, setSearchResultsCount } from '../../../store/slice/blogSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogSearch = () => {
    const { blogParams } = useAppSelector(state => state.blog);
    const [searchTerm, setSearchTerm] = useState(blogParams.searchTerm);
    const navigate = useNavigate(); 
    const dispatch = useAppDispatch();
    const location = useLocation(); // Get the current location object


    const searchParams = new URLSearchParams(location.search);
   // Check if categoryID exists in the URL
   const categoryIDExists = searchParams.has('categoryID');
    
   // Get the categoryID value from the URL
   const categoryID = categoryIDExists ? searchParams.get('categoryID') : null;

   const tagIDExists = searchParams.has('tagID');
    
   // Get the categoryID value from the URL
   const tagID = tagIDExists ? searchParams.get('tagID') : null;

    const debouncedSearch = debounce(async (value: string) => {
        dispatch(setBlogParams({ searchTerm: value }));

        try {
            if (value.trim() === '') {
                dispatch(setSearchResults([]));
                dispatch(setSearchResultsCount(0));
                return;
            }
            
            const response = await fetch(`http://localhost:5000/api/blog/list?searchTerm=${encodeURIComponent(value)}&categoryID=${encodeURIComponent(categoryID || '')}&tagID=${encodeURIComponent(tagID || '')}`);
            
            const data = await response.json();
            
            if (data) {
                dispatch(setSearchResults(data));
                dispatch(setSearchResultsCount(data.length));
            } else {
                setSearchResults([]);
                setSearchResultsCount(0);
            }
        } catch (error) {
            setSearchResults([]); // Reset searchResults to an empty array in case of an error
            setSearchResultsCount(0); // Reset the count
        }
    }, 1000);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setHasSubmitted(true));
        debouncedSearch(searchTerm!);

        navigate(`/search?q=${encodeURIComponent(searchTerm!)}&page=1${categoryID !== null ? `&categoryID=${encodeURIComponent(categoryID)}` : ''}${tagID !== null ? `&tagID=${encodeURIComponent(tagID)}` : ''}`);
    };

    return (
        <div>
       <form className="d-flex" onSubmit={handleSubmit}>
        <input 
            className="form-control me-sm-2"
            type="search"
            placeholder="Search"  
            value={searchTerm || ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setSearchTerm(value);
                setHasSubmitted(false);
            }}
        />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
        </div>
  )
}

export default BlogSearch