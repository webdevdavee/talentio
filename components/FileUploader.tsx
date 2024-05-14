"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl, formatFileSize } from "@/lib/utils";
import Image from "next/image";
import { useUploadThing } from "@/lib/utils/uploadthing";

type FileUploaderProps = {
  files: File[];
  type?: string;
  onFieldChange: (url: string) => void;
  fileUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export default function FileUploader({
  files,
  type,
  fileUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "pdf" ? generateClientDropzoneAccept(["pdf"]) : undefined,
  });

  const fileLimitInBytes = 4 * 1024 * 1024;

  return (
    <div
      {...getRootProps()}
      className="w-full flex flex-col items-center justify-center h-60 cursor-pointer overflow-hidden rounded-xl bg-gray-50 border-[2px] border-dashed"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <div className="w-full flex flex-col gap-3 items-center justify-center">
          {files[0].size > fileLimitInBytes ? (
            <p className="text-red-500">File size exceeds limit.</p>
          ) : (
            <div className="flex flex-col gap-3 items-center justify-center">
              <Image
                src="/images/pdf-icon.webp"
                width={40}
                height={40}
                quality={100}
                alt="pdf-icon"
              />
              <p className="font-medium">{files[0].name}</p>
              <p className="font-medium">{formatFileSize(files[0].size)}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 justify-center py-5 text-grey-500">
          <img src="/upload.svg" width={50} height={50} alt="file upload" />
          <p>Only PDFs allowed.</p>
          <button type="button" className="bg-primary text-white py-2 px-3">
            Select from device
          </button>
          <p>Max file size: 4MB</p>
        </div>
      )}
    </div>
  );
}
