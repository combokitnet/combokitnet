import InfoSectionItem from "@/components/InfoSectionItem";
import React from "react";
import {
  FaClipboard,
  FaCogs,
  FaEye,
  FaLock,
  FaRegClock,
  FaSyncAlt,
  FaUserLock,
} from "react-icons/fa";
import { MdVpnLock } from "react-icons/md";

const InfoSection: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <InfoSectionItem
        title=""
        name="Why use a Password Generator?"
        desc="Using a password generator ensures that your passwords are strong,
            random, and unique. This greatly reduces the chances of your
            accounts being compromised by brute force attacks or password
            guessing techniques."
        features={[
          {
            name: "Stronger Security",
            description:
              "Generates complex passwords that are hard to crack with brute-force attacks.",
            icon: FaLock,
          },
          {
            name: "Avoiding Predictable Passwords",
            description:
              "Eliminates the risk of using easy-to-guess passwords like 'password123'.",
            icon: MdVpnLock,
          },
          {
            name: "Unique Passwords for Each Account",
            description:
              "Ensures every account has a different password, enhancing overall security.",
            icon: FaUserLock,
          },
          {
            name: "Time-Saving",
            description:
              "Quickly generates secure passwords without the hassle of coming up with them manually.",
            icon: FaRegClock,
          },
        ]}
      />

      <InfoSectionItem
        title=""
        name="How It Works"
        desc="The password generator creates a mix of letters, numbers, and symbols based on your selected options. You can adjust the length, number of passwords, and the types of characters included to suit your needs."
        features={[
          {
            name: "1. Select Password Options",
            description:
              "Choose character types, password length, and the number of passwords you want.",
            icon: FaCogs,
          },
          {
            name: "2. Generate the Password",
            description:
              "Click to generate a password that matches your criteria.",
            icon: FaSyncAlt,
          },
          {
            name: "3. Review the Results",
            description:
              "View the generated passwords to ensure they meet your needs.",
            icon: FaEye,
          },
          {
            name: "4. Copy and Use",
            description:
              "Copy the generated password and paste it wherever needed.",
            icon: FaClipboard,
          },
          {
            name: "5. Store Password Safely",
            description: "Store your password securely in a password manager.",
            icon: FaLock,
          },
        ]}
      />
    </div>
  );
};

export default InfoSection;
