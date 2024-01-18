import { Box, Paper, Typography, Grid, Button, Container, List, ListItem } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import { useAppDispatch } from "../../../store/configureStore";
import AppTextInput from "../AppTextInput/AppTextInput";
import { useEffect, useState } from "react";
import { Tag } from "../../../models/tag";
import { setTag } from "../../../store/slice/tagSlice";
import { TiMediaRecord } from "react-icons/ti";
import { getAuthorizationHeader } from "../../../util/util";

interface Props {
    tag?: Tag;
    cancelEdit: () => void;
}

export default function TagForm({ tag, cancelEdit }: Props) {
    const { control, reset, handleSubmit,setError, formState: { isDirty, isSubmitting }} = useForm({
          mode: 'all'
    });

    function handleApiErrors(errors: any) {
        console.log(errors);
         if (Array.isArray(errors)) {
            errors.forEach((error: string) => {
                console.log(error);
    
                if (error.includes('Name')) {
                    setError('name', { message: error })
                } 
            });
        }
    }

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tag && !isDirty) reset(tag);
    }, [tag, reset, isDirty])

    async function handleSubmitData(data: FieldValues)
    {
        try {
            let response: Tag;

            const authorizationHeader = getAuthorizationHeader();

            if(tag) {
                response = await agent.Admin.updateTag(data,authorizationHeader);   
            } else {
                response = await agent.Admin.createTag(data,authorizationHeader);
            }
            dispatch(setTag(response));
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

    const editMode = !!tag;  

    return (
        <Container sx={{mt: 4}}>
            <Box component={Paper} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                    {editMode ? 'Edit tag' : 'Create tag'}
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
                        <AppTextInput control={control} name='name' label='Tag name' />
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