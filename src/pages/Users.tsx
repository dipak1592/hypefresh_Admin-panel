import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DeleteModal from '../components/Tables/Reported-post model/DeleteuserModel';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 

interface User {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  mobileNumber: number;
}

const API_URL_USER = import.meta.env.VITE_BASE_URL;

const getToken = (): string | null => {
  // return localStorage.getItem('token');
  return Cookies.get('token') ?? null;
};

const Users = () => {
  const [items, setItems] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [deletingUser, setDeletingUser] = useState<string | null>(null); // New state for tracking deletion

  // Fetch user data
  const getItems = async () => {
    const token = getToken();
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      const response = await fetch(`${API_URL_USER}/users/admin/allusers`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: User[] = await response.json();
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Function to delete a user
  const deleteUser = async (id: string) => {
    const token = getToken();
    if (!token) {
      setError('No token found');
      return;
    }

    setDeletingUser(id); // Set the deleting state

    try {
      const response = await fetch(`${API_URL_USER}/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Delete Response:",response)
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Directly update state to trigger re-render
      setItems(prevItems => prevItems.filter(item => item.id.toString() !== id));
      setShowDeleteModal(false);
      setUserIdToDelete(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDeletingUser(null); // Reset the deleting state
    }
  };

  // UseEffect to fetch data initially
  useEffect(() => {
    getItems(); // Fetch the initial list of users when component mounts
  }, []);

  return (
    <>
      <Breadcrumb pageName="Users" />
      <div className="p-6 dark:bg-gray-800 rounded-lg shadow-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          <table className="min-w-full dark:bg-gray-800 bg-white dark:bg-boxdark dark:text-white">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 ease-in-out">
                <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">UserName</th>
                <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">FirstName</th>
                <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">LastName</th>
                <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Mobile-No</th>
                <th className="px-10 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 dark:bg-boxdark">
              {error && <p className="text-red-500">{error}</p>}
              {items.map((item) => (
                <tr key={item.id} className="transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-xl">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.firstName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{item.mobileNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {deletingUser === item.id.toString() ? (
                      <span className="text-gray-500">Deleting...</span>
                    ) : (
                      <button
                        className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setUserIdToDelete(item.id.toString());
                        }}
                        disabled={deletingUser !== null}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Use the DeleteModal component */}
      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          if (userIdToDelete) {
            deleteUser(userIdToDelete);
          }
        }}
      />
    </>
  );
};

export default Users;
