import React from "react";

import classes from "./Input.module.css";
import Switch from "./Switch";

type InputProps = {
  valid: boolean;
  touched: boolean;
  type: string;
  id: string;
  control: string;
  notEntries: boolean;
  required: boolean;
  switchLabel: string | undefined;
  internalChecked?: boolean;
  mandatoryChecked?: boolean;
  hideChecked?: boolean;
  value: string;
  label: string | undefined;
  optionDefaultValue: string | undefined;
  extra: string | undefined;
  checkboxLabel: string | undefined;
  hasOptions: boolean;
  placeholder: string | undefined;
  onChange: (value: string, files: FileList | null, input: string) => void;
  onBlur: () => void;
};

const Input = ({
  valid,
  value,
  touched,
  type,
  id,
  required,
  switchLabel,
  control,
  extra,
  hasOptions,
  internalChecked,
  mandatoryChecked,
  hideChecked,
  optionDefaultValue,
  checkboxLabel,
  placeholder,
  notEntries,
  onBlur,
  onChange,
  label,
}: InputProps) => {
  const [hide, setHide] = React.useState<boolean>(hideChecked!);
  const [internal, setInternal] = React.useState<boolean>(internalChecked!);
  const [mandatory, setMandatory] = React.useState<boolean>(mandatoryChecked!);

  return (
    <div className={classes.input}>
      {label && hasOptions ? (
        <div className={classes["label-header"]}>
          <label htmlFor={id}>
            {label}
            {extra && (
              <span
                style={{
                  fontFamily: "Poppins",
                  fontSize: 15,
                  fontWeight: 400,
                }}
              >
                {extra}
              </span>
            )}
          </label>
          <div className={classes.options}>
            <span>
              {mandatoryChecked ? (
                <input
                  type="checkbox"
                  id={checkboxLabel}
                  name={checkboxLabel}
                  value={checkboxLabel}
                  checked={!mandatory}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setMandatory(true);
                    } else {
                      setMandatory(false);
                    }
                  }}
                  className={classes.option}
                />
              ) : (
                <input
                  type="checkbox"
                  id={checkboxLabel}
                  name={checkboxLabel}
                  value={checkboxLabel}
                  checked={internal}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setInternal(true);
                    } else {
                      setInternal(false);
                    }
                  }}
                  className={classes.option}
                />
              )}
              <label htmlFor={checkboxLabel}>{checkboxLabel}</label>
            </span>
            <span>
              <Switch
                className={classes.option}
                id={`hide`}
                value="hide"
                onHide={setHide}
                hide={hide}
                switchLabel={switchLabel!}
              />
            </span>
          </div>
        </div>
      ) : (
        <label htmlFor={id}>{label}</label>
      )}
      {type === "hidden" && control === "dropdown" && id !== "time" ? (
        <div className={classes["select-wrapper"]}>
          <select
            name="dropdown"
            className={classes.dropdown}
            onChange={(e) => onChange(e.target.value, null, id)}
            onBlur={onBlur}
            value={value}
          >
            <option selected hidden>
              {optionDefaultValue}
            </option>
            <option value="Paragraph">Paragraph</option>
            <option value="Short answer">Short answer</option>
            <option value="Yes/No">Yes/No</option>
            <option value="Dropdown">Dropdown</option>
            <option value="Multiple choice">Multiple choice</option>
            <option value="Date">Date</option>
            <option value="Number">Number</option>
            <option value="File upload">File upload</option>
            <option value="Video question">Video question</option>
          </select>
        </div>
      ) : type === "hidden" && control === "dropdown" && id === "time" ? (
        <div className={classes["select-wrapper"]}>
          <select
            name="dropdown"
            className={classes.dropdown}
            onChange={(e) => onChange(e.target.value, null, id)}
            onBlur={onBlur}
            value={value}
          >
            <option selected hidden>{`Select "seconds" or "minutes"`}</option>
            <option value="Seconds">Seconds</option>
            <option value="Minutes">Minutes</option>
          </select>
        </div>
      ) : control === "textarea" ? (
        <textarea
          style={{
            border: "1px solid #bdc3ce",
            borderRadius: "6px",
            padding: ".75rem",
          }}
          className={[
            !valid ? classes.invalid : "valid",
            touched ? classes.touched : "untouched",
          ].join(" ")}
          id={id}
          rows={3}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value, null, id)}
          onBlur={onBlur}
        />
      ) : (
        control === "default" && (
          <input
            style={
              notEntries
                ? {
                    border: "1px solid #bdc3ce",
                    borderRadius: "6px",
                    padding: ".75rem",
                  }
                : undefined
            }
            className={[
              !valid ? classes.invalid : "valid",
              touched ? classes.touched : "untouched",
            ].join(" ")}
            type={type}
            id={id}
            required={required}
            step={type === "number" ? 1 : undefined}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value, e.target.files, id)}
            onBlur={onBlur}
          />
        )
      )}
    </div>
  );
};

export default Input;
