import { useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  Edit,
  Image as ImageIcon,
  KeyRound,
  Share2,
} from "lucide-react";
import BiodataPreview from "../components/preview/BiodataPreview";

function ProfilePage({ data, onEdit, readOnly = false }) {
  const [copied, setCopied] = useState(false);
  const [editLinkCopied, setEditLinkCopied] = useState(false);
  const [profileNameVisible, setProfileNameVisible] = useState(true);

  const profileNameRef = useRef(null);
  const otherPhotos = data.otherPhotos || [];
  const fullName = data.personalDetails?.fullName || "";

  const shareUrl = window.location.origin + "/";

  useEffect(() => {
    const handleScroll = () => {
      const element = profileNameRef.current;

      if (!element) return;

      const position = element.getBoundingClientRect();

      // Change header when profile name goes behind sticky header
      setProfileNameVisible(position.bottom > 75);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fullName]);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy your biodata link:", shareUrl);
    }
  };

  const copyEditLink = async () => {
    const ownerKey = window.sessionStorage.getItem("ownerEditKey");
    if (!ownerKey) return;

    const editUrl = shareUrl + encodeURIComponent(ownerKey);

    try {
      await navigator.clipboard.writeText(editUrl);
      setEditLinkCopied(true);
      window.setTimeout(() => setEditLinkCopied(false), 2200);
    } catch {
      window.prompt("Copy your private edit link:", editUrl);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-stone-800">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-brand-line bg-[#fffdf9]/95 shadow-[0_4px_24px_rgba(77,53,29,0.06)] backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <h1 className="min-w-0 truncate font-semibold text-brand-dark">
            {!profileNameVisible && fullName
              ? `Marriage Biodata of ${fullName}`
              : "Marriage Biodata"}
          </h1>

          {!readOnly && (
            <div className="profile-actions flex shrink-0 gap-2">
              <button
                type="button"
                onClick={copyShareLink}
                className="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-white hover:bg-brand-dark"
                title="Copy the public biodata link"
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                <span>{copied ? "Link copied" : "Share"}</span>
              </button>

              <button
                type="button"
                onClick={copyEditLink}
                className="flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-sm text-brand-dark hover:bg-brand/5"
                title="Copy your private edit link"
                aria-label="Copy edit link"
              >
                {editLinkCopied ? <Check size={16} /> : <KeyRound size={16} />}
                <span className="hidden sm:inline">
                  {editLinkCopied ? "Edit link copied" : "Copy edit link"}
                </span>
              </button>

              <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-2 rounded-lg border border-brand/30 px-3 py-2 text-sm text-brand-dark hover:bg-brand/5"
              >
                <Edit size={16} />
                <span>Edit</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Introduction */}
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand">
            A PERSONAL INTRODUCTION
          </p>
        </div>

        {/* Public Share Link */}
        {!readOnly && (
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-brand-line bg-[#fffefa] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="font-medium text-brand-dark">
                Your public biodata link
              </p>
              <p className="mt-1 break-all text-sm text-stone-500">
                {shareUrl}
              </p>
            </div>

            <button
              type="button"
              onClick={copyShareLink}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white px-4 py-2.5 text-sm font-medium text-brand-dark"
            >
              {copied ? <Check size={17} /> : <Copy size={17} />}
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        )}

        {/* Biodata Preview */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-8 premium-frame">
          <BiodataPreview data={data} profileNameRef={profileNameRef} />
        </div>

        {/* Kundali Photograph */}
        {data.kundaliPhoto?.url && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 premium-frame">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={19} className="text-brand" />
              <h3 className="text-lg font-semibold text-brand-dark">
                Kundali Photograph
              </h3>
            </div>

            <img
              src={data.kundaliPhoto.url}
              alt="Kundali"
              className="mx-auto max-h-[650px] w-full rounded-xl object-contain"
            />
          </section>
        )}

        {/* Additional Photographs */}
        {otherPhotos.length > 0 && (
          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 premium-frame">
            <div className="mb-4 flex items-center gap-2">
              <ImageIcon size={19} className="text-brand" />
              <h3 className="text-lg font-semibold text-brand-dark">
                Additional Photographs
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {otherPhotos.map((photo, index) => (
                <img
                  key={photo.fileId || photo.url || index}
                  src={photo.url}
                  alt={"Additional photograph " + (index + 1)}
                  loading="lazy"
                  className="aspect-square w-full rounded-xl border border-stone-100 object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {/* Edit Biodata */}
        {!readOnly && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={onEdit}
              className="flex items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white px-6 py-3 text-sm font-semibold text-brand-dark"
            >
              <Edit size={17} />
              Edit your biodata
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
