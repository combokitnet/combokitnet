import Drawer from "@/components/Drawer";
import { LOCAL_STORAGE } from "@/configs/const";
import { useEffect, useState } from "react";
import { FaHistory, FaTrash } from "react-icons/fa";

type PasswordHistoryType = { time: Date; password: string };

export const addPasswordHistory = (password: string) => {
  if (!window.localStorage) return;
  const history = window.localStorage.getItem(LOCAL_STORAGE.PASSWORD_HISTORY);
  const newHistory = history ? JSON.parse(history) : [];

  if (newHistory.length > 0) {
    if (newHistory[newHistory.length - 1].password === password) {
      // avoid duplicate password save
      return;
    }
  }

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
  const [showHistory, setShowHistory] = useState(false);
  console.log({ showHistory });

  useEffect(() => {
    setHistory(getPasswordHistory());
  }, [showHistory]);

  return (
    <>
      <button
        onClick={() => {
          setShowHistory(true);
        }}
        className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-7 text-xs gap-1"
      >
        <FaHistory /> History
      </button>

      <Drawer
        isOpen={showHistory}
        onClose={() => {
          setShowHistory(false);
        }}
        title="Password History"
      >
        {history && history.length > 0 ? (
          <>
            {Object.entries(
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
                      className="p-3 rounded-md bg-gray-100 border border-gray-200 text-sm flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{password}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(time).toLocaleTimeString()}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          deletePasswordHistory(password);
                          setHistory(getPasswordHistory());
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {history.length > 1 && (
              <div className="mt-5 text-right">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete all password history?"
                      )
                    ) {
                      clearPasswordHistory();
                      setHistory([]);
                    }
                  }}
                  className="text-red-500 text-[13px] capitalize hover:text-red-700"
                >
                  Clear All History
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">
            No password history available.
          </p>
        )}
      </Drawer>
    </>
  );
}
