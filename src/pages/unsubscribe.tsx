import AppLayout from "@/components/AppLayout";
import RecentUsed from "@/containers/HomePage/RecentUsed";
import { useState } from "react";

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Unsubscribe Request:", { email, reason });
    // TODO: send to api
  };

  return (
    <AppLayout>
      <div className="pt-[100px] p-4 mb-5">
        <div className="p-6 max-w-md mx-auto ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unsubscribe</h1>
          <p className="text-gray-600 mb-6">
            We're sorry to see you go. Please fill out the form below to
            unsubscribe.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for Unsubscribing (optional)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Let us know why you're leaving..."
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Unsubscribe
            </button>
          </form>
        </div>
        <RecentUsed />
      </div>
    </AppLayout>
  );
}
