import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#0F1220] px-6 text-center text-slate-300">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[inset_0_2px_20px_rgba(255,255,255,0.02)] md:p-16">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 mb-8">
          <svg
            className="h-12 w-12 text-red-400 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          <span className="font-mono text-red-400">404</span> | System Exception
        </h1>
        <p className="mb-8 font-mono text-sm text-slate-400/80 md:text-base">
          {">"} ERR_FILE_NOT_FOUND
          <br />
          {">"} The requested resource could not be located on this server.
          <br />
          {">"} Connection timeout at target node.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm tracking-wider text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_rgba(31,140,255,0.2)]"
        >
          {">"} RETURN TO ROOT
        </Link>
      </div>
    </div>
  );
}
