import Card from "../ui/Card";
import classes from "./ApplicationForm.module.css";

type PerInfoFormProps = {
  perInfoTitle: string;
  children: React.ReactNode;
};

export default function PeronalInfoForm({
  perInfoTitle,
  children,
}: PerInfoFormProps) {
  return (
    <Card
      className={`${classes["personal-info"]}`}
      cardStyle={{
        height: `fit-content`
      }}
    >
      <header className={classes.header}>
        <h2>{perInfoTitle}</h2>
      </header>
      <div className={classes.content}>{children}</div>
    </Card>
  );
}
