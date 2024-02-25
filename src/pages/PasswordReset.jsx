import styled from "styled-components";
import Headers from "../ui/Headers";
import Row from "../ui/Row";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const PasswordResetSection = styled.section`
  max-width: 128rem;
  height: 88vh;
  margin: 0 auto;
`;
const Container = styled.div`
  margin-top: 3.6rem;
`;
function PasswordReset() {
  return (
    <PasswordResetSection>
      <Container>
        <Row>
          <Headers as="h3">Reset user password</Headers>
          <UpdatePasswordForm />
        </Row>
      </Container>
    </PasswordResetSection>
  );
}
export default PasswordReset;
