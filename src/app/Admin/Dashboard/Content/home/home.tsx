import React, { useEffect, useState } from 'react';
import { FaUsers, FaBriefcase, FaUserShield, FaHotel } from 'react-icons/fa';
import { MdEngineering } from 'react-icons/md';
import { TbEngine } from 'react-icons/tb';
import { axiosInstance } from '@/lib/axios';
import DashboardLayout from '@/app/Admin/layouts';

const Home = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [jobCount, setJobCount] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the number of users and user details
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/Users'); // Replace with your API endpoint
        setUsers(response.data); // Assuming the API returns an array of users
        setUserCount(response.data.length); // Total number of users
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    // Fetch the number of jobs
    const fetchJobCount = async () => {
      try {
        const response = await axiosInstance.get('/Jobs'); // Replace with your API endpoint
        setJobCount(response.data.length); // Assuming the API returns an array
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchUsers();
    fetchJobCount();
  }, []);

  return (
    <DashboardLayout>

    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="space-y-4">
        {/* Users Section */}
        <div className="overflow-x-auto shadow-md mb-6 p-4 bg-white rounded-xl mt-5">
          <h1 className='text-2xl font-semibold text-center p-4'>Data Pengguna</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded shadow flex items-center">
              <FaUsers className="text-blue-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold">Total Pengguna</h2>
                <p className="text-2xl">{userCount}</p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded shadow flex items-center">
              <FaUserShield className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold">Total Admin</h2>
                <p className="text-2xl">
                  {users.filter((user) => user.peran === "ADMIN").length}
                </p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded shadow flex items-center">
              <FaUsers className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold">Total Pengguna</h2>
                <p className="text-2xl">
                  {users.filter((user) => user.peran === "PENGGUNA").length}
                </p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded shadow flex items-center">
              <TbEngine className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold">Jurusan TBSM</h2>
                <p className="text-2xl">
                  {users.filter((user) => user.jurusan === "TBSM").length}
                </p>
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded shadow flex items-center">
              <MdEngineering className="text-green-500 text-3xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold">Jurusan TKR</h2>
                <p className="text-2xl">
                  {users.filter((user) => user.jurusan === "TKR").length}
                </p>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded shadow flex items-center">
              <FaHotel className="text-purple-500 text-3xl mr-4" />
              <div>
                <h2 className="text-base font-semibold">Jurusan Perhotelan</h2>
                <p className="text-2xl">
                  {users.filter((user) => user.jurusan === "PERHOTELAN").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Total Jobs</h2>
          <div className="flex items-center">
            <FaBriefcase className="text-green-500 text-3xl mr-4" />
            <p className="text-2xl">{jobCount}</p>
          </div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default Home;
