import React from "react";

const InfoSection: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">Password Generator Guide</h2>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Why Use a Password Generator?
          </h3>
          <p>
            Using a password generator ensures that your passwords are strong,
            random, and unique. This greatly reduces the chances of your
            accounts being compromised by brute force attacks or password
            guessing techniques.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">How It Works</h3>
          <p>
            The password generator creates a mix of letters, numbers, and
            symbols based on your selected options. You can adjust the length,
            number of passwords, and the types of characters included to suit
            your needs.
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Best Practices</h3>
          <ul className="list-disc ml-6">
            <li>Use different passwords for each of your accounts.</li>
            <li>Combine letters, numbers, and symbols for maximum security.</li>
            <li>Avoid using common words or easily guessable information.</li>
            <li>
              Regularly update your passwords, especially for sensitive
              accounts.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">How to Store Your Passwords</h3>
          <p>
            Consider using a password manager to securely store and manage your
            passwords. This will help you keep track of your passwords without
            the need to memorize them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
