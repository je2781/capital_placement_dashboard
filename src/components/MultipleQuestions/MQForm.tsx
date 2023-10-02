import { FormContext } from "../../store/form-context";
import Button from "../ui/Button";
import Input from "../ui/Input";
import classes from "../ApplicationForm/ApplicationForm.module.css";
import ChoiceField from "./ChoiceField";

import { useContext } from "react";

type MQFormProps = {
  validT: boolean;
  touchedT: boolean;
  validC: boolean;
  touchedC: boolean;
  validMC: boolean;
  touchedMC: boolean;
  onDelete: () => void;
  
  isEditing: boolean | undefined;
  onSave: () => void;
  validQ: boolean | undefined;
  touchedQ: boolean | undefined;
  onBlurQ: () => void;
  onChangeQ: (value: string, files: FileList | null, input: string) => void;
  valueQ: string;
  onBlurT: () => void;
  onBlurC: () => void;
  onBlurMC: () => void;
  onChangeT: (value: string, files: FileList | null, input: string) => void;
  onChangeC: (value: string, files: FileList | null, input: string) => void;
  onChangeMC: (value: string, files: FileList | null, input: string) => void;
  valueT: string;
  valueC: string;
  valueMC: string;
  notDropdown: boolean;
};

export default function MQForm({
  validQ,
  touchedQ,
  onBlurQ,
  onChangeQ,
  validC,
  touchedC,
  onBlurC,
  onChangeC,
  validMC,
  touchedMC,
  onBlurMC,
  onChangeMC,
  valueQ,
  valueC,
  valueMC,
  onDelete,
  isEditing,
  onSave,
  validT,
  touchedT,
  onBlurT,
  onChangeT,
  valueT,
  notDropdown,
}: MQFormProps) {
  const ctx = useContext(FormContext);

  const fieldCount = ctx.fieldTitles.length;

  function handleAddingField() {
    if (ctx.fieldTitles.length < ctx.forms.maxNumOfChoices) {
      ctx.addFieldTitle("Choice");
    }
  }

  return (
    <form className={classes["mq-form"]}>
      <Input
        checkboxLabel={undefined}
        switchLabel={undefined}
        valid={validT!}
        touched={touchedT!}
        onBlur={onBlurT}
        optionDefaultValue=""
        type="hidden"
        control="dropdown"
        id="type"
        onChange={onChangeT}
        notEntries={true}
        label="Type"
        extra={undefined}
        placeholder=""
        hasOptions={false}
        required={true}
        value={valueT}
      />
      <Input
        checkboxLabel={undefined}
        switchLabel={undefined}
        valid={validQ!}
        touched={touchedQ!}
        onBlur={onBlurQ}
        type="text"
        notEntries={true}
        id="question"
        control="default"
        onChange={onChangeQ}
        label="Question"
        placeholder="Type here"
        extra={undefined}
        optionDefaultValue={undefined}
        hasOptions={false}
        required={true}
        value={valueQ}
      />
      <div className="mt-3 mb-5">
        {ctx.fieldTitles.map((title, i) => (
          <div className="d-flex justify-content-between align-items-center my-0">
            <ChoiceField
              key={i}
              valid={validC!}
              onChange={onChangeC}
              touched={touchedC!}
              title={title}
              value={valueC!}
              onBlur={onBlurC}
            />
            {i + 1 === fieldCount && (
              <i
                className="fa-solid fa-plus ms-3 pt-4"
                onClick={handleAddingField}
              ></i>
            )}
          </div>
        ))}

        <span>
          <input
            type="checkbox"
            id="enableOption"
            name="enableOption"
            value="enableOption"
            className={classes.option}
          />
          <label
            htmlFor="enableOption"
            style={{
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Enable "Other" option
          </label>
        </span>
      </div>

      {notDropdown && (
        <Input
          checkboxLabel={undefined}
          switchLabel={undefined}
          valid={validMC!}
          touched={touchedMC!}
          onBlur={onBlurMC}
          type="number"
          notEntries={true}
          id="maxNumOfChoices"
          control="default"
          onChange={onChangeMC}
          optionDefaultValue="Multiple choice"
          label="Max choice allowed"
          placeholder="enter number of choice allowed here"
          extra={undefined}
          hasOptions={false}
          required={true}
          value={valueMC!}
        />
      )}
      <div className={classes.actions}>
        <Button
          mode="flat"
          icon="fa-xmark"
          iconColor="#a30000"
          hasIcon={true}
          design="danger"
          onClick={onDelete}
          type="button"
          disabled={false}
          link={undefined}
          loading={false}
        >
          Delete question
        </Button>
        <Button
          mode="raised"
          icon={undefined}
          iconColor="#087b2f"
          hasIcon={false}
          design=""
          onClick={onSave}
          type="button"
          disabled={false}
          link={undefined}
          loading={false}
        >
          {isEditing ? "Edit" : "Save"}
        </Button>
      </div>
    </form>
  );
}
