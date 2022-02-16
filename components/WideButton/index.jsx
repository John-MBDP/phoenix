const Widebutton = ({
  children,
  backGroundColor,
  onClick,
  color,
  padding,
  outline,
  outLineColor,
  ammount
}) => {
  return (
    <div>
      <button onClick={() => onClick()}>
        <div className="dollarAccent">{ammount}</div>
        <div className="text">{children}</div>
      </button>

      <style jsx>{`
        .text {
        }
        .dollarAccent {
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
          background-color: ${backGroundColor || "#00589B"};
          border: none;
          color: ${color || "black"};
          width: 100%;
          padding: ${padding || "1.3rem 0"};
          border-radius: 0.3rem;
          ${outline && `border: 2px groove ${outLineColor};`}
          ${outline && `background-color: white;`}
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2)
        }
      `}</style>
    </div>
  );
};

export default Widebutton;
