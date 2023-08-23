import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../models/pagination";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { Tag, TagParams } from "../../models/tag";


interface TagState {
    tagLoaded: boolean;
    hasSubmitted: boolean;
    status: string;
    metaData: MetaData | null;
    tagParams: TagParams;
    totalResults: number;
}

const tagAdapter = createEntityAdapter<Tag>()

function getAxiosParams(tagParams: TagParams) {
    const params = new URLSearchParams();
    params.append('pageNumber',tagParams.pageNumber.toString());
    params.append('pageSize',tagParams.pageSize.toString());

    return params;
}

export const fetchTagAsync = createAsyncThunk<
  Tag[],
  void,
  { state: RootState }
>('tag/fetchTagAsync', async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().tag.tagParams);
    try {
        const response = await agent.Tag.list(params);
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

 export const tagSlice = createSlice({
     name: 'tag',
     initialState: tagAdapter.getInitialState<TagState>({
         tagLoaded: false,
         hasSubmitted: false,
         status: 'idle',
         tagParams: initParams(),
         totalResults: 0,
         metaData: null
     }),
     reducers: {
        setTagParams: (state,action) => {
            state.tagLoaded = false;
            state.tagParams = {...state.tagParams,...action.payload,pageNumber: 1};
        },
        setPageNumber: (state,action) => {
            state.tagLoaded = false;
            state.tagParams = {...state.tagParams,...action.payload};
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
        setTag: (state,action) => {
            tagAdapter.upsertOne(state, action.payload);

            state.tagLoaded = false;
        },
        removeTag: (state,action) => {
            tagAdapter.removeOne(state,action.payload);
            state.tagLoaded = false;
        }
     },
     extraReducers: (builder => {
        builder.addCase(fetchTagAsync.pending, (state) => {
            state.status = 'pendingFetchTag'
        })
        builder.addCase(fetchTagAsync.fulfilled, (state,action) => {
            tagAdapter.setAll(state, action.payload);

            state.status = 'idle';
            state.tagLoaded = true;
        })
        builder.addCase(fetchTagAsync.rejected, (state) => {
            state.status = 'idle';
        })
     })
 })


 export const tagSelectors = tagAdapter.getSelectors((state: RootState) => state.tag)

 export const {setTagParams,setMetaData,setPageNumber,setHasSubmitted,setTag,setTotalResults,removeTag} = tagSlice.actions; 