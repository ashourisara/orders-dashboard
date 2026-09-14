import { useMediaQuery as useMantineMQ } from "@mantine/hooks";

export const BREAKPOINTS = {
  xs: "(max-width: 36em)", // 576px
  sm: "(max-width: 48em)", // 768px
  md: "(max-width: 62em)", // 992px
  lg: "(max-width: 75em)", // 1200px
} as const;

export function useIsMobile() {
  return useMantineMQ(BREAKPOINTS.sm, false, { getInitialValueInEffect: true });
}

export function useIsTablet() {
  return useMantineMQ(BREAKPOINTS.md, false, { getInitialValueInEffect: true });
}

export function useIsDesktop() {
  const isTablet = useIsTablet();
  return !isTablet;
}
