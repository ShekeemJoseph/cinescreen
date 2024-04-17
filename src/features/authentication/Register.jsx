import ButtonText from "../../ui/ButtonText";
import RegisterModal from "./RegisterModal";
function Register({ btnLabel, children }) {
  return (
    <RegisterModal>
      <RegisterModal.Open opens="register-forms">
        {children ? (
          children
        ) : (
          <ButtonText variation={`${btnLabel ? "promoCard" : "standard"}`}>
            {btnLabel ? btnLabel : "Sign up"}
          </ButtonText>
        )}
      </RegisterModal.Open>
      <RegisterModal.Window name="register-forms" />
    </RegisterModal>
  );
}
export default Register;
