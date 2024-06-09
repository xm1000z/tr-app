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

export const TextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const textToTranslate = searchParams.get(SearchParams.TEXT) ?? "";

  const [textToTranslateState, setTextToTranslateState] =
    useState(textToTranslate);

  const { fromLanguage, toLanguage } = useContext(languageContext);

  const { completion, complete, setCompletion } = useCompletion({
    api: "/api/translate",
    body: {
      fromLanguage,
      toLanguage,
    },
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

  const handleChangeTextToTranslate = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;

    if (value.trim().length > MAX_TEXT_TO_TRANSLATE_LENGTH) return;

    setTextToTranslate(value);

    if (value.trim().length < MIN_TEXT_TO_TRANSLATE_LENGTH)
      return setCompletion("");

    handleDebouncedTextChange(value);
  };

  useEffect(() => {
    if (textToTranslateState.trim().length < MIN_TEXT_TO_TRANSLATE_LENGTH)
      return;

    complete(textToTranslateState, { body: { fromLanguage, toLanguage } });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, fromLanguage, toLanguage]);

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
