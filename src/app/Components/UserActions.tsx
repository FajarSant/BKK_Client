import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <Avatar onClick={toggleDropdown}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
          </AvatarFallback>
        </Avatar>
      </div>
      {isOpen && (
        <div
          id="dropdownInformation"
          className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
        >
          <div className="px-4 py-3 text-sm text-gray-900">
            <div>Bonnie Green</div>
            <div className="font-medium truncate">name@flowbite.com</div>
          </div>
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownInformationButton">
            <li>
              <a href="/Dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
            </li>
            <li>
              <a href="/Profil" className="block px-4 py-2 hover:bg-gray-100">Profil</a>
            </li>
            <li>
              <a href="/LamaranTersimpan" className="block px-4 py-2 hover:bg-gray-100">Lamaran Tersimpan</a>
            </li>
          </ul>
          <div className="py-2">
            <a href="/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActions;
