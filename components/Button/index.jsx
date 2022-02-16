const StyledButton = ({
  children,
  color,
  onClick,
  justifyContent,
  icon,
  padding,
  ...restprops
}) => {
  return (
    <div className="container">
      <button {...restprops} className="button" onClick={() => onClick()}>
        <div className="innerContainer">
          <div className="icon">{icon}</div>
          <div className="message">{children}</div>
        </div>
      </button>

      <style jsx>{`
        .innerContainer {
          display: flex;
          justify-content: space-between;
        }
        .message {
          margin-left: 0.3rem;
          display: flex;
          align-items: center;
        }
        .button {
          background-color: ${color ? color : "#ff0056"};
          color: white;
          border: none;
          margin-bottom: 2rem;
          padding: ${padding || "1rem 1.5rem"};
          border-radius: 0.3rem;
          text-transform: uppercase;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 5px 1rem rgba(0, 0, 0, 0.5);
        }
        .icon {
        }
        .container {
          display: flex;
          position: relative;
          justify-content: ${justifyContent ? justifyContent : "flex-end"};
        }
      `}</style>
    </div>
  );
};

export default StyledButton;
