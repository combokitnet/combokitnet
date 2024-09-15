import { NextPageContext } from "next";
import Link from "next/link";

interface ErrorProps {
  statusCode?: number;
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">
        {statusCode
          ? `An error ${statusCode} occurred on the server`
          : "An error occurred on the client"}
      </h1>
      <p className="mt-4">
        {statusCode === 404
          ? "Sorry, we couldn't find this page."
          : "Something went wrong. Please try again later."}
      </p>
      <Link href="/">
        <a className="mt-6 text-blue-600">Go back to Home</a>
      </Link>
    </div>
  );
};

// `getInitialProps` for error handling on both server-side and client-side
ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
