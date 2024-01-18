import ButtonText from "../../ui/ButtonText";
import RegisterModal from "./RegisterModal";

function Register({ btnLabel }) {
  return (
    <RegisterModal>
      <RegisterModal.Open opens="register-forms">
        <ButtonText variation="standard">{btnLabel}</ButtonText>
      </RegisterModal.Open>
      <RegisterModal.Window name="register-forms">Modal</RegisterModal.Window>
    </RegisterModal>
  );
}
// function Register() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div>
//       <ButtonText
//         variation="standard"
//         onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
//       >
//         Register
//       </ButtonText>
//       {isModalOpen && <RegisterModal onClose={() => setIsModalOpen(false)} />}
//     </div>
//   );
// }

export default Register;
