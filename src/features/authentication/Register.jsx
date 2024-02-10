import ButtonText from "../../ui/ButtonText";
import RegisterModal from "./RegisterModal";
function Register({ onCheckLogin, btnLabel }) {
  return (
    <RegisterModal>
      <RegisterModal.Open opens="register-forms">
        <ButtonText variation="standard">{btnLabel}</ButtonText>
      </RegisterModal.Open>
      <RegisterModal.Window onCheckLogin={onCheckLogin} name="register-forms" />
    </RegisterModal>
  );
}
export default Register;
