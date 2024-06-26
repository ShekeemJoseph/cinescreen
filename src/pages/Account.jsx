import styled from "styled-components";
import Headers from "../ui/Headers";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import { getCurrentUser } from "../services/apiAuth";
import { useLoaderData } from "react-router-dom";

const AccountSection = styled.section`
  max-width: 128rem;
  margin: 3.6rem auto;
  padding: 0 2.4rem;
`;

function Account() {
  const user = useLoaderData();
  return (
    <AccountSection>
      <Headers as="h1">Update your account</Headers>
      <Row>
        <Headers as="h3">Update user data</Headers>
        <UpdateUserDataForm user={user} />
      </Row>
      <Row>
        <Headers as="h3">Update user password</Headers>
        <UpdatePasswordForm />
      </Row>
    </AccountSection>
  );
}
export async function loader() {
  const user = await getCurrentUser();
  return user;
}
export default Account;
