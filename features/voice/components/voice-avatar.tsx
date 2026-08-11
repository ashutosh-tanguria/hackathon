"use client";

interface VoiceAvatarProps {
  status:
    | "idle"
    | "connecting"
    | "listening"
    | "thinking"
    | "speaking"
    | "error";
}


export function VoiceAvatar({
  status,
}: VoiceAvatarProps) {

  const video =
    status === "listening"
      ? "listening"
      : status === "speaking"
      ? "speaking"
      : "idle";


  return (
    <div className="flex justify-center">
      <video
        key={video}
        src={`/avatar/${video}.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="
          h-64
          w-64
          rounded-full
          object-cover
          border
        "
      />
    </div>
  );
}