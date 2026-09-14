import { TextInput, CloseButton } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  width?: number | string;
  disabled?: boolean;
}

export function SearchBar({
  value = "",
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  width = 280,
  disabled = false,
}: SearchBarProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    if (local === value) return;
    const t = setTimeout(() => onChange(local), debounceMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [local, debounceMs]);

  const handleClear = () => {
    setLocal("");
    onChange("");
  };

  return (
    <TextInput
      placeholder={placeholder}
      leftSection={<IconSearch size={16} />}
      rightSection={
        local ? (
          <CloseButton
            size="sm"
            onClick={handleClear}
            aria-label="Clear search"
          />
        ) : null
      }
      value={local}
      onChange={(e) => setLocal(e.currentTarget.value)}
      w={width}
      disabled={disabled}
    />
  );
}
