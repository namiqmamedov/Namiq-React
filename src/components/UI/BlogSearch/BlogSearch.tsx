import { debounce } from '@mui/material';
import { Fragment,  useEffect,  useState } from 'react'
import { useAppSelector, useAppDispatch} from '../../../store/configureStore';
import { setBlogParams,setHasSubmitted,setSearchResults, setSearchResultsCount } from '../../../store/slice/blogSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const BlogSearch = () => {
    const { blogParams } = useAppSelector(state => state.blog);
    const [searchTerm, setSearchTerm] = useState(blogParams.searchTerm);
    const hasSubmitted = useAppSelector(state => state.blog.hasSubmitted);
    const trimmedSearchTerm = searchTerm?.trim();
    
    const isOnlySpaces = (str:string) => {
        return str.trim() === '';
    }

    useEffect(() => {
        if (searchTerm && hasSubmitted) {
            document.title = `Search results for “${trimmedSearchTerm}” | Namiq`;
        }
    }, [searchTerm,hasSubmitted]);

    const navigate = useNavigate(); 
    const dispatch = useAppDispatch();
    const location = useLocation(); 

    const searchParams = new URLSearchParams(location.search);

    const debouncedSearch = debounce(async (value: string) => {
        dispatch(setBlogParams({ searchTerm: value }));

        try {
            if (value.trim() === '') {
                dispatch(setSearchResults([]));
                dispatch(setSearchResultsCount(0));
                return;
            }
            
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/blog/list?searchTerm=${encodeURIComponent(value)}`);
            
            const data = await response.json();
            
            if (data) {
                dispatch(setSearchResults(data));
                dispatch(setSearchResultsCount(data.length));
            } else {
                setSearchResults([]);
                setSearchResultsCount(0);
            }
        } catch (error) {
            setSearchResults([]);
            setSearchResultsCount(0);
        }
    }, 1000);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setHasSubmitted(true));


        if (trimmedSearchTerm) {
            debouncedSearch(trimmedSearchTerm!);
            navigate(`/search?q=${encodeURIComponent(trimmedSearchTerm!)}&page=1`);
        } else {
            searchParams.delete('q');
            searchParams.delete('page'); 

            if (trimmedSearchTerm === ' ' || isOnlySpaces(trimmedSearchTerm!)) {
                window.location.reload();
            } 
            
            navigate('/');
            window.location.reload();
        }
    };

    return (
        <Fragment>
            <form className="d-flex form__search search-item" onSubmit={handleSubmit}>
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
        </Fragment>
  )
}

export default BlogSearch