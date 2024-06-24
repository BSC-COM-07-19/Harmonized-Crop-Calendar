/**
 * HomeLink component renders a link styled as a button with a home icon and text.
 * It accepts a 'href' prop for the link destination.
 *
 * @component
 * @param {object} props - React props for the component.
 * @param {string} props.href - The URL to navigate when the link is clicked.
 * @returns {JSX.Element} - Rendered HomeLink component.
 * 
 */
import React from "react";
import { IoIosHome } from "react-icons/io";
const HomeLink = ({ href }) => {
  return (
    <a
      href={href}
      className="flex items-center space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-2 py-2 text-sm font-bold"
    >
        <IoIosHome className="block h-6 w-6 pr-1" />
      Home
    </a>
  );
};

export default HomeLink;
