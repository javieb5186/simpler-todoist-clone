import { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed left-0 top-0 z-30 flex h-full w-full items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50" />
      <div
        className="relative left-0 top-0 z-20 h-full max-h-screen w-full rounded bg-white p-2 sm:h-auto sm:p-4 md:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
