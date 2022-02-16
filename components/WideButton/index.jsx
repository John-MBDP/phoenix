const Widebutton = ({
  children,
  backgroundColor,
  onClick,
  color,
  padding,
  outline,
  outLineColor,
  ammount,
  textAlign
}) => {
  return (
    <div className="container">
      <button onClick={() => onClick()}>
        <div className="dollarAccent">{ammount}</div>
        <div className="text">{children}</div>
      </button>

      <style jsx>{`
        .text {
          text-align: ${textAlign ? textAlign : "center"};
          ${textAlign && "margin-left: 0.8rem"}
        }
        .dollarAccent {
          ${ammount && "display:none;"}
          position: absolute;
          font-size: 20px;
          font-weight: bold;
          color: white;
          top: 0;
          bottom: 0;
          width: 4.5rem;

          display: grid;
          align-content: center;
          border-radius: 0 3rem 3rem 0;
          background-color: ${outLineColor};
        }
        button {
          position: relative;
          background-color: ${backgroundColor || "#00589B"};
          border: none;
          color: ${color || "black"};
          width: 100%;
          padding: ${padding || "1.3rem 0"};
          border-radius: 0.3rem;
          ${outline && `border: 2px groove ${outLineColor};`}
          ${outline && `background-color: white;`}
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2)
        }
        .container {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Widebutton;
