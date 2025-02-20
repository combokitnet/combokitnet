import { startCelebration } from "@/components/CelebrationConfetti";
import Modal from "@/components/Modal";
import { APP_SOCIAL } from "@/configs/const";
import { useAppContext } from "@/contexts/AppContext";
import { useRequest } from "@/hooks/useRequest";
import { cleanObject } from "@/utils/object";
import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaGithub,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { MdFeedback, MdStar } from "react-icons/md";

export enum FeedbackType {
  feedback = "feedback",
  report_bug = "report_bug",
  request_feature = "request_feature",
  other = "other",
}

const Feedback = ({
  serviceId,
  type,
  render,
}: {
  serviceId?: string | "all";
  type?: FeedbackType;
  render?: ReactNode;
}) => {
  const { tools, fetchTools } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    company: "",
    profileLink: "",
    recommendation: "",
    toolId: serviceId || "all",
    type: type || "feedback",
  });
  const { request, loading } = useRequest();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    console.log("Rating: ", rating);

    try {
      await request(`/api/feedback`, {
        method: "POST",
        body: cleanObject({
          name: formData?.fullName || "",
          rate: rating,
          toolId: formData?.toolId,
          text: formData?.recommendation,
          type: formData?.type,
          role: formData?.role,
          company: formData?.company,
          profileLink: formData?.profileLink,
        }),
      });
      startCelebration(10_000);
      toast.success("Thank you!");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.message || "Submit form error.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (tools.length < 1) {
      fetchTools();
    }
  }, [fetchTools, tools]);

  let child = (
    <button
      onClick={() => setIsModalOpen(true)}
      title="Feedback"
      className="flex gap-[6px] items-center justify-center p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
    >
      <MdFeedback size={"18px"} />
    </button>
  );

  if (render && isValidElement(render)) {
    child = cloneElement(render, {
      onClick: () => setIsModalOpen(true),
    } as any);
  }

  return (
    <>
      {child}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="Share Your Vision, Guide Our Future!"
      >
        <form className="text-left" onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="toolId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Service <span className="text-red-400">*</span>
              </label>

              <select
                onChange={(e) => {
                  setFormData({ ...formData, toolId: e.target.value });
                }}
                defaultValue={formData?.toolId}
                id="toolId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {[{ name: "All service", id: "all" }, ...tools].map((m, i) => (
                  <option key={`tool_${m.name}`} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="rating"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Rate us (1-5 stars) <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <MdStar
                    key={star}
                    size={24}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Designer"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Flowbite"
              />
            </div>

            <div>
              <label
                htmlFor="profileLink"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Profile Link
              </label>
              <input
                type="url"
                id="profileLink"
                value={formData.profileLink}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="https://profile.com"
              />
            </div>
          </div>

          <div className="mb-2">
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type <span className="text-red-400">*</span>
            </label>

            <select
              required
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value as any });
              }}
              defaultValue={formData?.type}
              id="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option key={`type_feedback`} value={`feedback`}>
                Feedback
              </option>
              <option key={`type_report_bug`} value={`report_bug`}>
                Report bug
              </option>
              <option key={`type_request_feature`} value={`request_feature`}>
                Request feature
              </option>
              <option key={`type_other`} value={`other`}>
                Other
              </option>
            </select>
          </div>

          <div className="mb-6">
            <label
              htmlFor="recommendation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Share your thoughts <span className="text-red-400">*</span>
            </label>
            <textarea
              id="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              rows={4}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Share your thoughts"
            />
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4 flex gap-3 ">
            <span>You can reach us via:</span>{" "}
            <div className="flex justify-start gap-6">
              <a
                href={APP_SOCIAL.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <FaTelegramPlane size={24} />
                <span className="sr-only">Telegram</span>
              </a>
              <a
                href={APP_SOCIAL.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <FaGithub size={24} />
                <span className="sr-only">Github</span>
              </a>
              <a
                href={APP_SOCIAL.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300"
              >
                <FaTwitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href={`mailto:${APP_SOCIAL.gmail}`}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
              >
                <FaEnvelope size={24} />
                <span className="sr-only">Mail</span>
              </a>
            </div>
          </p>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Feedback;
