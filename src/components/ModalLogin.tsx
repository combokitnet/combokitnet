import { useAppContext } from "@/contexts/AppContext";
import { useRequest } from "@/hooks/useRequest";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import InputAction from "./InputAction";
import InputPassword from "./InputPassword";
import Modal from "./Modal";
import UserProfile from "./UserProfile";

export default function ModalLogin() {
  const { user } = useAppContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      {user?.isSignUp ? (
        <UserProfile />
      ) : (
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex gap-[6px] items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 capitalize"
        >
          login
        </button>
      )}

      <Modal
        title="Login"
        onClose={() => {
          setOpen(false);
        }}
        isOpen={open}
        className="max-w-[600px]"
      >
        <FormLogin setOpen={setOpen} />

        <div className="flex flex-row gap-2 flex-wrap justify-center items-center ">
          <div className="text-center my-4 text-gray-500">or login with</div>

          <button
            onClick={(e) => {
              e.preventDefault();
              // open mini browser to google auth
              window.location.replace(
                `/api/auth/google?state=${window.location.pathname}`
              );
            }}
            className="bg-red-600 text-white p-2 max-h-[42px] rounded hover:bg-red-700 flex items-center gap-2"
          >
            <i className="text-white">
              <FaGoogle />
            </i>
            Google
          </button>
          {/* <button className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 flex items-center gap-2">
            <i className="text-white">
              <FaFacebook />
            </i>
            Facebook
          </button>
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center gap-2">
            <i className="text-white">
              <FaTwitter />
            </i>
            Twitter
          </button>
          <button className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 flex items-center gap-2">
            <i className="text-white">
              <FaInstagram />
            </i>
            Instagram
          </button>
          <button className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 flex items-center gap-2">
            <i className="text-white">
              <FaPinterest />
            </i>
            Pinterest
          </button>
          <button className="bg-gray-800 text-white p-2 rounded hover:bg-gray-900 flex items-center gap-2">
            <i className="text-white">
              <FaGithub />
            </i>
            GitHub
          </button>
          <button className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex items-center gap-2">
            <i className="text-white">
              <FaYoutube />
            </i>
            YouTube
          </button> */}
        </div>
      </Modal>
    </>
  );
}

const FormLogin = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [tempCode, setTempCode] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [start, setStart] = useState(Date.now());
  const { loading, request } = useRequest();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("login", { email, password });

        if (isRegister) {
          if (password !== repassword) {
            toast.error("Password not match");
            return;
          }
          if (tempCode.length < 6) {
            toast.error("Verification code must be 6 characters");
            return;
          }
          // post api to /auth/password-confirm
          try {
            const res: any = await request("/api/auth/password-confirm", {
              body: { email, password, tempCode },
              method: "POST",
            });

            console.log(res);
            toast.success(res?.message);
            window.location.reload();
          } catch (error: any) {
            console.log(error);
            let errorMessage =
              error?.response?.data?.message || "Register failed";
            toast.error(errorMessage);
          }

          return;
        }

        // post api to /auth/password
        try {
          const res: any = await request("/api/auth/password", {
            body: { email, password },
            method: "POST",
          });

          if (res?.data && res?.data?.step === "CHECK_EMAIL") {
            toast.success(res.message);
            setIsRegister(true);
            setStart(Date.now());
          } else {
            toast.success("Login success");
            setOpen(false);
            window.location.reload();
          }
        } catch (error: any) {
          console.log(error);
          let errorMessage = error.response.data.message || "Login failed";
          toast.error(errorMessage);
        }
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          disabled={isRegister}
          type="email"
          name="email"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          placeholder="Enter your email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium flex flex-row justify-between">
          Password
          <a
            href="/tools/password-generator"
            target="_blank"
            className="capitalize text-blue-500 text-xs"
          >
            random password
          </a>
        </label>

        <InputPassword
          name="password"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          placeholder="Enter your password"
          required
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {isRegister && (
        <>
          <div>
            <label className="text-sm font-medium flex flex-row justify-between">
              Repeat password
            </label>

            <InputPassword
              name="repeat-password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Repeat password"
              required
              minLength={8}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Code</label>
            <InputAction
              type="text"
              name="code"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="Enter verification code from email"
              required
              onChange={(e) => setTempCode(e.target.value)}
              action={
                <span
                  onClick={async (e) => {
                    e.preventDefault();
                    const n = Date.now();
                    if (n - start > 30000) {
                      const res: any = await request("/api/auth/password", {
                        body: { email, password },
                        method: "POST",
                      });
                      toast.success(res?.message);
                    } else {
                      toast.error("Please wait 30 seconds");
                    }
                  }}
                  className="cursor-pointer absolute top-[50%] right-[10px] translate-y-[-50%]"
                >
                  <TfiReload size={18} />
                </span>
              }
            />
          </div>
        </>
      )}

      <div className="flex flex-wrap gap-2 flex-row justify-center items-center">
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : isRegister ? "Register" : "Submit"}
        </button>
      </div>
    </form>
  );
};
