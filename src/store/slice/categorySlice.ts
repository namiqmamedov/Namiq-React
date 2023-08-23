import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../models/pagination";
import { Category, CategoryParams } from "../../models/category";
import { RootState } from "../configureStore";
import agent from "../../api/agent";


interface CategoryState {
    categoryLoaded: boolean;
    hasSubmitted: boolean;
    status: string;
    metaData: MetaData | null;
    categoryParams: CategoryParams;
    totalResults: number;
}

const categoryAdapter = createEntityAdapter<Category>()

function getAxiosParams(categoryParams: CategoryParams) {
    const params = new URLSearchParams();
    params.append('pageNumber',categoryParams.pageNumber.toString());
    params.append('pageSize',categoryParams.pageSize.toString());

    return params;
}

export const fetchCategoryAsync = createAsyncThunk<
  Category[],
  void,
  { state: RootState }
>('category/fetchCategoryAsync', async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().category.categoryParams);
    try {
        const response = await agent.Category.list(params);
        thunkAPI.dispatch(setMetaData(response.metaData));
        thunkAPI.dispatch(setTotalResults(response.metaData.totalCount));

        return response.items;
    } catch (error:any) {
        return thunkAPI.rejectWithValue({error: error.data});
    }
 });

 function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        hasSubmitted: false,
    }
}

 export const categorySlice = createSlice({
     name: 'category',
     initialState: categoryAdapter.getInitialState<CategoryState>({
         categoryLoaded: false,
         hasSubmitted: false,
         status: 'idle',
         categoryParams: initParams(),
         totalResults: 0,
         metaData: null
     }),
     reducers: {
        setCategoryParams: (state,action) => {
            state.categoryLoaded = false;
            state.categoryParams = {...state.categoryParams,...action.payload,pageNumber: 1};
        },
        setPageNumber: (state,action) => {
            state.categoryLoaded = false;
            state.categoryParams = {...state.categoryParams,...action.payload};
        },
        setMetaData: (state,action) => {
            state.metaData = action.payload;
        },
        setTotalResults: (state, action) => {
            state.totalResults = action.payload;
        },
        setHasSubmitted: (state,action: PayloadAction<boolean>) => {
            state.hasSubmitted = action.payload;
        },
        setCategory: (state,action) => {
            categoryAdapter.upsertOne(state, action.payload);

            state.categoryLoaded = false;
        },
        removeCategory: (state,action) => {
            categoryAdapter.removeOne(state,action.payload);
            state.categoryLoaded = false;
        }
     },
     extraReducers: (builder => {
        builder.addCase(fetchCategoryAsync.pending, (state) => {
            state.status = 'pendingFetchCategory'
        })
        builder.addCase(fetchCategoryAsync.fulfilled, (state,action) => {
            categoryAdapter.setAll(state, action.payload);

            state.status = 'idle';
            state.categoryLoaded = true;
        })
        builder.addCase(fetchCategoryAsync.rejected, (state) => {
            state.status = 'idle';
        })
     })
 })


 export const categorySelectors = categoryAdapter.getSelectors((state: RootState) => state.category)

 export const {setCategoryParams,setMetaData,setPageNumber,setHasSubmitted,setCategory,setTotalResults,removeCategory} = categorySlice.actions; 