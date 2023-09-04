import { FormControl, InputLabel, Select, MenuItem, FormHelperText, } from "@mui/material";
import { UseControllerProps } from "react-hook-form";
import { useController } from 'react-hook-form';

    interface AppSelectListProps extends UseControllerProps {
        label: string;
        value: number[];
        options: { id: number; name: string }[];
        onChange: (value: number[]) => void;
        multiple?: boolean;
    }
    

    export default function AppSelectList(props: AppSelectListProps) {
        // const {fieldState} = useController({...props,defaultValue: ''})

        const { field, fieldState } = useController(props); // props parametresini kullanarak useController'ı çağırın

        const { onChange } = props;

        return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple={props.multiple} 
                value={props.value}
                label={props.label}
                onChange={(event) => {
                    const selectedValues = event.target.value as number[];
                    field.onChange(selectedValues); // Form kontrolüne değeri bildir
                    onChange(selectedValues); // Değişikliği ana bileşene aktar
                  }}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            {fieldState.error && <FormHelperText sx={{color: '#d32f2f'}}>{fieldState.error.message}</FormHelperText>}
        </FormControl>
    );
}
