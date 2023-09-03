const Button = ({
  type,
  text,
  icon,
  className,
  disabled,
  handleClick,
  customColor,
}) => {
  return (
    <button
      style={customColor && { borderColor: customColor }}
      disabled={disabled}
      className={className}
      type={type && type}
      onClick={handleClick && (() => handleClick())}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
