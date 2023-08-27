import { Box, Paper, Typography, Grid, Button, Container } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../api/agent";
import { useAppDispatch } from "../../../store/configureStore";
import AppTextInput from "../AppTextInput/AppTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { validationSchema } from "../../../validation/categoryValidation";
import { setComment } from "../../../store/slice/commentSlice";
import { Comment } from "../../../models/comment";

interface Props {
    comment?: Comment;
    cancelEdit: () => void;
}

export default function TagForm({ comment, cancelEdit }: Props) {
    const { control, reset, handleSubmit, formState: { isDirty, isSubmitting }} = useForm({
          resolver: yupResolver(validationSchema)
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (comment && !isDirty) reset(comment);
    }, [comment, reset, isDirty])

    async function handleSubmitData(data: FieldValues)
    {
        try {
            let response: Comment;

            response = await agent.Admin.createComment(data);
            dispatch(setComment(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Comment detail
                </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Name' />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <AppTextInput multiline={true} rows={4} control={control} name='name' label='Name' />
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