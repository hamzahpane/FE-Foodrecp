import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../assets/Food_Recep.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("HOME");

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    // Close the menu on link click if mobile
    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-200">
      <div className="p-5 flex items-center justify-between mx-4">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Food Recep Logo" className="w-8 h-8" />
          <p className="text-lg font-bebas">FOOD RECEP</p>
        </div>
        <ul className="hidden sm:flex space-x-10">
          {["HOME", "RECIPES", "CONTACTUS"].map((item) => (
            <li key={item}>
              <a
                href={
                  item === "RECIPES"
                    ? "#RecipeList"
                    : item === "HOME"
                    ? "#Hero"
                    : item === "CONTACTUS"
                    ? "https://www.whatsapp.com/"
                    : `#${item}`
                }
                onClick={() => handleLinkClick(item)}
                className={`font-bebas text-lg ${
                  activeLink === item ? "text-black" : "text-gray-400"
                } hover:text-black`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 p-0.5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoGithub size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <button className="sm:hidden text-black" onClick={toggleMenu}>
            <h1 className="hidden"> ..</h1>
            <FaBars size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-60 bg-white border border-gray-200 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } h-full z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <h1 className="hidden"> ..</h1>
            <AiOutlineClose size={24} color="gray" />
          </button>
        </div>
        <ul className="flex flex-col items-start p-4 space-y-4">
          {["HOME", "RECIPES", "CONTACT US"].map((item) => (
            <li key={item}>
              <a
                href={item === "RECIPES" ? "#RecipeList" : `#${item}`}
                onClick={() => handleLinkClick(item)}
                className={`font-Karla text-base ${
                  activeLink === item ? "text-black" : "text-gray-400"
                } hover:text-black`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
