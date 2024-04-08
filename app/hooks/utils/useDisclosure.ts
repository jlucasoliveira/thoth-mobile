import { useCallback, useState } from "react";

type DisclosureProps = {
  isOpen?: boolean;
};

export type DisclosureReturn = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
};

export function useDisclosure(props?: DisclosureProps): DisclosureReturn {
  const [isOpenState, setIsOpen] = useState(props?.isOpen ?? false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onToggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return {
    isOpen: isOpenState,
    onClose,
    onOpen,
    onToggle,
  };
}
