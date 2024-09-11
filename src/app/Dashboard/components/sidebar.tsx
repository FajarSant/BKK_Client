import { FaUserMd, FaHospitalAlt, FaCog, FaHome } from 'react-icons/fa';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen text-white flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <Link href="/admin/dashboard">
              <span className="flex items-center p-2 hover:bg-gray-700">
                <FaHome className="mr-3" />
                Dashboard
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/Dashboard/jobs">
              <span className="flex items-center p-2 hover:bg-gray-700">
                <FaHospitalAlt className="mr-3" />
                Manage Jobs
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/dashboard/users">
              <span className="flex items-center p-2 hover:bg-gray-700">
                <FaUserMd className="mr-3" />
                Manage Users
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/dashboard/settings">
              <span className="flex items-center p-2 hover:bg-gray-700">
                <FaCog className="mr-3" />
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
