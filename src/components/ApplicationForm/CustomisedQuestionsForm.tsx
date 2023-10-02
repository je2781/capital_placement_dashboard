import AdditionalQuestionForm from "../../models/addQuestionForm";
import SavedQuestion from "../SavedQuestion";
import Card from "../ui/Card";
import classes from "./ApplicationForm.module.css";

type CustomisedQuestionsFormProps = {
  custQuestionTitle: string;
  onOpen: () => void;
  customisedQArray: any[]
};

export default function CustomisedQuestionsForm({
  custQuestionTitle,
  onOpen,
  customisedQArray
}: CustomisedQuestionsFormProps) {
  return (
      <Card
        className={`${classes["custom-questions"]}`}
        cardStyle={{
          height: `fit-content`,
        }}
      >
        <header className={classes.header}>
          <h2>{custQuestionTitle}</h2>
        </header>
        <div className={classes.content}>
          {customisedQArray.map((item) =><SavedQuestion type={item.form.custType!} question={item.form.custQuestion!} onOpen={onOpen} />)}
        </div>
      </Card>
  );
}
