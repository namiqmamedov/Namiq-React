import { debounce } from '@mui/material';
import {  useState } from 'react'
import { useAppSelector, useAppDispatch, RootState } from '../../../store/configureStore';
import { setBlogParams,setHasSubmitted,setSearchResults, setSearchResultsCount } from '../../../store/slice/blogSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const BlogSearch = () => {
    const { blogParams } = useAppSelector(state => state.blog);
    const [searchTerm, setSearchTerm] = useState(blogParams.searchTerm);
    const navigate = useNavigate(); // Get the navigate function from react-router-dom
    const hasSubmitted = useSelector((state: RootState) => state.blog.hasSubmitted); // Get hasSubmitted from Redux state
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(async (value: string) => {
        dispatch(setBlogParams({ searchTerm: value }));

        try {
            if (value.trim() === '') {
                dispatch(setSearchResults([]));
                dispatch(setSearchResultsCount(0));
                return;
            }
            
            const response = await fetch(`http://localhost:5000/api/blog/list?searchTerm=${encodeURIComponent(value)}`);
            const data = await response.json();
            console.log('API Response:', data); // Log the API response for debugging

            
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
        navigate(`/search?q=${encodeURIComponent(searchTerm!)}`); // Navigate to the search results page
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
        {hasSubmitted && <p>Form submitted!</p>}
      </form>
        </div>
  )
}

export default BlogSearch