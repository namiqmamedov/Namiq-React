import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    placeholder: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
}

const SketchyText = (props: Props) => {
    const { fieldState, field } = useController({ ...props, defaultValue: "" });

    const hasError = !!fieldState.error;

    return (
        <div className={`form-group w-100 ${hasError ? "has-danger" : ""}`}>
            <label className="form-label mt-4">{props.label}</label>
            <textarea
                {...props}
                {...field}
                className={`form-control ${hasError ? "is-invalid" : ""}`}
            ></textarea>
            {hasError ? (
                <div className="invalid-feedback">{fieldState.error?.message}</div>
            ) : null}
        </div>
    );
};

export default SketchyText;
