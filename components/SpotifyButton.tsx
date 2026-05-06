type SpotifyButtonProps = {
  href?: string;
  children?: React.ReactNode;
};

export function SpotifyButton({ href = "/api/login", children = "Connect Spotify" }: SpotifyButtonProps) {
  return (
    <a
      href={href}
      className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#1DB954] px-6 py-3 text-sm font-black text-black shadow-glow transition hover:-translate-y-0.5 hover:bg-[#27d464]"
    >
      <span className="grid size-7 place-items-center rounded-full bg-black text-[#1DB954] transition group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
          <path d="M12 1.9C6.42 1.9 1.9 6.42 1.9 12S6.42 22.1 12 22.1 22.1 17.58 22.1 12 17.58 1.9 12 1.9Zm4.63 14.58a.76.76 0 0 1-1.04.25c-2.85-1.74-6.43-2.13-10.65-1.17a.76.76 0 1 1-.34-1.48c4.62-1.06 8.58-.6 11.78 1.36.36.22.47.69.25 1.04Zm1.24-2.76a.95.95 0 0 1-1.3.31c-3.26-2-8.23-2.58-12.08-1.41a.95.95 0 0 1-.55-1.82c4.4-1.33 9.88-.68 13.62 1.62.44.27.58.85.31 1.3Zm.11-2.87c-3.91-2.32-10.36-2.54-14.1-1.4a1.14 1.14 0 0 1-.66-2.18c4.29-1.3 11.42-1.04 15.93 1.64a1.14 1.14 0 0 1-1.17 1.94Z" />
        </svg>
      </span>
      {children}
    </a>
  );
}
