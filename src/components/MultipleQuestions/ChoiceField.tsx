import Input from "../ui/Input";
import { FormContext } from "../../store/form-context";

import { useEffect, useContext, useState } from "react";

type ChoiceFieldProps = {
  valid: boolean;
  touched: boolean;
  onChange: (value: string, files: FileList | null, input: string) => void;
  onBlur: () => void;
  title: string;
  value: string;
};

export default function ChoiceField({
  valid,
  touched,
  onBlur,
  onChange,
  title,
  value,
}: ChoiceFieldProps) {
  return (
    <div className="d-flex flex-grow-1 align-items-center my-0">
      <i className="fa-solid fa-list me-3 pt-4"></i>
      <Input
        checkboxLabel={undefined}
        switchLabel={undefined}
        valid={valid}
        touched={touched!}
        onBlur={onBlur}
        type="text"
        notEntries={true}
        control="default"
        id="choice"
        onChange={onChange}
        optionDefaultValue="Multiple choice"
        label={title}
        placeholder="Type here"
        extra={undefined}
        hasOptions={false}
        required={true}
        value={value}
      />
    </div>
  );
}
