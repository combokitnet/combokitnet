import Drawer from "@/components/Drawer";
import { LOCAL_STORAGE } from "@/configs/const";
import { useState } from "react";
import { FaHistory } from "react-icons/fa";

const PASS_HIS = {
  key: LOCAL_STORAGE.PASSWORD_HISTORY,
  defaultValue: [],
};

type PasswordHistoryType = { time: Date; password: string };

export const addPasswordHistory = (password: string) => {
  if (!window.localStorage) return;
  const history = window.localStorage.getItem(LOCAL_STORAGE.PASSWORD_HISTORY);
  const newHistory = history ? JSON.parse(history) : [];
  newHistory.unshift({ time: new Date(), password });
  window.localStorage.setItem(
    LOCAL_STORAGE.PASSWORD_HISTORY,
    JSON.stringify(newHistory)
  );
};

export const deletePasswordHistory = (password: string) => {
  if (!window.localStorage) return;
  const history = window.localStorage.getItem(LOCAL_STORAGE.PASSWORD_HISTORY);
  let newHistory = history ? JSON.parse(history) : [];
  newHistory = newHistory.filter(
    (item: PasswordHistoryType) => item.password !== password
  );
  window.localStorage.setItem(
    LOCAL_STORAGE.PASSWORD_HISTORY,
    JSON.stringify(newHistory)
  );
};

export const clearPasswordHistory = () => {
  if (!window.localStorage) return;
  window.localStorage.removeItem(LOCAL_STORAGE.PASSWORD_HISTORY);
};

export const getPasswordHistory = () => {
  if (!window.localStorage) return [];
  const history = window.localStorage.getItem(LOCAL_STORAGE.PASSWORD_HISTORY);
  let newHistory = history ? JSON.parse(history) : [];
  return newHistory;
};

export default function PasswordHistory() {
  const [history, setHistory] = useState<PasswordHistoryType[]>([]);

  return (
    <>
      <button
        onClick={() => {
          setHistory(getPasswordHistory());
        }}
        className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-7 text-xs gap-1"
      >
        <FaHistory /> History
      </button>

      {history.length > 0 && (
        <div className="fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg border-l border-gray-300 flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Password History</h2>
            <button
              onClick={() => setHistory([])}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <Drawer
            isOpen={history && history.length > 0}
            onClose={() => setHistory([])}
            title="Password History"
          >
            {history && history.length > 0 ? (
              Object.entries(
                history.reduce((acc, { time, password }) => {
                  const dateKey = new Date(time).toLocaleDateString(); // Group by day
                  acc[dateKey] = acc[dateKey] || [];
                  acc[dateKey].push({ time, password });
                  return acc;
                }, {} as Record<string, { time: Date; password: string }[]>)
              ).map(([date, items]) => (
                <div key={date} className="mb-5">
                  {/* Group Header (Date) */}
                  <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-300 mb-2">
                    {date}
                  </h3>
                  {/* Grouped Items */}
                  <ul className="space-y-3">
                    {items.map(({ time, password }, index) => (
                      <li
                        key={index}
                        className="p-3 rounded-md bg-gray-100 border border-gray-200 text-sm"
                      >
                        <div className="font-medium">{password}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(time).toLocaleTimeString()}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No password history available.
              </p>
            )}
          </Drawer>
        </div>
      )}
    </>
  );
}
