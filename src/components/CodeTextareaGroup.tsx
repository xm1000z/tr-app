"use client";

import { useContext } from "react";
import { codeContext } from "@/providers/code/codeContext";
import { TranslationBox } from "@/components/TranslationBox";
import { TranslationBoxTypes } from "@/lib/constants";

const CodeTextareaGroup = () => {
  const { codeToTranslate, handleChangeCodeToTranslate, completion } = useContext(codeContext);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <TranslationBox
        type={TranslationBoxTypes.SOURCE}
        value={codeToTranslate}
        onChange={(e) => handleChangeCodeToTranslate(e.target.value)}
        placeholder="Introduce el código a traducir"
      />
      <TranslationBox
        type={TranslationBoxTypes.TARGET}
        value={completion}
        readOnly
        placeholder="Traducción"
      />
    </div>
  );
};

export default CodeTextareaGroup;
