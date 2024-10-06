import AppLayout from "@/components/AppLayout";
import { NotFoundTool } from "@/containers/ToolPage";

export default function Page404() {
  return (
    <AppLayout>
      {/* <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <p className="mt-2 text-gray-500">
          Please check the URL and try again, or return to the homepage.
        </p>
        <Link
          href="/"
          className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go Back to Homepage
        </Link>
      </div> */}

      <div className="pt-[82px] p-[42px] text-center">
        <NotFoundTool />
      </div>
    </AppLayout>
  );
}
