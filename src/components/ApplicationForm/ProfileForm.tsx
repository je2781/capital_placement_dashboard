import Card from "../ui/Card";
import classes from "./ApplicationForm.module.css";

type ProfileFormProps = {
  profileTitle: string;
  children: React.ReactNode;
};

export default function ProfileForm({
  profileTitle,
  children,
}: ProfileFormProps) {
  return (
    <Card
      className={`${classes["profile"]}`}
      cardStyle={{
        height: `fit-content`
      }}
    >
      <header className={classes.header}>
        <h2>{profileTitle}</h2>
      </header>
      <div className={classes.content}>{children}</div>
    </Card>
  );
}
