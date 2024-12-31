import useSearchParams from "@/hooks/useSearchParams";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";

interface CHplayAppDetailProps {
  appDetails: any;
}

const chplayurl = "https://play.google.com/store/apps/details";

const CHplayAppDetail: React.FC<CHplayAppDetailProps> = ({ appDetails }) => {
  const { searchParams } = useSearchParams();

  if (!appDetails) {
    return <div>App not found</div>;
  }

  console.log("type:", searchParams);
  if (searchParams.get("type") === "json") {
    return <pre>{JSON.stringify(appDetails, null, 2)}</pre>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold">{appDetails?.id}</h1>
      <div className="mt-6 md:mt-10">
        <p>description: {appDetails?.description}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.id) {
    return {
      props: {
        appDetails: null,
      },
    };
  }
  try {
    const { data: html } = await axios.get(chplayurl, {
      params: context.query,
    });

    // Regular expression to extract specific data from the HTML
    const descriptionMatch = html.match(
      /<div itemprop="description">([\s\S]*?)<\/div>/
    );
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/<[^>]+>/g, "").trim()
      : "Description not found";

    const appDetails = {
      description,
      ...context?.query,
    };

    return {
      props: {
        appDetails,
      },
    };
  } catch (error) {
    console.error("Error fetching app details:", error);
    return {
      props: {
        appDetails: null,
      },
    };
  }
};

export default CHplayAppDetail;
