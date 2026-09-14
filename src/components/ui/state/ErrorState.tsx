import { Container, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <Container size="lg" py="xl">
      <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red">
        {message}
      </Alert>
    </Container>
  );
}
