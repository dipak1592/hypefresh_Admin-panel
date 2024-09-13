import { useState, useEffect } from 'react';
import Model from '../../../src/components/Tables/Reported-post model/Model';
import FullscreenImageModal from './Reported-post model/ImagefsModel';
import Cookies from 'js-cookie';

interface ReportedPost {
  id: string;
  createdAt: string;
  reason: string;
  postId: string;
  userId: string;
  post: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    isPublished: boolean;
    authorId: string;
  };
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    image: string | null;
    bio: string | null;
    countryCode: string;
    mobileNumber: string;
  };
}

const API_URL_USER = import.meta.env.VITE_BASE_URL;

const getToken = (): string | null => {
  const token = Cookies.get('token');
  return token !== undefined ? token:null;
};

const countReportsPerPost = (reports: ReportedPost[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  reports.forEach(report => {
    counts[report.postId] = (counts[report.postId] || 0) + 1;
  });
  return counts;
};

const TableOne = () => {
  const [reportedPosts, setReportedPosts] = useState<ReportedPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const getItems = async () => {
    const token = getToken();
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      const response = await fetch(`${API_URL_USER}/posts/admin/reported-posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: ReportedPost[] = await response.json();
      setReportedPosts(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deletePost = async (id: string) => {
    const token = getToken();
    if (!token) {
      setError('No token found');
      return;
    }

    try {
      const response = await fetch(`${API_URL_USER}/posts/${id}/unpublish`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errortext = await response.text();
        throw new Error(`Failed to delete post: ${response.status}-${errortext}`);
      }

      // Re-fetch the reported posts list after deletion
      await getItems();

    } catch (err) {
      console.error('Delete post error:', err);
      setError((err as Error).message);
    }
  };

  const handleDelete = (id: string) => {
    console.log(`Attempting to delete post with ID: ${id}`);
    setPostToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      setPostToDelete(null);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setPostToDelete(null);
    setIsModalOpen(false);
  };

  const openImageModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  const reportCounts = countReportsPerPost(reportedPosts);

  return (
    <div className="p-6 dark:bg-gray-800 rounded-lg shadow-md border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
      <div className="overflow-x-auto">
        <table className="min-w-full dark:bg-gray-800 bg-white dark:bg-boxdark dark:text-white">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 border-strokedark">
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Mobile No</th>
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Reported Content</th>
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-1xl font-medium text-gray-500 tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 dark:bg-boxdark">
            {error && <p className="text-red-500">{error}</p>}
            {reportedPosts.map((report, index) => (
              <tr key={index} className="transition duration-200 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-xl">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.user.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.user.mobileNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  <img className='cursor-pointer w-20 h-20' src={report.post.content} alt="" onClick={() => openImageModal(report.post.content)} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{report.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {reportCounts[report.post.id] >= 1 ? (
                    <button
                      className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-900"
                      onClick={() => handleDelete(report.post.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-900">
                      Reported
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FullscreenImageModal
        isOpen={isImageModalOpen}
        imageSrc={selectedImage}
        onClose={closeImageModal}
      />
      <Model
        isOpen={isModalOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this post?"
      />
    </div>
  );
};

export default TableOne;
