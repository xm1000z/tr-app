"use client";

import { PropsWithChildren, FC, useEffect, useContext, useState } from "react";
import { useCompletion } from "ai/react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { textContext } from "./textContext";
import {
  DEBOUNCE_TIME,
  MAX_TEXT_TO_TRANSLATE_LENGTH,
  MIN_TEXT_TO_TRANSLATE_LENGTH,
  SearchParams,
} from "@/lib/constants";
import { languageContext } from "../language";
import { errorContext } from "../error";
import { setupContext } from "../setup";

export const TextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const textToTranslate = searchParams.get(SearchParams.TEXT) ?? "";

  const [textToTranslateState, setTextToTranslateState] =
    useState(textToTranslate);

  const { handleShowMessageError } = useContext(errorContext);

  const { fromLanguage, toLanguage } = useContext(languageContext);


  const { completion, complete, setCompletion, error } = useCompletion({
    api: "/api/translate",
  });

  const handleDebouncedTextChange = useDebouncedCallback((value: string) => {
    complete(value, { body: { fromLanguage, toLanguage } });
  }, DEBOUNCE_TIME);

  const setTextToTranslate = (value: string) => {
    setTextToTranslateState(value);

    const newSearchParams = new URLSearchParams(searchParams);

    if (value.trim().length) {
      newSearchParams.set(SearchParams.TEXT, value);
    } else {
      newSearchParams.delete(SearchParams.TEXT);
    }

    const queryString = newSearchParams.toString();
    router.replace(`${pathname}?${queryString}`);
  };

  const handleSetTextToTranslate = (value: string) => {
    setTextToTranslateState(value);
  };

  const handleChangeTextToTranslate = (textToTranslate: string) => {
    if (textToTranslate.trim().length > MAX_TEXT_TO_TRANSLATE_LENGTH) return;

    setTextToTranslate(textToTranslate);

    if (textToTranslate.trim().length < MIN_TEXT_TO_TRANSLATE_LENGTH)
      return setCompletion("");

    handleDebouncedTextChange(textToTranslate);
  };

  useEffect(() => {
    if (textToTranslateState.trim().length < MIN_TEXT_TO_TRANSLATE_LENGTH)
      return;

    complete(textToTranslateState, {
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
    <textContext.Provider
      value={{
        completion,
        textToTranslate: textToTranslateState,
        handleChangeTextToTranslate,
        handleSetTextToTranslate,
      }}
    >
      {children}
    </textContext.Provider>
  );
};
