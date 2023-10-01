import classes from "./ApplicationForm/ApplicationForm.module.css";

type SavedQuestionProps = {
    type: string;
    question: string;
    onOpen: () => void;
};

export default function SavedQuestion({type, question, onOpen}: SavedQuestionProps) {
  return (
    <div style={{marginTop: '3rem'}}>
      <div className={classes.title}>{type}</div>
      <div className="d-flex justify-content-between align-items-center">
        <p className={classes.question}>{question}</p>
        <div onClick={onOpen}>
          <i className="fa-solid fa-pencil"></i>
        </div>
      </div>
      <hr/>
    </div>
  );
}
