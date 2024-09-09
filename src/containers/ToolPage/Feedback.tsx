import Modal from "@/components/Modal";
import React, { useState } from "react";
import { MdFeedback, MdStar } from "react-icons/md";

const Feedback: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    company: "",
    profileLink: "",
    avatar: null as File | null,
    recommendation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    console.log("Rating: ", rating);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        title="Feedback"
        className="flex gap-[6px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        <MdFeedback size={"18px"} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Share Your Vision, Guide Our Future!"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John ABC"
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
                required
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
                required
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                accept="image/*"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="rating"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Rate us (1-5 stars)
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

          <div className="mb-6">
            <label
              htmlFor="recommendation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Recommendations or new feature suggestions
            </label>
            <textarea
              id="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Share your thoughts"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Feedback;
