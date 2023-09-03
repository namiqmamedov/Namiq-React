import { Box, Paper, Typography, Grid, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import { Blog } from "../../../models/blog";
import { useAppDispatch } from "../../../store/configureStore";
import AppDropzone from "../AppDropzone/AppDropzone";
import AppTextInput from "../AppTextInput/AppTextInput";
import { validationSchema } from "../../../validation/blogValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { setBlog } from "../../../store/slice/blogSlice";
import AppSelectList from "../AppSelectList/AppSelectList";
import useBlogs from "../../../hooks/useBlogs";
import AppEditor from "../AppEditor/AppEditor";

interface Props {
    blog?: Blog;
    cancelEdit: () => void;
    categoryName: string;
    tagName: string;
    selectedCategoryID: number[];
    selectedTagIDs: number[];
}

export default function BlogForm({ blog, cancelEdit }: Props) {
    const editMode = !!blog;  

    const { control, reset, handleSubmit, watch, setValue, formState: { isDirty, isSubmitting }} = useForm({
        resolver: editMode ? undefined : yupResolver(validationSchema)
    });
    const {category, tags} = useBlogs();
    const categoryNamesAndIDs: { id: string, name: string }[] = Object.values(category).map((cat: any) => ({
        id: cat.categoryID,
        name: cat.categoryName
    }));
    const tagNamesAndIDs: { id: string, name: string }[] = Object.values(tags).map((tag: any) => ({
        id: tag.tagID,
        name: tag.tagName
    }));

    const watchFile = watch('file', null);
    const dispatch = useAppDispatch();

    const handleCategoryChange = (selectedCategoryID: number[]) => {
        setSelectedCategory(selectedCategoryID);
        setValue('categoryID', selectedCategoryID);
    };
    
    const handleTagChange = (newSelectedTagIDs: number[]) => {
        setSelectedTags(newSelectedTagIDs);
        setValue('tagID', newSelectedTagIDs);
    };

    const categoryOptions = categoryNamesAndIDs.map(item => ({
        id: parseInt(item.id),
        name: item.name
    }));

    const tagOptions = tagNamesAndIDs.map(item => ({
        id: parseInt(item.id),
        name: item.name
    }));

    const selectedCategoryID: number[] = blog ? [blog.categoryID] : [];

    const selectedTagIDs: number[] = blog?.blogTags.map(tag => tag.tagID)!!;

    const [selectedCategory, setSelectedCategory] = useState<number[]>(selectedCategoryID);

    const [selectedTags, setSelectedTags] = useState<number[]>(selectedTagIDs || []);


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
                response = await agent.Admin.updateBlog(data);   
            } else {
                response = await agent.Admin.createBlog(data);
            }
            dispatch(setBlog(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container sx={{mt: 4,mb: 4}}>
            <Box className="box-main" component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                {editMode ? 'Edit blog' : 'Create blog'}
                </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Blog name' />
                    </Grid>
                 <Grid item xs={12} sm={6}>
                        <AppSelectList
                            label='Category'
                            value={selectedCategory}
                            options={categoryOptions}
                            onChange={handleCategoryChange}
                            multiple={false}
                            control={control}
                            name="categoryID"
                            />
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <AppSelectList
                            label='Tag'
                            value={selectedTags}
                            options={tagOptions}
                            onChange={handleTagChange}
                            multiple={true}
                            control={control}
                            name="tagID"
                        />
                    </Grid> 
                    <Grid item xs={12}>
                        <Box className="dropzone-box" display='flex' justifyContent='space-between' alignItems='center'>
                            <AppDropzone control={control} name='file' />
                            {watchFile ? (
                                <img src={watchFile.preview} alt="preview" style={{ maxHeight: 200 }} />
                            ) : (
                                <img src={blog?.pictureUrl} alt={blog?.name} style={{ maxHeight: 200 }} />
                            )}
                        </Box>
                    </Grid>
                    <AppEditor control={control} name='description' /> 
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