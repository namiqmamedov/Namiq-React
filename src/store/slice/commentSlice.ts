import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { MetaData } from "../../models/pagination";
import { RootState } from "../configureStore";
import agent from "../../api/agent";
import { Comment, CommentParams } from "../../models/comment";

interface CommentState {
    commentLoaded: boolean;
    hasSubmitted: boolean;
    status: string;
    metaData: MetaData | null;
    commentParams: CommentParams;
    totalResults: number;
}

const commentAdapter = createEntityAdapter<Comment>()

function getAxiosParams(commentParams: CommentParams) {
    const params = new URLSearchParams();
    params.append('pageNumber',commentParams.pageNumber.toString());
    params.append('pageSize',commentParams.pageSize.toString());

    return params;
}

export const fetchCommentAsync = createAsyncThunk<
  Comment[],
  void,
  { state: RootState }
>('comment/fetchCommentAsync', async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().comment.commentParams);
    try {
        const response = await agent.Comment.list(params);
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

 export const commentSlice = createSlice({
     name: 'comment',
     initialState: commentAdapter.getInitialState<CommentState>({
         commentLoaded: false,
         hasSubmitted: false,
         status: 'idle',
         commentParams: initParams(),
         totalResults: 0,
         metaData: null
     }),
     reducers: {
        setCommentParams: (state,action) => {
            state.commentLoaded = false;
            state.commentParams = {...state.commentParams,...action.payload,pageNumber: 1};
        },
        setPageNumber: (state,action) => {
            state.commentLoaded = false;
            state.commentParams = {...state.commentParams,...action.payload};
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
        setComment: (state,action) => {
            commentAdapter.upsertOne(state, action.payload);

            state.commentLoaded = false;
        },
        removeComment: (state,action) => {
            commentAdapter.removeOne(state,action.payload);
            state.commentLoaded = false;
        }
     },
     extraReducers: (builder => {
        builder.addCase(fetchCommentAsync.pending, (state) => {
            state.status = 'pendingFetchComment'
        })
        builder.addCase(fetchCommentAsync.fulfilled, (state,action) => {
            commentAdapter.setAll(state, action.payload);

            state.status = 'idle';
            state.commentLoaded = true;
        })
        builder.addCase(fetchCommentAsync.rejected, (state) => {
            state.status = 'idle';
        })
     })
 })


 export const commentSelectors = commentAdapter.getSelectors((state: RootState) => state.comment)

 export const {setCommentParams,setMetaData,setPageNumber,setHasSubmitted,setComment,setTotalResults,removeComment} = commentSlice.actions; 