import { createContext } from "react";

interface CodeContextProps {
  completion: string;
  codeToTranslate: string;
  handleChangeCodeToTranslate: (value: string) => void;
  handleSetCodeToTranslate: (value: string) => void;
}

export const codeContext = createContext<CodeContextProps>({
  completion: "",
  codeToTranslate: "",
  handleChangeCodeToTranslate: () => {},
  handleSetCodeToTranslate: () => {},
});
