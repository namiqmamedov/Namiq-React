import { Box, Paper, Typography, Grid, Button, Container, List, ListItem } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import AppTextInput from "../AppTextInput/AppTextInput";
import { useEffect, useState } from "react";
import { TiMediaRecord } from "react-icons/ti";
import { getAuthorizationHeader } from "../../../util/util";
import { Setting } from "../../../models/setting";
import { setSetting } from "../../../store/slice/settingSlice";
import { useAppDispatch } from "../../../store/configureStore";

interface Props {
    setting?: Setting;
    cancelEdit: () => void;
}

export default function SettingForm({ setting, cancelEdit }: Props) {
    const { control, reset, handleSubmit,setError, formState: { isDirty, isSubmitting }} = useForm({
          mode: 'all'
    });

    function handleApiErrors(errors: any) {
        console.log(errors);
         if (Array.isArray(errors)) {
            errors.forEach((error: string) => {
                console.log(error);
    
                if (error.includes('Key')) {
                    setError('key', { message: error })
                }
                if (error.includes('Value')) {
                    setError('value', { message: error })
                }  
            });
        }
    }

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (setting && !isDirty) reset(setting);
    }, [setting, reset, isDirty])

    async function handleSubmitData(data: FieldValues)
    {
        try {
            let response: Setting | undefined;

            const authorizationHeader = getAuthorizationHeader();

            if(setting) {
                response = await agent.Admin.updateSetting(data,authorizationHeader);   
            } 
            dispatch(setSetting(response));
            cancelEdit();
        } catch (error:any) {
            if (error) {
                const errorMessageFromAPI = error.data;
                setErrorMessage(errorMessageFromAPI); 

                console.log(error);
                
            } else {
                setErrorMessage("An error occurred."); 
            }
            handleApiErrors(error)

            console.log(error);
        }
    }

    return (
        <Container sx={{mt: 4}}>
            <Box component={Paper} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                    Edit setting
                </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                {errorMessage && (
                        <List className="!ml-2">
                            <ListItem className="text-red-500">
                                <TiMediaRecord className="text-red-500 mr-1 w-3" /> 
                                {errorMessage}
                            </ListItem>
                        </List>
                    )}
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='value' label='Value' />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
        </Container>
    )
}