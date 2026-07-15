import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <main className="min-h-screen grid place-items-center px-4 text-center">
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-brand-500">404</p>
      <h1 className="mt-4 text-5xl font-semibold">Page not found</h1>
      <p className="mt-3 text-slate-400">The route you requested does not exist in this workspace.</p>
      <Link className="mt-8 inline-flex rounded-2xl bg-brand-500 px-5 py-3 font-medium text-slate-950" to="/login">Back to login</Link>
    </div>
  </main>
);
