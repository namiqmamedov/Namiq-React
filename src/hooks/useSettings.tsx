import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore'
import { fetchSettingAsync, settingSelectors } from '../store/slice/settingSlice'

const useSettings = () => {
    const setting = useAppSelector(settingSelectors.selectAll);
    const {settingLoaded, metaData} = useAppSelector(state => state.setting);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(!settingLoaded) dispatch(fetchSettingAsync());
    }, [settingLoaded,dispatch])

    return (
    {setting,settingLoaded,metaData}
  )
}

export default useSettings