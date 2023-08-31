import { Box, Paper, Typography, Grid, Button, Container } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import { useAppDispatch } from "../../../store/configureStore";
import AppTextInput from "../AppTextInput/AppTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Category } from "../../../models/category";
import { useEffect } from "react";
import { setCategory } from "../../../store/slice/categorySlice";
import { validationSchema } from "../../../validation/categoryValidation";

interface Props {
    category?: Category;
    cancelEdit: () => void;
}

export default function CategoryForm({ category, cancelEdit }: Props) {
    const { control, reset, handleSubmit, formState: { isDirty, isSubmitting }} = useForm({
          resolver: yupResolver(validationSchema)
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (category && !isDirty) reset(category);
    }, [category, reset, isDirty])


    async function handleSubmitData(data: FieldValues)
    {
        try {
            let response: Category;
            if(category) {
                response = await agent.Admin.updateCategory(data);   
            } else {
                response = await agent.Admin.createCategory(data);
            }
            dispatch(setCategory(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    const editMode = !!category;  

    return (
        <Container sx={{mt: 4}}>
            <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                {editMode ? 'Edit category' : 'Create category'}
                </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Category name' />
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