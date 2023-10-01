import { Link } from 'react-router-dom';

import classes from './Button.module.css';

type ButtonProps = {
    children: React.ReactNode;
    link: string | undefined;
    mode: string;
    iconColor: string | undefined;
    design: string;
    icon: string| undefined;
    loading: boolean;
    hasIcon: boolean;
    type: "button" | "submit" | "reset";
    disabled: boolean;
    onClick: () => void
}

const button = ({children, link, mode, design, loading, type, disabled, onClick, hasIcon, iconColor, icon}: ButtonProps) =>
  !link ? (
    <button
      className={[
        classes.button,
        classes[`button--${design}`],
        classes[`button--${mode}`],
        hasIcon && 'd-flex', 
        hasIcon && 'justify-content-between'
      ].join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
        {hasIcon && <i style={{color: iconColor}} className={`fa-solid me-3 ${icon}`}></i>}
      {loading ? 'Loading...' : children}
    </button>
  ) : (
    <Link
      className={[
        classes.button,
        classes[`button--${design}`],
        classes[`button--${mode}`],
      ].join(' ')}
      to={link}
    >
      {children}
    </Link>
  );

export default button;
