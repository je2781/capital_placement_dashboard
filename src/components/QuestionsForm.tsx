import Button from "./ui/Button";
import Input from "./ui/Input";
import classes from "./ApplicationForm/ApplicationForm.module.css";

type QuestionsFormProps = {
  validT: boolean | undefined;
  touchedT: boolean  | undefined;
  onDelete: () => void;
  isEditing: boolean | undefined;
  onSave: () => void;
  validQ: boolean | undefined;
  touchedQ: boolean | undefined;
  isParagraph: boolean;
  onBlurQ: () => void;
  onChangeQ: (value: string, files: FileList | null, input: string) => void;
  valueQ: string;
  onBlurT: () => void;
  onChangeT: (value: string, files: FileList | null, input: string) => void;
  valueT: string;
};

export default function QuestionsForm({
  validQ,
  touchedQ,
  onBlurQ,
  onChangeQ,
  valueQ,
  onDelete,
  isEditing,
  onSave,
  validT,
  touchedT,
  isParagraph,
  onBlurT,
  onChangeT,
  valueT,
}: QuestionsFormProps) {

  return (
    <form className={classes["questions-form"]}>
      {!isEditing && <Input
        valid={validT!}
        touched={touchedT!}
        onBlur={onBlurT}
        type="hidden"
        id="type"
        onChange={onChangeT}
        control="dropdown"
        optionDefaultValue={isParagraph ? 'Paragraph': 'Yes/No'}
        notEntries={true}
        label="Type"
        extra={undefined}
        placeholder=""
        hasOptions={false}
        required={true}
        value={valueT}
      />}
      <Input
        valid={validQ!}
        touched={touchedQ!}
        onBlur={onBlurQ}
        type="text"
        notEntries={true}
        id="question"
        control=""
        onChange={onChangeQ}
        label="Question"
        placeholder="Type here"
        extra={undefined}
        optionDefaultValue={undefined}
        hasOptions={false}
        required={true}
        value={valueQ}
      />
      {!isParagraph && <span>
          <input
            type="checkbox"
            id="disqualify"
            name="disqualify"
            value='disqualify'
            className={classes.option}
          />
          <label htmlFor="disqualify">Disqualify candidate if the answer is no</label>
        </span>}
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
          iconColor={undefined}
          hasIcon={false}
          design=""
          onClick={onSave}
          type="button"
          disabled={false}
          link={undefined}
          loading={false}
        >
          {isEditing ? 'Edit' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
