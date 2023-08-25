import {configureStore} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { blogSlice } from './slice/blogSlice';
import { accountSlice } from './slice/accountSlice';
import { categorySlice } from './slice/categorySlice';
import { tagSlice } from './slice/tagSlice';
import { commentSlice } from './slice/commentSlice';

export const store = configureStore({
    reducer: {
       blog: blogSlice.reducer,
       category: categorySlice.reducer,
       tag: tagSlice.reducer,
       comment: commentSlice.reducer,
       account: accountSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;