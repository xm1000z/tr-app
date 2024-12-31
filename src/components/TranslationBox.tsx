import { FC, TextareaHTMLAttributes, useContext } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { TranslationSourceActions } from "./TranslationSourceActions";
import { TranslationTargetActions } from "./TranslationTargetActions";
import { Textarea } from "./ui/textarea";
import { TranslationBoxTypes } from "@/lib/constants";
import { Button } from "./ui/button";
import { textContext } from "@/providers";
import { codeContext } from "@/providers/code/codeContext";

interface TranslationBoxProps {
  type: TranslationBoxTypes;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const TranslationBox: FC<TranslationBoxProps> = ({
  type,
  textareaProps,
}) => {
  const { handleChangeTextToTranslate } = useContext(textContext);
  const { handleSetCodeToTranslate } = useContext(codeContext);

  const value = textareaProps?.value?.toString().trim() ?? "";

  const handleCleanTextToTranslate = () => {
    handleChangeTextToTranslate("");
    handleSetCodeToTranslate("");
  };

  return (
    <div className="flex flex-col gap-2 w-full border border-input bg-transparent px-3 py-2 text-sm shadow-sm">
      <div className="flex gap-2 flex-1 relative">
        <Textarea className="min-h-full" {...textareaProps} />

        {TranslationBoxTypes.SOURCE === type && value !== "" && (
          <Button
            onClick={handleCleanTextToTranslate}
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
          >
            <Cross1Icon />
          </Button>
        )}
      </div>

      {TranslationBoxTypes.SOURCE === type && (
        <TranslationSourceActions value={value} />
      )}

      {TranslationBoxTypes.TARGET === type && value !== "" && (
        <TranslationTargetActions value={value} />
      )}
    </div>
  );
};
