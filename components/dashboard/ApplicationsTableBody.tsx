import Image from "next/image";

const ApplicationsTableBody = () => {
  return (
    <tbody className="border border-gray-300">
      <tr>
        <th className="p-3">
          <input
            className="flex w-5 h-5 rounded-lg border-[1px] border-solid border-gray-300 bg-white text-left"
            type="checkbox"
          />
        </th>
        <td className="text-sm w-max p-3">
          <div className="flex items-center gap-3">
            <Image
              src="/companies/google.svg"
              width={20}
              height={20}
              alt="img"
            />
            <p>David Corp</p>
          </div>
        </td>
        <td className="text-sm w-max p-3">Engineer</td>
        <td className="text-sm w-max p-3">9th June 2024</td>
        <td className="text-sm w-max p-3">$70,400 - $101,490</td>
        <td className="text-sm w-max p-3">
          <button type="button" className="bg-primary text-white p-2">
            See application
          </button>
        </td>
        <td className="text-sm w-max p-3">
          <Image
            src="/three-dots.svg"
            width={20}
            height={20}
            alt="more-option"
            className="cursor-pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ApplicationsTableBody;
