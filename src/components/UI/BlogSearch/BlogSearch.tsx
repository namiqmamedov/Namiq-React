import { TextField, debounce } from '@mui/material';
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../store/configureStore';
import { setBlogParams } from '../../../store/slice/blogSlice';

const BlogSearch = () => {
    const { blogParams } = useAppSelector(state => state.blog);
    const [searchTerm, setSearchTerm] = useState(blogParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((value: string) => {
        dispatch(setBlogParams({ searchTerm: value }));
    }, 1000);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        debouncedSearch(searchTerm!);
    };

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <TextField
                label='Search products'
                variant='outlined'
                fullWidth
                value={searchTerm || ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    setSearchTerm(value);
                }}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
  )
}

export default BlogSearch