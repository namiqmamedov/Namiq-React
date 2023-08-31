import { Box, Paper, Typography, Grid, Button, Container } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import { useAppDispatch } from "../../../store/configureStore";
import AppTextInput from "../AppTextInput/AppTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { validationSchema } from "../../../validation/categoryValidation";
import { Tag } from "../../../models/tag";
import { setTag } from "../../../store/slice/tagSlice";

interface Props {
    tag?: Tag;
    cancelEdit: () => void;
}

export default function TagForm({ tag, cancelEdit }: Props) {
    const { control, reset, handleSubmit, formState: { isDirty, isSubmitting }} = useForm({
          resolver: yupResolver(validationSchema)
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tag && !isDirty) reset(tag);
    }, [tag, reset, isDirty])

    async function handleSubmitData(data: FieldValues)
    {
        try {
            let response: Tag;
            if(tag) {
                response = await agent.Admin.updateTag(data);   
            } else {
                response = await agent.Admin.createTag(data);
            }
            dispatch(setTag(response));
            cancelEdit();
        } catch (error) {
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