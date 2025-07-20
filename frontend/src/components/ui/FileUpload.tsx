"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  // Use a single file instead of an array.
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // When files are dropped or selected, only take the first one.
  const handleFileChange = (newFiles: File[]) => {
    if (newFiles && newFiles.length > 0) {
      const newFile = newFiles[0];
      setFile(newFile);
      onChange && onChange([newFile]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  // Allow removal of the current file.
  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    onChange && onChange([]);
  };

  return (
    <div className="w-full mb-8" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) =>
            handleFileChange(Array.from(e.target.files || []))
          }
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          {/* When no file has been selected, show the animated prompt */}
          {!file && (
            <>
              <p className="relative z-20 font-sans font-bold text-main-text-light dark:text-main-text-dark text-base">
                آپلود فایل
              </p>
              <p className="relative z-20 font-sans font-normal text-main-text-light dark:text-main-text-dark text-base mt-2">
                فایل خود را اینجا بکشید یا برای بارگذاری کلیک کنید.
              </p>
              <div className="relative w-full mt-10 max-w-xl mx-auto">
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-primary-light/[0.7] dark:bg-primary-dark/[0.7] flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <IconUpload className="h-4 w-4 text-main-text-light dark:text-main-text-dark" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-4 w-4 text-main-text-light dark:text-main-text-dark" />
                  )}
                </motion.div>
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              </div>
            </>
          )}
          {/* When a file is selected, show its preview, details, and the remove button */}
          {file && (
            <motion.div
              layoutId="file-upload"
              className={cn(
                "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                "shadow-sm"
              )}
            >
              <div className="flex justify-between w-full items-center gap-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="text-base text-main-text-light dark:text-main-text-dark truncate max-w-xs"
                >
                  {file.name}
                </motion.p>
                <button
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove file"
                >
                  <IconX size={20} />
                </button>
              </div>
              <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-main-text-light dark:text-main-text-dark">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                  className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                >
                  {file.type}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                >
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </motion.p>
              </div>
              <div className="flex text-sm items-center w-full mt-2 justify-between text-main-text-light dark:text-main-text-dark">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  layout
                >
                  Modified {new Date(file.lastModified).toLocaleDateString()}
                </motion.p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-Base flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-primary-light/[0.7] dark:bg-secondary-dark/[0.7]"
                  : "bg-primary-light/[0.7] dark:bg-secondary-dark/[0.7] shadow-primary-dark dark:shadow-primary-light"
              }`}
            />
          );
        })
      )}
    </div>
  );
}