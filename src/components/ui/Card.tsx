import classes from "./Card.module.css";

type CardProps = {
  children: React.ReactNode;
  className: string;
  cardStyle: React.CSSProperties | undefined
};

export default function Card({ children, className, cardStyle}: CardProps) {
  return <div className={`${classes.card} ${className}`} style={cardStyle}>{children}</div>;
}
