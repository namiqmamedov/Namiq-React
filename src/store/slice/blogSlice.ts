import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Blog, BlogParams } from "../../models/blog";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { MetaData } from "../../models/pagination";

interface BlogState {
    blogsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    category: string[];
    categoryID: number | null;
    blogParams: BlogParams;
    metaData: MetaData | null;
}

const blogsAdapter = createEntityAdapter<Blog>()

function getAxiosParams(blogParams: BlogParams) {
    const params = new URLSearchParams();
    params.append('pageNumber',blogParams.pageNumber.toString());
    params.append('pageSize',blogParams.pageSize.toString());
    if(blogParams.category.length > 0) params.append('category',blogParams.category.toString())

    return params;
}

export const fetchBlogsAsync = createAsyncThunk<Blog[], void, {state: RootState}>(
    'blog/fetchBlogsAsync',
    async (_,thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().blog.blogParams);
        try {
            const response = await agent.Blog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'blog/fetchFilters',
    async(_,thunkAPI) => {
        try {
            return agent.Blog.fetchFilters();
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        category: [],
    }
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState: blogsAdapter.getInitialState<BlogState>({
        blogsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        metaData: null,
        categoryID: null,
        blogParams: initParams(),
        category: [],
    }),
    reducers: {
        setBlogParams: (state,action) => {
            state.blogsLoaded = false;
            state.blogParams = {...state.blogParams,...action.payload,pageNumber: 1};
        },
        setPageNumber: (state,action) => {
            state.blogsLoaded = false;
            state.blogParams = {...state.blogParams,...action.payload};
        },
        setMetaData: (state,action) => {
            state.metaData = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchBlogsAsync.pending, (state) => {
            state.status = 'pendingFetchBlogs'
        })
        builder.addCase(fetchBlogsAsync.fulfilled, (state,action) => {
            blogsAdapter.setAll(state,action.payload);
            state.status = 'idle';
            state.blogsLoaded = true;
        })
        builder.addCase(fetchBlogsAsync.rejected, (state,action) => {
            console.log(action.payload)
            state.status = 'idle';
        })
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters'
        })
        builder.addCase(fetchFilters.fulfilled, (state,action) => {
            state.category = action.payload.category;
             const category = state.categoryID = action.payload.category.id;
                console.log(category);
                
            state.filtersLoaded = true;
        })
        builder.addCase(fetchFilters.rejected, (state,action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    })
})

export const blogSelectors = blogsAdapter.getSelectors((state: RootState) => state.blog)

export const {setBlogParams,setPageNumber,setMetaData} = blogSlice.actions;


