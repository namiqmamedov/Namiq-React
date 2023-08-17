import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import { Blog } from "../../../models/blog";
import useBlogs from "../../../hooks/useBlogs";
import { useAppDispatch } from "../../../store/configureStore";
import AppSelectList from "../AppSelectList/AppSelectList";
import AppDropzone from "../AppDropzone/AppDropzone";
import AppTextInput from "../AppTextInput/AppTextInput";

interface Props {
    blog?: Blog;
    cancelEdit: () => void;
}

export default function BlogForm({ blog, cancelEdit }: Props) {
    const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting }} = useForm({
        // resolver: yupResolver(validationSchema)
    });
    const { brands, types } = useBlogs();
    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (blog && !watchFile && !isDirty) reset(blog);
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [blog, reset, watchFile, isDirty])

    async function handleSubmitData(data: FieldValues)
    {
        try {
            let response: Blog;
            if(blog) {
                response = await agent.Admin.updateProduct(data);   
            } else {
                response = await agent.Admin.createProduct(data);
            }
            dispatch(setProduct(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
                </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product name' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={brands} name='brand' label='Brand' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList control={control} items={types} name='type' label='Type' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='number' control={control} name='price' label='Price' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput type='number' control={control} name='quantityInStock' label='Quantity in Stock' />
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput control={control} multiline={true} rows={4} name='description' label='Description' />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
                            ) : (
                                <img src={product?.pictureURL} alt={product?.name} style={{ maxHeight: 200 }} />
                            )}
                        </Box>

                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}