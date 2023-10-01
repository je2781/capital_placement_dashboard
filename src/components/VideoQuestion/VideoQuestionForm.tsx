import Button from "../ui/Button";
import Input from "../ui/Input";
import classes from "../ApplicationForm/ApplicationForm.module.css";

type VideoQFormProps = {
  validT: boolean | undefined;
  touchedT: boolean | undefined;
  validAI: boolean | undefined;
  touchedAI: boolean | undefined;
  validD: boolean | undefined;
  touchedD: boolean | undefined;
  validDT: boolean | undefined;
  touchedDT: boolean | undefined;
  onDelete: () => void;
  isEditing: boolean | undefined;
  onSave: () => void;
  validQ: boolean | undefined;
  touchedQ: boolean | undefined;
  onBlurQ: () => void;
  onChangeQ: (value: string, files: FileList | null, input: string) => void;
  valueQ: string;
  onBlurT: () => void;
  onBlurD: () => void;
  onBlurAI: () => void;
  onChangeT: (value: string, files: FileList | null, input: string) => void;
  onBlurDT: () => void;
  onChangeDT: (value: string, files: FileList | null, input: string) => void;
  onChangeD: (value: string, files: FileList | null, input: string) => void;
  onChangeAI: (value: string, files: FileList | null, input: string) => void;
  valueT: string;
  valueD: string;
  valueAI: string;
  valueDT: string;
};

export default function VideoQForm({
  validQ,
  touchedQ,
  onBlurQ,
  onChangeQ,
  validAI,
  touchedAI,
  onBlurAI,
  onChangeAI,
  validD,
  touchedD,
  validDT,
  touchedDT,
  onBlurD,
  onChangeD,
  valueQ,
  valueAI,
  valueD,
  onDelete,
  isEditing,
  onSave,
  validT,
  valueDT,
  touchedT,
  onBlurT,
  onChangeT,
  onBlurDT,
  onChangeDT,
  valueT,
}: VideoQFormProps) {
  return (
    <form className={classes["videoq-form"]}>
      <Input
        valid={validT!}
        touched={touchedT!}
        onBlur={onBlurT}
        optionDefaultValue=""
        control="dropdown"
        type="hidden"
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
        valid={validQ!}
        touched={touchedQ!}
        onBlur={onBlurQ}
        type="text"
        notEntries={true}
        id="question"
        onChange={onChangeQ}
        control=""
        label="Question"
        placeholder="Type here"
        extra={undefined}
        optionDefaultValue={undefined}
        hasOptions={false}
        required={true}
        value={valueQ}
      />
      <Input
        valid={validAI!}
        touched={touchedAI!}
        onBlur={onBlurAI}
        type="text"
        notEntries={true}
        id="addInfo"
        control="textarea"
        onChange={onChangeAI}
        optionDefaultValue={undefined}
        label={undefined}
        placeholder="additional information"
        extra={undefined}
        hasOptions={false}
        required={true}
        value={valueAI}
      />
      <div className="d-flex justify-content-between align-items-center">
        <div className="me-1 flex-grow-1">
          <Input
            valid={validD!}
            touched={touchedD!}
            onBlur={onBlurD}
            type="number"
            notEntries={true}
            control=""
            id="duration"
            onChange={onChangeD}
            optionDefaultValue={undefined}
            label={undefined}
            placeholder="Max duration of video in (sec/min)"
            extra={undefined}
            hasOptions={false}
            required={true}
            value={valueD}
          />
        </div>
        <div className="ms-1 flex-grow-1">
          <Input
            valid={validDT!}
            touched={touchedDT!}
            onBlur={onBlurDT}
            optionDefaultValue='Select "seconds" or "minutes"'
            control="dropdown"
            type="hidden"
            id="time"
            onChange={onChangeDT}
            notEntries={true}
            label={undefined}
            extra={undefined}
            placeholder=""
            hasOptions={false}
            required={true}
            value={valueDT}
          />
        </div>
      </div>

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
