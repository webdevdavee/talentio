import { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: (value: React.SetStateAction<boolean>) => void
) => {
  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
        onClickOutside(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [ref, onClickOutside]);
};

export default useClickOutside;
