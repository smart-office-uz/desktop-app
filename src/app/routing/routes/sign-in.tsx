import { createFileRoute, useLayoutEffect } from "@tanstack/react-router";

// services
import WindowService from "@/core/services/window.service";

// use-cases
import { AppLogo } from "@/app/widgets/app-logo";
import { SignInForm } from "@/core/use-cases/user/sign-in/ui/SignInForm";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
});

function SignIn() {
  const windowService = new WindowService();

  async function configureWindow() {
    await windowService.center_window();
  }

  useLayoutEffect(() => {
    configureWindow();
  }, []);

  return (
    <section className="min-h-screen grid grid-cols-2">
      <div className="px-6 py-8 bg-white">
        <AppLogo width={159} />
        <div className="flex flex-col items-center justify-center h-full">
          <SignInForm />
        </div>
      </div>
      <div className="bg-auth-secondary flex items-center justify-center p-6">
        <svg
          width="319"
          height="272"
          viewBox="0 0 319 272"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M108.33 11.4144C123.327 -3.57626 147.641 -3.5762 162.639 11.4144L259.719 108.454C274.717 123.444 274.717 147.748 259.719 162.739L162.639 259.779C147.641 274.77 123.327 274.77 108.33 259.779L11.2494 162.739C-3.74762 147.748 -3.74762 123.444 11.2494 108.454L108.33 11.4144Z"
            fill="#0E0E13"
          />
          <path
            d="M155.793 11.4144C170.791 -3.57626 195.105 -3.5762 210.103 11.4144L307.184 108.454C322.18 123.444 322.18 147.748 307.184 162.739L210.103 259.779C195.105 274.77 170.791 274.77 155.793 259.779L58.7126 162.739C43.716 147.748 43.716 123.444 58.7126 108.454L155.793 11.4144Z"
            fill="#2260FF"
          />
          <path
            d="M139.487 176.028C133.978 176.028 128.997 175.086 124.544 173.199C120.166 171.314 116.694 168.598 114.128 165.052C111.562 161.506 110.241 157.319 110.166 152.49H127.147C127.374 155.734 128.506 158.299 130.544 160.186C132.657 162.072 135.525 163.015 139.148 163.015C142.846 163.015 145.752 162.147 147.866 160.413C149.979 158.601 151.036 156.263 151.036 153.396C151.036 151.057 150.317 149.133 148.885 147.625C147.451 146.116 145.639 144.946 143.45 144.116C141.337 143.21 138.393 142.231 134.619 141.174C129.487 139.666 125.299 138.194 122.053 136.761C118.883 135.252 116.128 133.026 113.788 130.083C111.524 127.066 110.392 123.068 110.392 118.088C110.392 113.411 111.562 109.337 113.902 105.867C116.242 102.396 119.524 99.7556 123.751 97.9453C127.978 96.0592 132.808 95.1161 138.242 95.1161C146.394 95.1161 152.997 97.1156 158.054 101.114C163.187 105.037 166.018 110.544 166.546 117.636H149.111C148.96 114.92 147.79 112.694 145.601 110.959C143.488 109.148 140.657 108.243 137.11 108.243C134.016 108.243 131.525 109.035 129.638 110.62C127.827 112.204 126.921 114.505 126.921 117.522C126.921 119.635 127.6 121.408 128.959 122.841C130.393 124.199 132.129 125.331 134.167 126.236C136.279 127.066 139.223 128.047 142.997 129.179C148.13 130.687 152.319 132.196 155.563 133.705C158.809 135.214 161.602 137.477 163.942 140.495C166.282 143.512 167.452 147.474 167.452 152.377C167.452 156.602 166.357 160.524 164.168 164.146C161.979 167.767 158.771 170.672 154.544 172.859C150.317 174.973 145.299 176.028 139.487 176.028Z"
            fill="white"
          />
          <path
            d="M217.864 176.028C210.469 176.028 203.676 174.293 197.486 170.823C191.298 167.352 186.392 162.562 182.769 156.451C179.146 150.265 177.334 143.286 177.334 135.516C177.334 127.82 179.146 120.917 182.769 114.806C186.392 108.62 191.298 103.792 197.486 100.321C203.676 96.8509 210.469 95.1158 217.864 95.1158C225.337 95.1158 232.129 96.8509 238.243 100.321C244.432 103.792 249.301 108.62 252.847 114.806C256.47 120.917 258.282 127.82 258.282 135.516C258.282 143.286 256.47 150.265 252.847 156.451C249.301 162.562 244.432 167.352 238.243 170.823C232.053 174.293 225.262 176.028 217.864 176.028ZM217.864 161.883C222.62 161.883 226.809 160.826 230.432 158.714C234.054 156.526 236.884 153.433 238.922 149.434C240.96 145.435 241.979 140.796 241.979 135.516C241.979 130.234 240.96 125.632 238.922 121.71C236.884 117.711 234.054 114.655 230.432 112.543C226.809 110.431 222.62 109.374 217.864 109.374C213.109 109.374 208.884 110.431 205.185 112.543C201.562 114.655 198.731 117.711 196.693 121.71C194.655 125.632 193.638 130.234 193.638 135.516C193.638 140.796 194.655 145.435 196.693 149.434C198.731 153.433 201.562 156.526 205.185 158.714C208.884 160.826 213.109 161.883 217.864 161.883Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
