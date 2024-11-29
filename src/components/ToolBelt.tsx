"use client";

import { useContext } from "react";
import { TextIcon, ImageIcon, FileIcon } from "@radix-ui/react-icons";

import { toolBeltContext } from "@/providers";
import { Button } from "@/components/ui/button";
import { ToolBeltType } from "@/lib/constants";

export const ToolBelt = () => {
  const { toolBeltType, handleChangeToolBeltType } =
    useContext(toolBeltContext);

  return (
    <nav className="mb-4">
      <ul className="flex items-center gap-2">
        <li>
          <Button
            onClick={handleChangeToolBeltType(ToolBeltType.TEXT)}
            className={`inline-flex items-center rounded-none justify-center whitespace-nowrap text-sm transition-colors py-2 px-3 
              ${toolBeltType === ToolBeltType.TEXT ? 
                'dark:bg-[#2C2C2C] bg-gray-100 text-primary' : 
                'dark:bg-[#1D1D1D] bg-white text-gray-600'}
              disabled:pointer-events-none disabled:opacity-50 
              data-[state=active]:dark:bg-[#2C2C2C] data-[state=active]:bg-gray-100 
              data-[state=inactive]:dark:bg-[#1D1D1D] data-[state=inactive]:bg-white 
              data-[state=inactive]:text-gray-600`}
          >
            <TextIcon className="h-4 w-4 mr-2" />
            Texto
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChangeToolBeltType(ToolBeltType.IMAGE)}
            className={`inline-flex items-center rounded-none justify-center whitespace-nowrap text-sm transition-colors py-2 px-3 
              ${toolBeltType === ToolBeltType.IMAGE ? 
                'dark:bg-[#2C2C2C] bg-gray-100 text-primary' : 
                'dark:bg-[#1D1D1D] bg-white text-gray-600'}
              disabled:pointer-events-none disabled:opacity-50 
              data-[state=active]:dark:bg-[#2C2C2C] data-[state=active]:bg-gray-100 
              data-[state=inactive]:dark:bg-[#1D1D1D] data-[state=inactive]:bg-white 
              data-[state=inactive]:text-gray-600`}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Imágenes
          </Button>
        </li>
        <li>
          <Button
            onClick={handleChangeToolBeltType(ToolBeltType.DOCUMENT)}
            className={`inline-flex items-center rounded-none justify-center whitespace-nowrap text-sm transition-colors py-2 px-3 
              ${toolBeltType === ToolBeltType.DOCUMENT ? 
                'dark:bg-[#2C2C2C] bg-gray-100 text-primary' : 
                'dark:bg-[#1D1D1D] bg-white text-gray-600'}
              disabled:pointer-events-none disabled:opacity-50 
              data-[state=active]:dark:bg-[#2C2C2C] data-[state=active]:bg-gray-100 
              data-[state=inactive]:dark:bg-[#1D1D1D] data-[state=inactive]:bg-white 
              data-[state=inactive]:text-gray-600`}
          >
            <FileIcon className="h-4 w-4 mr-2" />
            Documentos
          </Button>
        </li>
      </ul>
    </nav>
  );
};
