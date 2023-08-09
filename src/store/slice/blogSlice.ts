import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Blog, BlogParams } from "../../models/blog";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { MetaData } from "../../models/pagination";

interface BlogState {
    blogsLoaded: boolean;
    status: string;
    blogParams: BlogParams;
    metaData: MetaData | null;
}

const blogsAdapter = createEntityAdapter<Blog>()

function getAxiosParams(blogParams: BlogParams) {
    const params = new URLSearchParams();
    params.append('pageNumber',blogParams.pageNumber.toString());
    params.append('pageSize',blogParams.pageSize.toString());
    return params;
}

export const fetchBlogsAsync = createAsyncThunk<Blog[], void, {state: RootState}>(
    'blog/fetchBlogsAsync',
    async (_,thunkAPI) => {
        debugger;
        try {
            const response = await agent.Blog.list();
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
    }
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState: blogsAdapter.getInitialState<BlogState>({
        blogsLoaded: false,
        status: 'idle',
        blogParams: initParams(),
        metaData: null
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
    })
})

export const blogSelectors = blogsAdapter.getSelectors((state: RootState) => state.blog)

export const {setBlogParams,setPageNumber,setMetaData} = blogSlice.actions;


