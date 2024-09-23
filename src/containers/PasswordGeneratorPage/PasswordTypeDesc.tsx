import { specialCharMap } from "./const";
import { passwordConfigs, PasswordType } from "./utils";

const PasswordTypeDesc = ({ type }: { type: PasswordType }) => {
  const data = passwordConfigs[type];

  const renderDetails = () => {
    switch (type) {
      case "normal":
        return (
          <div className="text-left">
            <p>
              This generator creates a standard password composed of random
              characters, ensuring a good mix of letters, numbers, and symbols.
            </p>
            <p>
              It's suitable for general use cases and provides a basic level of
              security. Remember to use a combination of at least 12 characters
              for better protection.
            </p>
          </div>
        );
      case "words":
        return (
          <div className="text-left">
            <p>
              This generator uses phrases composed of random words to create
              memorable yet strong passwords. <br /> Examples include:
            </p>
            <ul className="pl-4 list-disc">
              <li>AlarmLinimentPotency65</li>
              <li>doghouse-strained-observe-spend</li>
            </ul>
            <p>
              These passwords are easy to remember but can be made stronger with
              additional characters, such as numbers or symbols.
            </p>
            <p>
              To enhance security, consider using longer phrases (12+
              characters) and mixing in unexpected words.
            </p>
          </div>
        );
      case "wordsWithSymbols":
        return (
          <div className="text-left">
            <p>
              This generator modifies words by replacing certain characters with
              symbols for enhanced security, such as:
            </p>
            <table className="min-w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Character
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Replacement
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(specialCharMap).map(([char, replacement]) => (
                  <tr key={char}>
                    <td className="border border-gray-300 px-4 py-2">{char}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {replacement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p>
              It is advisable not to share password hints, as they can lead to
              password guesses. Using this method ensures that even if someone
              knows the words, they cannot easily deduce the actual password.
            </p>
          </div>
        );
      case "hex":
        return (
          <div className="text-left">
            <p>
              This generator creates passwords using hexadecimal characters
              (0-9, a-f) for a secure and unique format. Hexadecimal passwords
              are particularly useful for developers or applications that
              require such formats.
            </p>
            <p>
              A typical hex password might look like: <strong>1a2b3c4d</strong>.
            </p>
          </div>
        );
      case "base64":
        return (
          <div className="text-left">
            <p>
              This generator encodes passwords in Base64, providing a mix of
              letters, numbers, and symbols for secure storage. Base64 encoding
              is commonly used in web applications and APIs for encoding data.
            </p>
            <p>
              An example of a Base64 password could be:{" "}
              <strong>cGFzc3dvcmQ=</strong>.
            </p>
          </div>
        );
      case "secure":
        return (
          <div className="text-left">
            <p>
              This generator creates a highly secure password by combining
              various character types, making it ideal for sensitive accounts.
              It typically includes upper and lowercase letters, numbers, and
              symbols.
            </p>
            <p>
              For maximum security, aim for at least 16 characters, and avoid
              using easily guessable information.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {data?.name} Password
          </h3>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {data?.description}
          </p>
        </div>
        <div className="mt-4 text-gray-700 text-left max-w-[700px] m-[0_auto]">
          {renderDetails()}
        </div>
      </div>
    </div>
  );
};

export default PasswordTypeDesc;
