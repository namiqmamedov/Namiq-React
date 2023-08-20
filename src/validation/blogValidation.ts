import * as yup from 'yup';

export const validationSchema = yup.object({
    name: yup.string().required('Name field is required'),
    // categoryID: yup.number().required('Category field is required'),
    // tagID: yup.number().required('Tag field is required'),
    // file: yup.mixed().when('pictureUrl', {
    //     is: (value: string) => !value,
    //     then: yup.mixed().required('Please provide an image')
    // })
});
