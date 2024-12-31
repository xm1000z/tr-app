"use client";

import { useContext } from "react";
import { codeContext } from "@/providers/code/codeContext";
import { TranslationBox } from "@/components/TranslationBox";

const CodeTextareaGroup = () => {
  const { codeToTranslate, handleChangeCodeToTranslate, completion } = useContext(codeContext);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <TranslationBox
        type="source"
        value={codeToTranslate}
        onChange={(e) => handleChangeCodeToTranslate(e.target.value)}
        placeholder="Introduce el código a traducir"
      />
      <TranslationBox
        type="target"
        value={completion}
        readOnly
        placeholder="Traducción"
      />
    </div>
  );
};

export default CodeTextareaGroup;
