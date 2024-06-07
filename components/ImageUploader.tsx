"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

type ImageUploaderProps = {
  type: string;
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function ImageUploader({
  type,
  imageUrl,
  onFieldChange,
  setFiles,
}: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center h-36 cursor-pointer overflow-hidden rounded-xl bg-gray-50 w-full"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full p-4 object-center"
          />
        </div>
      ) : type === "big" ? (
        <div className="flex flex-col items-center justify-center py-5 text-grey-500">
          <img src="/upload.svg" width={25} height={25} alt="file upload" />
          <h3 className="text-sm my-1">Drag photo here</h3>
          <p className="text-sm mb-2">SVG, PNG, JPG</p>
          <button
            type="button"
            className="bg-primary text-sm text-white py-1 px-2"
          >
            Select from device
          </button>
        </div>
      ) : (
        <div className="relative bg-gray-200 w-[4.5rem] h-[4.5rem] border-solid border-[1px] border-[#272829] flex items-center justify-center cursor-pointer">
          <Image
            className="flex items-center justify-center"
            src="/plus-circle.svg"
            width={25}
            height={25}
            alt="add-img"
          />
        </div>
      )}
    </div>
  );
}
