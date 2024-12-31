import { useContext } from "react";
import {
  LanguagePicker,
  ToolBelt,
  TextareaGroup,
  ImageGroup,
  DocumentGroup,
} from "@/components";
import { ToolBeltType } from "@/lib/constants";
import { toolBeltContext } from "@/providers";
import { textContext } from "@/providers/text/textContext";
import { codeContext } from "@/providers/code/codeContext";

export const Translate = () => {
  const { toolBeltType } = useContext(toolBeltContext);
  const { textToTranslate, handleChangeTextToTranslate } = useContext(textContext);
  const { codeToTranslate, handleChangeCodeToTranslate } = useContext(codeContext);

  return (
    <main className="container px-3 mb-6 max-w-[1000px]">
      <ToolBelt />

      <LanguagePicker />

      {toolBeltType === ToolBeltType.TEXT && <TextareaGroup />}

      {toolBeltType === ToolBeltType.IMAGE && <ImageGroup />}

      {toolBeltType === ToolBeltType.DOCUMENT && <DocumentGroup />}

      <section>
        <h2>Traducir Texto</h2>
        <textarea
          value={textToTranslate}
          onChange={(e) => handleChangeTextToTranslate(e.target.value)}
        />
      </section>
      <section>
        <h2>Traducir Código</h2>
        <textarea
          value={codeToTranslate}
          onChange={(e) => handleChangeCodeToTranslate(e.target.value)}
        />
      </section>
    </main>
  );
};

export default Translate;
