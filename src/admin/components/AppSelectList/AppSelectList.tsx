import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface AppSelectListProps {
    label: string;
    value: number[]; // Etiket ID'lerini içeren dizi
    options: { id: number; name: string }[]; // Etiket seçeneklerini içeren dizi
    onChange: (value: number[]) => void; // Değişiklik olduğunda çağrılacak işlev
}

export default function AppSelectList(props: AppSelectListProps) {
    return (
        <FormControl fullWidth>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple
                value={props.value}
                label={props.label}
                onChange={(event) => {
                    const selectedValues = event.target.value as number[];
                    console.log("Selected Values:", selectedValues); // Konsola seçili değerleri yazdır
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
