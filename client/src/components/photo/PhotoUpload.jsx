import { useState } from "react";
import { Camera, Plus, Trash2, Upload, LoaderCircle } from "lucide-react";
import SectionHeader from "../common/SectionHeader";
import { uploadImage } from "../../services/uploadService";

function PhotoUpload({ data, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadFiles = async (files, type) => {
    if (!files.length) return;

    setError("");
    setUploading(true);

    try {
      const images = [];

      for (const file of files) {
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
          throw new Error("Only JPG, PNG and WEBP images are allowed.");
        }

        if (file.size > 20 * 1024 * 1024) {
          throw new Error("Each image must be smaller than 20 MB.");
        }

        const uploaded = await uploadImage(file);
        images.push(uploaded);
      }

      if (type === "otherPhotos") {
        onChange(type, [...data.otherPhotos, ...images]);
      } else {
        onChange(type, images[0]);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Image upload failed.",
      );
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (type, index) => {
    if (type === "otherPhotos") {
      onChange(
        type,
        data.otherPhotos.filter((_, i) => i !== index),
      );
    } else {
      onChange(type, { url: "", fileId: "" });
    }
  };

  const uploadCard = (type, title, description) => {
    const photo = data[type];

    return (
      <div className="rounded-xl border border-stone-200 p-4">
        <h4 className="font-medium text-stone-800">{title}</h4>
        <p className="mb-4 mt-1 text-xs text-stone-500">{description}</p>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-dashed border-stone-300 bg-cream">
            {photo?.url ? (
              <img
                src={photo.url}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <Camera size={28} className="text-stone-300" />
            )}
          </div>

          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-brand/30 px-4 py-2.5 text-sm text-brand-dark hover:bg-brand/5">
              <Upload size={16} />
              {photo?.url ? "Replace Photo" : "Upload Photo"}

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  uploadFiles(Array.from(e.target.files || []), type);
                  e.target.value = "";
                }}
              />
            </label>

            {photo?.url && (
              <button
                type="button"
                onClick={() => removePhoto(type)}
                className="text-xs text-red-500"
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SectionHeader
        title="Photographs"
        description="Upload your profile photograph, Kundali and additional photos."
      />

      <div className="space-y-5">
        {uploadCard(
          "profilePhoto",
          "Profile Photograph",
          "Your main photograph for the marriage biodata.",
        )}

        {uploadCard(
          "kundaliPhoto",
          "Kundali Photograph",
          "Upload your Kundali image.",
        )}

        <div className="rounded-xl border border-stone-200 p-4">
          <h4 className="font-medium text-stone-800">Additional Photographs</h4>

          <p className="mb-4 mt-1 text-xs text-stone-500">
            Upload additional photographs.
          </p>

          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-brand/50 p-5 text-sm text-brand hover:bg-brand/5">
            <Plus size={18} />
            Add More Photos
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                uploadFiles(Array.from(e.target.files || []), "otherPhotos");
                e.target.value = "";
              }}
            />
          </label>

          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {data.otherPhotos.map((photo, index) => (
              <div
                key={photo.fileId || index}
                className="relative aspect-square"
              >
                <img
                  src={photo.url}
                  alt={`Additional photo ${index + 1}`}
                  className="h-full w-full rounded-xl object-cover"
                />

                <button
                  type="button"
                  onClick={() => removePhoto("otherPhotos", index)}
                  className="absolute right-1 top-1 rounded-full bg-white p-1.5 text-red-500 shadow"
                  aria-label="Remove photo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {uploading && (
          <p className="flex items-center gap-2 text-sm text-brand">
            <LoaderCircle size={16} className="animate-spin" />
            Uploading photos...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </>
  );
}

export default PhotoUpload;
