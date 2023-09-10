import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useRef } from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { UseControllerProps,useController } from 'react-hook-form';

interface Props extends UseControllerProps {
    name: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
}

const AppEditor = (props: Props) => {
    const {fieldState, field} = useController({...props,defaultValue: ''})

    const editorRef = useRef<TinyMCEEditor | null>(null);
    
    const handleEditorChange = (content: string) => {
      field.onChange(content);
  };

  return (
    <FormControl className='form-editor'>
    <Editor
      apiKey={import.meta.env.VITE_REACT_APP_TINYCME_KEY}
      onInit={(_evt, editor) => editorRef.current = editor}
      initialValue={field.value.text}
      onEditorChange={handleEditorChange}
      init={{
        height: 500, 
        //menubar: false,
        plugins:
        "advcode advlist codesample advtable anchor autocorrect autolink autosave casechange charmap checklist codesample directionality editimage emoticons export footnotes formatpainter help image insertdatetime link linkchecker lists media mediaembed mergetags nonbreaking pagebreak permanentpen powerpaste searchreplace table tableofcontents tinymcespellchecker typography visualblocks visualchars wordcount",
      toolbar:
        "undo redo spellcheckdialog  | codesample blocks fontfamily fontsizeinput | bold italic underline forecolor backcolor | link image | emoticons | align lineheight checklist bullist numlist | indent outdent | removeformat typography",
        codesample_global_prismjs: true,
        codesample_languages: [
          { text: 'HTML/XML', value: 'markup' },
          { text: 'JavaScript', value: 'javascript' },
          { text: 'CSS', value: 'css' },
          { text: 'PHP', value: 'php' },
          { text: 'Ruby', value: 'ruby' },
          { text: 'Python', value: 'python' },
          { text: 'Java', value: 'java' },
          { text: 'C', value: 'c' },
          { text: 'C#', value: 'csharp' },
          { text: 'C++', value: 'cpp' }
        ],
        content_style: `
        @import url('https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-okaidia.min.css');`,
      font_size_formats:
        "8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
    
      autosave_restore_when_empty: true,
      spellchecker_active: true,
      }} 
      />
  {fieldState.error && <FormHelperText sx={{color: '#d32f2f'}}>{fieldState.error.message}</FormHelperText>}
  </FormControl>
  )
}

export default AppEditor