import RegistrationForm from "./components/RegistrationForm";
import { Container, Heading } from "@chakra-ui/react";

function App() {
  return (
    <Container
      width='100%'
      height='100$
    '
    >
      <Heading as='h1' size='xl' textAlign='center' mb='100px' p='20px'>
        Registration form
      </Heading>
      <RegistrationForm />
    </Container>
  );
}

export default App;
