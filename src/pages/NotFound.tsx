import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="flex items-center gap-.5">
          <img
            src="/assets/favicon.jpg"
            alt="ComicKids AI Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <h3 className="text-xl font-bold">ComicKids AI</h3>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          Oops! The page you're looking for has wandered off into the comic universe.
        </p>
        <div className="mx-auto w-full max-w-sm space-y-4">
          <Button
            onClick={() => navigate('/')}
            className="w-full gap-2"
            variant="default"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
