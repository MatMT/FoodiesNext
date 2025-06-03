"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <CldUploadWidget
      uploadPreset="unsigned_preset"
      options={{ maxFiles: 1 }}
      onSuccess={(result, { widget }) => {
        // @ts-ignore
        const secureUrl = result?.info?.secure_url;
        if (secureUrl) {
          setImageUrl(secureUrl);
          widget.close(); // Mueve aquí el close
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800 font-bold block mt-1 ml-1">
              Product Image
            </label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              {imageUrl ? (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl}
                    alt="Product Image"
                  />
                </div>
              ) : (
                <>
                  <TbPhotoPlus size={50} />
                  <p className="text-lg font-semibold">Add Image</p>
                </>
              )}
            </div>
          </div>

          <input type="hidden" name="image" value={imageUrl} />
        </>
      )}
    </CldUploadWidget>
  );
}
