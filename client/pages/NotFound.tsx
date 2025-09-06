import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 rounded-2xl border bg-card shadow-sm">
        <h1 className="text-4xl font-extrabold mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <a href="/" className="inline-block bg-brand-gradient text-white px-5 py-2 rounded-md font-medium">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
