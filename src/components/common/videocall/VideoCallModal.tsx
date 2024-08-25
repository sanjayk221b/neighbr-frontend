import React from "react";

interface VideoCallModalProps {
  onAccept: () => void;
  onReject: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  onAccept,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Incoming Video Call</h2>
        <div className="flex justify-end">
          <button
            onClick={onReject}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition"
          >
            Reject
          </button>
          <button
            onClick={onAccept}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
