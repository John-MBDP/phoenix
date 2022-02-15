const StyledButton = ({ children, color, onClick, ...restprops }) => {
  return (
    <div className="container">
      <button
        {...restprops}
        variant="contained"
        size="large"
        className="button"
        onClick={() => onClick()}
      >
        {children}
      </button>
      <style jsx>{`
        .button {
          background-color: ${color ? color : "#ff0056"};
          color: white;
          border: none;
          margin-bottom: 2rem;
          padding: 1rem 1.5rem;
          border-radius: 0.3rem;
          text-transform: uppercase;
          font-weight: 800;
        }

        .container {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default StyledButton;
