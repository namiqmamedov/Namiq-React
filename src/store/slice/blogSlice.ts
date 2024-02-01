import { PayloadAction, createAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Blog, BlogParams } from "../../models/blog";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { MetaData } from "../../models/pagination";

interface SearchResult {
    blogTags: null | any; 
    category: null | any;
    categoryID: number;
    id: number;
    name: string;
    pictureUrl: string;
}

interface BlogState {
    blogsLoaded: boolean;
    filtersLoaded: boolean;
    hasSubmitted: boolean;
    status: string;
    category: string[];
    description: string;
    comment: string[];
    tags: string[];
    searchResults: SearchResult[];
    searchResultsCount: number;
    categoryID: number | null;
    tagID: number | null;
    blogParams: BlogParams;
    metaData: MetaData | null;
    totalResults: number;
}

const blogsAdapter = createEntityAdapter<Blog>()


function getAxiosParams(blogParams: BlogParams) {
    const params = new URLSearchParams();

    params.append('pageNumber', blogParams.pageNumber.toString());
    params.append('pageSize', blogParams.pageSize.toString());
    if (blogParams.searchTerm) params.append('searchTerm', blogParams.searchTerm);

    const hasCategory = blogParams.category.length > 0;
    const hasTags = blogParams.tags.length > 0; 

    if (hasCategory && !hasTags) {
        params.append('category', blogParams.category.toString());
    } else if (!hasCategory && hasTags) {
        params.append('tags', blogParams.tags.toString());
    }
    
    const urlParams = new URLSearchParams(window.location.search); 
    const hasCategoryInUrl = urlParams.has('category');
    const hasTagsInUrl = urlParams.has('tag');
    const hasSearchTermInUrl = urlParams.has('q');
    
    if (hasCategoryInUrl && !hasTagsInUrl) {
        params.append('category', blogParams.category.toString());
        params.delete('searchTerm'); 
    } else if (!hasCategoryInUrl && hasTagsInUrl) {
        params.append('tags', blogParams.tags.toString());
        params.delete('searchTerm'); 
    } else if (hasCategoryInUrl && hasTagsInUrl) {
        if (urlParams.get('category')) {
            params.append('category', blogParams.category.toString());
            params.delete('searchTerm');
            urlParams.delete('q')
            
        } else if (urlParams.get('tag')) {
            params.append('tags', blogParams.tags.toString());
            params.delete('searchTerm');
            urlParams.delete('q')
        }
    }
    
    if (hasSearchTermInUrl) {
        params.delete('category'); 
        params.delete('tags');
    }

    return params;
}

export const fetchBlogsAsync = createAsyncThunk<
  Blog[],
  void,
  { state: RootState }
>('blog/fetchBlogsAsync', async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().blog.blogParams);
  try {
    const response = await agent.Blog.list(params);

    thunkAPI.dispatch(setMetaData(response.metaData));
    thunkAPI.dispatch(setTotalResults(response.metaData.totalCount));

    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchBlogAsync = createAsyncThunk<Blog, string>(
    'blog/fetchBlogAsync',
    async (blogName,thunkAPI) => {
        try {
            const response = await agent.Blog.details(blogName);
            return response;
        } catch (error:any) {
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
        description: [],
        comment: [],
        tags: [],
        searchResults: [],
        searchResultsCount: 0,
        hasSubmitted: false,
        categoryAdded: false,
        tagsAdded: false
    }
}

export const clearFiltersAction = createAction("blog/clearFilters");

export const blogSlice = createSlice({
    name: 'blog',
    initialState: blogsAdapter.getInitialState<BlogState>({
        blogsLoaded: false,
        filtersLoaded: false,
        hasSubmitted: false,
        status: 'idle',
        metaData: null,
        categoryID: null,
        tagID: null,
        blogParams: initParams(),
        category: [],
        description: '',
        comment: [],
        tags: [],
        searchResults: [],
        searchResultsCount: 0,
        totalResults: 0,
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
        },
        setSearchResults: (state, action: PayloadAction<SearchResult[]>) => {
            state.searchResults = action.payload;
          },
        setSearchResultsCount: (state, action: PayloadAction<number>) => {
          state.searchResultsCount = action.payload;
        },
        setHasSubmitted: (state, action: PayloadAction<boolean>) => {
            state.hasSubmitted = action.payload;
        },
        setTotalResults: (state, action) => {
            state.totalResults = action.payload;
        },
        setBlog: (state,action) => {
            blogsAdapter.upsertOne(state, action.payload);

            state.blogsLoaded = false;
            state.description = action.payload.description;
        },
        removeBlog: (state,action) => {
            blogsAdapter.removeOne(state, action.payload);
            state.blogsLoaded = false;
        },
        resetCategories: (state) => {
            state.category = [];
            state.categoryID = null;
        },
        resetTags: (state) => {
            state.tags = [];
            state.tagID = null;
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
        builder.addCase(fetchBlogsAsync.rejected, (state) => {
            state.status = 'idle';
        })
        builder.addCase(fetchBlogAsync.pending, (state) => {
            state.status = 'pendingFetchBlog';
        })
        builder.addCase(fetchBlogAsync.fulfilled, (state,action) => {
            blogsAdapter.upsertOne(state,action.payload)
            
            state.status = 'idle';
        })
        builder.addCase(fetchBlogAsync.rejected, (state) => {
            state.status = 'idle';
        })

        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters'
        })
        builder.addCase(fetchFilters.fulfilled, (state,action) => {
            state.category = action.payload.category;
            state.tags = action.payload.tags;

            state.filtersLoaded = true;
        })
        builder.addCase(fetchFilters.rejected, (state) => {
            state.status = 'idle';
        })
        builder.addCase(clearFiltersAction, (state) => {
            state.blogParams = initParams();
        })
    })
})

export const blogSelectors = blogsAdapter.getSelectors((state: RootState) => state.blog)

export const {setBlogParams,setPageNumber,setMetaData,setSearchResults,setSearchResultsCount,setHasSubmitted,setTotalResults,setBlog,removeBlog} = blogSlice.actions;


