import classes from './Switch.module.css';

type SwitchProps = {
    id: string;
    value: string;
    className?: string;
};

export default function Switch({className, id, value}: SwitchProps){
    return (
    <label className={`${classes.switch}`}>
    <input type="checkbox" id={id} value={value} name={value}/>
    <span className={`${classes.slider} ${classes.round}`}></span>
  </label>
  );
}