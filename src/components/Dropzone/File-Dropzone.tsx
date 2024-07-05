"use client";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdClose } from "react-icons/io";

const thumbsContainer: any = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  //   position:"relative"
  //   marginTop: 16,
};

const thumb: any = {
  display: "inline-flex",
  borderRadius: 2,
  //   border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "auto",
  maxHeight: 80,
  //   padding: 4,
  objectFit: "contain",
  boxSizing: "border-box",
};

const thumbInner: any = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export function SingleDropZone({
  file,
  setFile,
}: {
  file: File | null;
  setFile: any;
}) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs: any = files.map((file: any) => (
    <div style={thumb} key={file.name}>
      <div className="relative" style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          className="pt-2 mt-3"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        <IoMdClose
          className="text-lg p-1 absolute top-0 right-0 mt-1 dark:bg-neutral-700  rounded-full cursor-pointer"
          onClick={() => {
            setFiles([]);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, []);


  useEffect(()=>{
    setFile(files[0] || null)
  },[files])
  return (
    <>
      <section className="container bg-slate-200 dark:bg-neutral-800/90 h-32 mt-4 flex justify-center flex-col items-center">
        <div {...getRootProps({ className: "dropzone w-full h-full flex flex-col items-center justify-center" })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </section>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
}
