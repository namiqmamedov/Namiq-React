import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import agent from "../../../api/agent";
import { Comment } from "../../../models/comment";
import { useAppDispatch } from "../../../store/configureStore";
import { setComment } from "../../../store/slice/commentSlice";
import SketchyInput from "../SketchyInput/SketchyInput";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import SketchyText from "../SketchyText/SketchyText";
import axios from "axios";

interface Props {
    comment?: Comment;
    selectedCommentId: number | null;
}

const PostComment = ({ comment,selectedCommentId }: Props) => {
    const { control, reset, handleSubmit,setError, formState: { isDirty, isSubmitting } } = useForm({
       mode: 'all'
    });
    
    function handleApiErrors(errors: any) {
        console.log(errors);
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Name')) {
                    setError('name', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Text')) {
                    setError('text', { message: error })
                }
            });
        }
    }

    const {id} = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (comment && !isDirty) reset(comment);
    }, [comment, reset, isDirty])

    async function handleSubmitData(data: FieldValues) {
        try {
            debugger;
            const antiForgeryResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/comment/antiForgery`);
            console.log(antiForgeryResponse);
            
            const antiForgeryToken = antiForgeryResponse.data['requestToken'];
      
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                'X-CSRF-TOKEN': antiForgeryToken,
            };

            let response: Comment;


            if(!comment) {
                const commentWithBlogId = { ...data, blogID: Number(id),parentCommentID: Number(selectedCommentId)};
                
                response = await agent.Admin.createComment({
                    comment: commentWithBlogId,
                    headers: headers
                });

                if(response) {
                    dispatch(setComment(response));
                    toast.success('Your comment has been submitted and will be published after approval.');
                    reset();
                 }
                 else {
                  throw new Error("Comment posting failed");
                 }
            }
            

        } catch (error) {
            console.log(error);
            handleApiErrors(error);
        }
    }


    return (
        <Box component="form" onSubmit={handleSubmit(handleSubmitData)}>
            <div className="form-center flex flex-wrap gap-1 w-full">
                <SketchyText control={control} name="text" multiline={true} rows={4} type="text" label="Comment *" placeholder={""}/>
                <div className="comment-main flex gap-5 w-full">
                <SketchyInput control={control} name="name" label="Name *" placeholder="Enter name" />
                
                <SketchyInput control={control} name="email" type="email" label="Email address *" placeholder="Enter email" />
                </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">Post comment</button>
        </Box>
    )
}

export default PostComment;
