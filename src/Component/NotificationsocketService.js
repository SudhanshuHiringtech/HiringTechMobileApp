import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { selectProfile } from '../Reduxtoolkit/profileSlice';

const useSocket = () => {
  const profile = useSelector(selectProfile);
  const userId = profile?.profile?.user?._id; // Get user ID from Redux store
  //console.log("yeelo ?Id ", userId)
  useEffect(() => {
    if (userId) {
      console.log("HI");
      // Initialize Socket.IO connections
      const notificationSocket = io('http://192.168.29.188:5000/notifications', {
        query: { userId },
      });

      // Handle socket events
      notificationSocket.on('connect', () => {
        console.log('Connected to notifications socket');
      });

      // Clean up the socket connection on component unmount
      return () => {
        notificationSocket.disconnect();
        console.log('Disconnected from notifications socket');
      };
    }
  }, [userId]);

  // Return the socket instance
  return {
    notificationSocket: userId ? io('http://192.168.29.188:5000/notifications', { query: { userId } }) : null,
  };
};

export default useSocket;
