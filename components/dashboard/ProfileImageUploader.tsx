"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

type ProfileImageUploaderProps = {
  type: string;
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function ProfileImageUploader({
  type,
  imageUrl,
  onFieldChange,
  setFiles,
}: ProfileImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <section className="flex items-center gap-4">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center w-20 h-20 rounded-full cursor-pointer overflow-hidden bg-gray-50"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {imageUrl && (
          <div className="flex h-full w-full flex-1 justify-center">
            <img
              src={imageUrl}
              alt="image"
              width={250}
              height={250}
              className="w-full rounded-full object-center"
            />
          </div>
        )}
      </div>
      <div
        {...getRootProps()}
        className="h-fit flex items-center justify-center gap-3 border border-gray-200 p-2 text-grey-500 cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <Image src="/upload.svg" width={20} height={20} alt="file upload" />
        <p>Upload image</p>
      </div>
    </section>
  );
}
