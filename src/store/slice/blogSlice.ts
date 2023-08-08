import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Blog } from "../../models/blog";
import { RootState } from "../configureStore";
import agent from "../../api/agent";

interface BlogState {
    blogsLoaded: boolean;
    status: string;
}

const blogsAdapter = createEntityAdapter<Blog>()

export const fetchBlogsAsync = createAsyncThunk<Blog[], void, {state: RootState}>(
    'blog/fetchBlogsAsync',
    async (_,thunkAPI) => {
        debugger;
        try {
            const response = await agent.Blog.list();

            return response
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const blogSlice = createSlice({
    name: 'blog',
    initialState: blogsAdapter.getInitialState<BlogState>({
        blogsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
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


