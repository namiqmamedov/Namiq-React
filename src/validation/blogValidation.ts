import * as yup from 'yup';

export const validationSchema = yup.object({
    // name: yup.string().required('Name field is required'),
    //  description: yup.string().required('Description is required'),
    // categoryID: yup.string().required('Category field is required'),
    // tagID: yup
    // .array().required('Tag field is required')
    // .min(1, 'At least one tag must be selected'), 
    // file: yup.mixed().when('pictureUrl', {
    //     is: (value: string) => !value,
    //     then: yup.mixed().required('Please provide an image')
    // })
});
