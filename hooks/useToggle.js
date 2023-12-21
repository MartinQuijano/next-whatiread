import { useState } from "react";

export const useToggle = () => {
  const [status, setStatus] = useState(false);

  const toggleStatus = () => setStatus(!status);

  return { status, toggleStatus };
};
