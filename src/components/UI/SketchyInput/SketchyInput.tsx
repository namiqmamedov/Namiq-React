import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    placeholder: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
}

const SketchyInput = (props: Props) => {
    const { fieldState, field } = useController({ ...props, defaultValue: "" });

    const hasError = !!fieldState.error;

    return (
        <div className={`form-group w-50 block ${hasError ? "has-danger" : ""}`}>
            <label className="form-label mt-4">{props.label}</label>
            <input
                {...props}
                {...field}
                className={`form-control ${hasError ? "is-invalid" : ""}`}
                type={props.type}
            />
            {hasError ? (
                <div className="invalid-feedback">{fieldState.error?.message}</div>
            ) : null}
        </div>
    );
};

export default SketchyInput;
