import {
  Modal,
  Stack,
  Group,
  Text,
  Divider,
  Button,
  SimpleGrid,
  Badge,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import type { ReactNode } from "react";
import type { Order, DetailField } from "../../types/order";
import { ORDER_DETAIL_FIELDS, STATUS_COLORS } from "../../constants/orders";
import { useIsMobile } from "../../hooks/useMediaQuery";

export interface DetailsModalProps<T> {
  opened: boolean;
  onClose: () => void;
  title?: ReactNode;
  record: T | null;
  fields: DetailField<T>[];
  renderHeader?: (record: T) => ReactNode;
  renderFooter?: (record: T) => ReactNode;
}

export function DetailsModal<T extends Record<string, any>>({
  opened,
  onClose,
  title = "Details",
  record,
  fields,
  renderHeader,
  renderFooter,
}: DetailsModalProps<T>) {
  const isMobile = useIsMobile();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      fullScreen={isMobile}
      centered={!isMobile}
      size="lg"
      radius={isMobile ? 0 : "md"}
      overlayProps={{ backgroundOpacity: 0.4, blur: 3 }}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {record && (
        <Stack gap="md">
          {renderHeader && <>{renderHeader(record)}</>}
          <Divider />

          {/* 1 col mobile, 2 cols tablet+ */}
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={isMobile ? "sm" : "md"}
          >
            {fields.map((field) => (
              <Stack key={String(field.accessor)} gap={4}>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                  {field.label}
                </Text>
                <Text size="sm" fw={500} style={{ wordBreak: "break-word" }}>
                  {field.render
                    ? field.render(record[field.accessor], record)
                    : String(record[field.accessor] ?? "-")}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>

          {renderFooter && (
            <>
              <Divider />
              {renderFooter(record)}
            </>
          )}
        </Stack>
      )}
    </Modal>
  );
}

export interface OrderDetailsModalProps {
  order: Order | null;
  opened: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  opened,
  onClose,
}: OrderDetailsModalProps) {
  const isMobile = useIsMobile();

  return (
    <DetailsModal<Order>
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size={isMobile ? "md" : "lg"}>
          جزئیات سفارش
        </Text>
      }
      record={order}
      fields={ORDER_DETAIL_FIELDS}
      renderHeader={(o) => (
        <Group justify="space-between" align="center" wrap="nowrap">
          <Stack gap={2}>
            <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
              شماره سفارش
            </Text>
            <Text size="xl" fw={700}>
              {o.id}
            </Text>
          </Stack>
          <Badge
            color={STATUS_COLORS[o.status] ?? "gray"}
            variant="light"
            size={isMobile ? "md" : "lg"}
          >
            {o.status}
          </Badge>
        </Group>
      )}
      renderFooter={() => (
        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={onClose}
            leftSection={<IconX size={16} />}
            fullWidth={isMobile}
          >
            بستن
          </Button>
        </Group>
      )}
    />
  );
}
