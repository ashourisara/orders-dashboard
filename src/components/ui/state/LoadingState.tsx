import { MantineProvider, Container, Loader } from "@mantine/core";

export function LoadingState() {
  return (
    <MantineProvider>
      <Container size="lg" py="xl">
        <Loader />
      </Container>
    </MantineProvider>
  );
}
