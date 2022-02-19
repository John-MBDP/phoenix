import PaymentButton from "../components/PaymentButton";

const Uwu = () => {
  return (
    <div>
      <br />
      <br />

      <br />
      <br />
      <br />
      <br />

      <PaymentButton
        lawyerId={1}
        header="One time service fee uwu"
        amount="550"
        paymentType="subscription"
      />
      <PaymentButton
        lawyerId={1}
        header="One time service fee uwu"
        amount="50"
        paymentType="payment"
      />
      <PaymentButton
        lawyerId={1}
        header="One time service fee uwu"
        amount="1000"
        paymentType="subscription"
      />
    </div>
  );
};

export default Uwu;
