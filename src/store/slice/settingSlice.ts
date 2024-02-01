import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../models/pagination";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { Setting, SettingParams } from "../../models/setting";


interface SettingState {
    settingLoaded: boolean;
    hasSubmitted: boolean;
    status: string;
    metaData: MetaData | null;
    settingParams: SettingParams;
    totalResults: number;
}

const settingAdapter = createEntityAdapter<Setting>()

function getAxiosParams(settingParams: SettingParams) {
    const params = new URLSearchParams();
    params.append('pageNumber',settingParams.pageNumber.toString());
    params.append('pageSize',settingParams.pageSize.toString());

    return params;
}

export const fetchSettingAsync = createAsyncThunk<
  Setting[],
  void,
  { state: RootState }
>('setting/fetchSettingAsync', async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().setting.settingParams);
    try {
        const response = await agent.Setting.list(params);
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

 export const settingSlice = createSlice({
     name: 'setting',
     initialState: settingAdapter.getInitialState<SettingState>({
         settingLoaded: false,
         hasSubmitted: false,
         status: 'idle',
         settingParams: initParams(),
         totalResults: 0,
         metaData: null
     }),
     reducers: {
        setTagParams: (state,action) => {
            state.settingLoaded = false;
            state.settingParams = {...state.settingParams,...action.payload,pageNumber: 1};
        },
        setPageNumber: (state,action) => {
            state.settingLoaded = false;
            state.settingParams = {...state.settingParams, ...action.payload};
        },
        setMetaData: (state,action) => {
            state.metaData = action.payload;
        },
        setTotalResults: (state, action) => {
            state.totalResults = action.payload;
        },
        setSetting: (state,action) => {
            settingAdapter.upsertOne(state, action.payload);

            state.settingLoaded = false;
        }
     },
     extraReducers: (builder => {
        builder.addCase(fetchSettingAsync.pending, (state) => {
            state.status = 'pendingFetchSetting'
        })
        builder.addCase(fetchSettingAsync.fulfilled, (state,action) => {
            settingAdapter.setAll(state, action.payload);

            state.status = 'idle';
            state.settingLoaded = true;
        })
        builder.addCase(fetchSettingAsync.rejected, (state) => {
            state.status = 'idle';
        })
     })
 })


 export const settingSelectors = settingAdapter.getSelectors((state: RootState) => state.setting)

 export const {setMetaData,setTotalResults,setPageNumber,setTagParams,setSetting} = settingSlice.actions; 