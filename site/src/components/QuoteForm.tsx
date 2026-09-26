"use client";

import { useEffect, useRef, useState } from "react";
import { oswald, barlow } from "@/lib/fonts";

type Theme = "onLight" | "onDark";

type Photo = {
  id: string;
  file: File;
  url: string;
};

type Props = {
  theme?: Theme;
  accent?: string;
  buttonLabel?: string;
};

const MAX_PHOTOS = 8;

export default function QuoteForm({
  theme = "onLight",
  accent = "#E0A028",
  buttonLabel = "Get my free estimate",
}: Props) {
  const dark = theme === "onDark";

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      Math.max(0, MAX_PHOTOS - photos.length)
    );
    const next: Photo[] = files.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((p) => [...p, ...next]);
    e.target.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((p) => {
      const target = p.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return p.filter((photo) => photo.id !== id);
    });
  };

  const submit = async () => {
    const okName = firstName.trim().length > 0;
    const okEmail = /.+@.+\..+/.test(email.trim());
    if (!okName || !okEmail) {
      setShowError(true);
      return;
    }
    setShowError(false);
    setSubmitError("");
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName.trim());
      formData.append("email", email.trim());
      formData.append("description", description.trim());
      photos.forEach((p) => formData.append("photos", p.file, p.file.name));

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong sending your request. Please try again, or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setFirstName("");
    setEmail("");
    setDescription("");
    setPhotos([]);
    setSubmitted(false);
    setShowError(false);
    setSubmitError("");
  };

  const headingColor = dark ? "#F5ECD6" : "#0c1d39";
  const labelColor = dark ? "#A9C6E2" : "#0c1d39";
  const mutedColor = dark ? "rgba(169,198,226,.85)" : "rgba(12,29,57,.62)";
  const fieldBg = dark ? "rgba(255,255,255,.06)" : "#ffffff";
  const fieldBorder = dark
    ? "1px solid rgba(169,198,226,.28)"
    : "1px solid rgba(12,29,57,.18)";
  const fieldColor = dark ? "#F5ECD6" : "#0c1d39";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "10px",
    border: fieldBorder,
    background: fieldBg,
    color: fieldColor,
    font: `500 15px/1.2 ${barlow}`,
    outline: "none",
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: "vertical",
    minHeight: "78px",
    font: `500 15px/1.45 ${barlow}`,
  };

  const dropStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    border: dark
      ? "1.5px dashed rgba(169,198,226,.4)"
      : "1.5px dashed rgba(12,29,57,.28)",
    background: dark ? "rgba(255,255,255,.03)" : "rgba(12,29,57,.03)",
  };

  const [buttonHover, setButtonHover] = useState(false);
  const buttonStyle: React.CSSProperties = {
    marginTop: "4px",
    width: "100%",
    padding: "16px 20px",
    borderRadius: "11px",
    border: "none",
    cursor: submitting ? "default" : "pointer",
    opacity: submitting ? 0.75 : 1,
    background: `linear-gradient(135deg, ${accent}, #F4C869)`,
    color: "#0c1d39",
    font: `700 17px/1 ${oswald}`,
    letterSpacing: ".04em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: buttonHover
      ? "0 16px 36px rgba(224,160,40,.5)"
      : `0 12px 28px ${dark ? "rgba(224,160,40,.4)" : "rgba(224,160,40,.32)"}`,
    transform: buttonHover ? "translateY(-2px)" : "none",
    transition: "transform .15s ease, box-shadow .15s ease",
  };

  const name = firstName.trim();
  const nameSuffix = name ? `, ${name}` : "";

  if (submitted) {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "22px 8px 12px",
          }}
        >
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "999px",
              background: "linear-gradient(135deg,#E0A028,#F4C869)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 30px rgba(224,160,40,.4)",
            }}
          >
            <span style={{ font: `700 46px/1 ${oswald}`, color: "#0c1d39" }}>
              ✓
            </span>
          </div>
          <div
            style={{
              marginTop: "22px",
              font: `700 32px/1.02 ${oswald}`,
              textTransform: "uppercase",
              letterSpacing: ".01em",
              color: headingColor,
            }}
          >
            Your request is in.
          </div>
          <div
            style={{
              marginTop: "12px",
              maxWidth: "380px",
              font: `500 17px/1.5 ${barlow}`,
              color: mutedColor,
            }}
          >
            Thanks{nameSuffix} — we&rsquo;ve got your project details. Expect
            a straight estimate back soon. No obligation, no sales
            runaround.
          </div>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "24px",
              font: `600 14px/1 ${barlow}`,
              letterSpacing: ".02em",
              color: mutedColor,
              background: "none",
              border: "none",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              cursor: "pointer",
            }}
          >
            Submit another project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <label
            style={{
              flex: "1 1 160px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span
              style={{
                font: `600 12px/1 ${oswald}`,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: labelColor,
              }}
            >
              First name
            </span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setShowError(false);
              }}
              style={inputStyle}
            />
          </label>
          <label
            style={{
              flex: "1 1 160px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span
              style={{
                font: `600 12px/1 ${oswald}`,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: labelColor,
              }}
            >
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setShowError(false);
              }}
              style={inputStyle}
            />
          </label>
        </div>

        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              font: `600 12px/1 ${oswald}`,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: labelColor,
            }}
          >
            Tell us about the project
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={textareaStyle}
          />
        </label>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{
              font: `600 12px/1 ${oswald}`,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: labelColor,
            }}
          >
            Add photos{" "}
            <span
              style={{
                color: mutedColor,
                textTransform: "none",
                letterSpacing: 0,
                fontWeight: 500,
              }}
            >
              — the more we see, the tighter the estimate
            </span>
          </span>
          <label style={dropStyle}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFiles}
              style={{ display: "none" }}
            />
            <span style={{ font: `700 24px/1 ${oswald}`, color: "#E0A028" }}>
              ＋
            </span>
            <span style={{ font: `600 14px/1.3 ${barlow}`, color: mutedColor }}>
              Click to upload photos
            </span>
          </label>
          {photos.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "2px" }}>
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 3px 10px rgba(0,0,0,.25)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt="upload preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      width: "18px",
                      height: "18px",
                      borderRadius: "999px",
                      border: "none",
                      background: "rgba(6,18,42,.82)",
                      color: "#fff",
                      font: `700 11px/1 ${barlow}`,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {showError && (
          <div style={{ font: `500 13px/1.3 ${barlow}`, color: "#e8623a" }}>
            Please add your first name and a valid email so we can send your
            estimate.
          </div>
        )}

        {submitError && (
          <div style={{ font: `500 13px/1.3 ${barlow}`, color: "#e8623a" }}>
            {submitError}
          </div>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={submitting}
          style={buttonStyle}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
        >
          {submitting ? "Sending…" : buttonLabel}{" "}
          <span style={{ fontSize: "1.15em" }}>→</span>
        </button>
        <div
          style={{
            textAlign: "center",
            font: `500 12.5px/1.4 ${barlow}`,
            color: mutedColor,
          }}
        >
          One quote. One time. No hidden fees — no obligation.
        </div>
      </div>
    </div>
  );
}
