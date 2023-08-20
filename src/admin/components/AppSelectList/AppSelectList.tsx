import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface AppSelectListProps {
    label: string;
    value: number[];
    options: { id: number; name: string }[];
    onChange: (value: number[]) => void;
    multiple?: boolean;
}

export default function AppSelectList(props: AppSelectListProps) {
    return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple={props.multiple} 
                value={props.value}
                label={props.label}
                onChange={(event) => {
                    const selectedValues = event.target.value as number[];
                    props.onChange(selectedValues);
                }}
            >
                {props.options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
