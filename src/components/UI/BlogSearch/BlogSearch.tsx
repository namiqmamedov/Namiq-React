import { TextField, debounce } from '@mui/material';
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/configureStore';
import { setBlogParams } from '../../../store/slice/blogSlice';


interface SearchResult {
    blogTags: null | any; 
    category: null | any;
    categoryID: number;
    id: number;
    name: string;
    pictureUrl: string;
}

const BlogSearch = () => {
    const { blogParams } = useAppSelector(state => state.blog);
    const [searchTerm, setSearchTerm] = useState(blogParams.searchTerm);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchResultsCount, setSearchResultsCount] = useState<number>(0); // Track the count
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false); // Track form submission
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(async (value: string) => {
        dispatch(setBlogParams({ searchTerm: value }));
        setHasSubmitted(true);

        try {
            if (value.trim() === '') {
                setSearchResults([]);
                setSearchResultsCount(0);
                return;
            }
            
            const response = await fetch(`http://localhost:5000/api/blog/list?searchTerm=${encodeURIComponent(value)}`);
            const data = await response.json();
            console.log('API Response:', data); // Log the API response for debugging

            
            if (data) {
                setSearchResults(data);
                setSearchResultsCount(data.length);
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
        debugger;
        event.preventDefault();
        setHasSubmitted(true);
        debouncedSearch(searchTerm!);
    };
    
    // Use useEffect to watch for changes in searchResults and update the state
    useEffect(() => {
        console.log('searchResults:', searchResults,searchResultsCount);
    }, [searchResults, searchResultsCount]);


    return (
        <div>
            <form className="d-flex" onSubmit={handleSubmit}>
                <TextField
                    label='Search products'
                    variant='outlined'
                    fullWidth
                    value={searchTerm || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.target.value;
                        setSearchTerm(value);
                        setHasSubmitted(false); // Reset hasSubmitted when input changes
                    }}
                />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div>
            {hasSubmitted && (
            (searchResultsCount === 0 && searchTerm?.length! > 1) ? (
                <p>No results found.</p>
            ) : (
                searchResultsCount > 0 && (
                    <div>
                        <p>Search Results Count: {searchResultsCount}</p>
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result.id}>{result.name}</li>
                            ))}
                        </ul>
                    </div>
                )
            )
        )}

            </div>
        </div>
  )
}

export default BlogSearch