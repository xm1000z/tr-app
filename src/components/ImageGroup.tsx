import { useContext } from "react";

import { TranslationBoxTypes } from "@/lib/constants";
import { imageContext } from "@/providers";
import { TranslationBox } from "./TranslationBox";
import { ImageDropzoneBox } from "./ImageDropzoneBox";

export const ImageGroup = () => {
  const { completion } = useContext(imageContext);

  return (
    <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:gap-14">
      <ImageDropzoneBox />

      <TranslationBox
        textareaProps={{
          readOnly: true,
          placeholder: "Texto traducido aquí.",
          value: completion,
        }}
        type={TranslationBoxTypes.TARGET}
      />
    </div>
  );
};
