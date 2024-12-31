"use client";
import { ChangeEvent, useContext } from "react";

import { codeContext } from "@/providers/code/codeContext";
import { TranslationBox } from "./TranslationBox";
import { TranslationBoxTypes } from "@/lib/constants";

export const CodeTextareaGroup = () => {
  const { completion, codeToTranslate, handleChangeCodeToTranslate } =
    useContext(codeContext);

  const _handleChangeCodeToTranslate = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    handleChangeCodeToTranslate(target.value);
  };

  return (
    <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:gap-14">
      <TranslationBox
        textareaProps={{
          placeholder: "Introduce el código a traducir",
          value: codeToTranslate,
          onChange: _handleChangeCodeToTranslate,
        }}
        type={TranslationBoxTypes.SOURCE}
      />

      <TranslationBox
        textareaProps={{
          readOnly: true,
          placeholder: "Traducción",
          value: completion,
        }}
        type={TranslationBoxTypes.TARGET}
      />
    </div>
  );
};
