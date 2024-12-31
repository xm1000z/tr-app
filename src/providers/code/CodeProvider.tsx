"use client";

import { PropsWithChildren, FC, useEffect, useContext, useState } from "react";
import { useCompletion } from "ai/react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { codeContext } from "./codeContext";
import {
  DEBOUNCE_TIME,
  MAX_CODE_TO_TRANSLATE_LENGTH,
  MIN_CODE_TO_TRANSLATE_LENGTH,
  SearchParams,
} from "@/lib/constants";
import { languageContext } from "../language";
import { errorContext } from "../error";
import { setupContext } from "../setup";

export const CodeProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const codeToTranslate = searchParams.get(SearchParams.CODE) ?? "";

  const [codeToTranslateState, setCodeToTranslateState] =
    useState(codeToTranslate);

  const { handleShowMessageError } = useContext(errorContext);

  const { fromLanguage, toLanguage } = useContext(languageContext);

  const { completion, complete, setCompletion, error } = useCompletion({
    api: "/api/translateCode",
  });

  const handleDebouncedCodeChange = useDebouncedCallback((value: string) => {
    complete(value, { body: { fromLanguage, toLanguage } });
  }, DEBOUNCE_TIME);

  const setCodeToTranslate = (value: string) => {
    setCodeToTranslateState(value);

    const newSearchParams = new URLSearchParams(searchParams);

    if (value.trim().length) {
      newSearchParams.set(SearchParams.CODE, value);
    } else {
      newSearchParams.delete(SearchParams.CODE);
    }

    const queryString = newSearchParams.toString();
    router.replace(`${pathname}?${queryString}`);
  };

  const handleSetCodeToTranslate = (value: string) => {
    setCodeToTranslateState(value);
  };

  const handleChangeCodeToTranslate = (codeToTranslate: string) => {
    if (codeToTranslate.trim().length > MAX_CODE_TO_TRANSLATE_LENGTH) return;

    setCodeToTranslate(codeToTranslate);

    if (codeToTranslate.trim().length < MIN_CODE_TO_TRANSLATE_LENGTH)
      return setCompletion("");

    handleDebouncedCodeChange(codeToTranslate);
  };

  useEffect(() => {
    if (codeToTranslateState.trim().length < MIN_CODE_TO_TRANSLATE_LENGTH)
      return;

    complete(codeToTranslateState, {
      body: { fromLanguage, toLanguage },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, fromLanguage, toLanguage]);

  useEffect(() => {
    if (!error) return;

    handleShowMessageError(error.message);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <codeContext.Provider
      value={{
        completion,
        codeToTranslate: codeToTranslateState,
        handleChangeCodeToTranslate,
        handleSetCodeToTranslate,
      }}
    >
      {children}
    </codeContext.Provider>
  );
};
