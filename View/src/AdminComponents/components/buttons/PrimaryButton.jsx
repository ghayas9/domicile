const PrimaryButton = ({
  text,
  onClick,
  children,
  color,
  icon,
  disabled = false,
  radius,
  lrPadding = 2,
  tbPadding = 1,
}) => {
  return (
    <div className="button__container">
      <div className="primary__button">
        <button
          onClick={onClick}
          disabled={disabled}
          style={{
            backgroundColor: `${color}`,
            borderRadius: `${radius}px`,
            padding: `${tbPadding}rem  ${lrPadding}rem`,
          }}
        >
          <>
            {text}
            {icon}
          </>
        </button>
      </div>
    </div>
  );
};

export default PrimaryButton;
