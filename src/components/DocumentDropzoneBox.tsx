import { useContext } from "react";
import { Cross1Icon, FileIcon } from "@radix-ui/react-icons";

import { documentContext } from "@/providers";
import { formatBytes } from "@/lib/utils";
import { Dropzone } from "./Dropzone";
import { Button } from "./ui/button";

export const DocumentDropzoneBox = () => {
  const { file, handleChangeFile, handleRemoveFile } =
    useContext(documentContext);

  const onDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    handleChangeFile(file);
  };

  return (
    <div className="max-h-40 flex items-center justify-center gap-2 w-full relative rounded-md border border-input bg-transparent px-3 py-4 text-sm shadow-sm">
      {file ? (
        <div className="flex w-full items-center justify-between p-4 rounded-md bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <FileIcon className="h-8 w-8" />

            <div>
              <p className="text-sm">{file.name}</p>

              <p>{formatBytes(file.size)}</p>
            </div>
          </div>

          <Button onClick={handleRemoveFile} size="icon" variant="ghost">
            <Cross1Icon />
          </Button>
        </div>
      ) : (
        <Dropzone
          title="Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionar un archivo PDF"
          accept={{ "application/pdf": [] }}
          onDrop={onDrop}
        />
      )}
    </div>
  );
};
