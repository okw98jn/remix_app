import { Outlet } from "@remix-run/react";
import githubImage from "@/routes/_auth/images/github.png";
import type { LoaderFunctionArgs } from "@remix-run/node";

import SocialAuthButton from "@/routes/_auth/components/SocialAuthButton";
import googleImage from "@/routes/_auth/images/google.png";
import {
  getAuthTokenSession,
  redirectIfAuthenticated,
} from "@/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const authToken = await getAuthTokenSession(request);

  return await redirectIfAuthenticated(request, authToken);
}

const Auth = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <Outlet />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400">
              もしくは
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SocialAuthButton provider="Google" providerImage={googleImage} />
          <SocialAuthButton provider="GitHub" providerImage={githubImage} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
