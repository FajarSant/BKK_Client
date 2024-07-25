import React from "react";
import { FaPhone, FaEnvelope, FaUser, FaWhatsapp } from "react-icons/fa";

interface User {
  photo: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const handleWhatsAppClick = () => {
    const phoneNumber = `${user.whatsapp}`;
    const message = `Halo, ${user.name}`;
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-4">
      <img
        className="w-full h-48 object-cover object-center"
        src={user.photo}
        alt="User Photo"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaUser className="mr-2" />
          {user.name}
        </h2>
        <p className="text-gray-600 mt-2 flex items-center">
          <FaEnvelope className="mr-2" />
          {user.email}
        </p>
        <p className="text-gray-600 mt-2 flex items-center">
          <FaPhone className="mr-2" />
          {user.phone}
        </p>
        <button
          className="mt-4 flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 focus:outline-none"
          onClick={handleWhatsAppClick}
        >
          <FaWhatsapp className="mr-2" /> Hubungi
        </button>
      </div>
    </div>
  );
};

const UsersList: React.FC = () => {
  const users: User[] = [
    {
      photo: "https://th.bing.com/th/id/OIP.23JlXzTrsjO3W7DlWEKwlQHaIc?w=868&h=990&rs=1&pid=ImgDetMain",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      whatsapp: "1234567890",
    },
    {
      photo: "https://th.bing.com/th/id/OIP.23JlXzTrsjO3W7DlWEKwlQHaIc?w=868&h=990&rs=1&pid=ImgDetMain",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "098-765-4321",
      whatsapp: "0987654321",
    },
    {
      photo: "https://th.bing.com/th/id/OIP.23JlXzTrsjO3W7DlWEKwlQHaIc?w=868&h=990&rs=1&pid=ImgDetMain",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "111-222-3333",
      whatsapp: "1112223333",
    },
  ];

  return (
    <div className="p-4 mt-10 bg-gray-600">
      <div className="text-center font-semibold text-2xl">Pelayanan Terkait tentang BKK</div>
      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
