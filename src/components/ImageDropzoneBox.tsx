import { useContext } from "react";
import Image from "next/image";
import { Cross1Icon } from "@radix-ui/react-icons";

import { Dropzone } from "./Dropzone";
import { imageContext } from "@/providers";
import { Button } from "./ui/button";

export const ImageDropzoneBox = () => {
  const { file, handleImageChange, handleRemoveImage } =
    useContext(imageContext);

  const onDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    handleImageChange(file);
  };

  const image = file != null ? URL.createObjectURL(file) : null;

  return (
    <div className="max-h-40 flex items-center justify-center gap-2 w-full relative  border border-input bg-transparent px-3 py-4 text-sm shadow-sm ">
      {image ? (
        <>
          <Image
            className="w-full h-full object-cover max-w-[150px] max-h-[150px]"
            src={image}
            alt="preview image"
            width={150}
            height={150}
          />
          <Button
            className="absolute right-4 top-4"
            onClick={handleRemoveImage}
            variant="ghost"
            size="icon"
          >
            <Cross1Icon />
          </Button>
        </>
      ) : (
        <Dropzone
          title="Arrastra y suelta una imagen aquí, o haz clic para seleccionar una imagen"
          accept={{ "image/*": [] }}
          onDrop={onDrop}
        />
      )}
    </div>
  );
};
