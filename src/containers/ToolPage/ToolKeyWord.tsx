import Link from "next/link";
import { TTool } from "./types";

export default function ToolKeyWord({ data }: { data: TTool }) {
  return (
    <div className="container mx-auto p-3">
      <h2 className="capitalize font-bold">keywords</h2>
      <ul className="flex flex-wrap gap-3">
        {Array.isArray(data?.suggestData) &&
          data.suggestData.map((t, i) => (
            <li className="text-red-400 hover:text-black" key={i}>
              <Link
                target="_self"
                href={`/tools?search=${encodeURIComponent(t.trim())}`}
                aria-label={`Keyword: ${t}`}
              >
                #{t.trim()}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
