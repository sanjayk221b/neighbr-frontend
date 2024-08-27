import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface VideoCallProps {
  roomID: string;
  onEndCall: () => void;
  userId: string;
  userName: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomID, onEndCall, userId, userName }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startCall = async () => {
      const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userId,
        userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current!,
        sharedLinks: [
          {
            name: "Copy link",
            url: `${window.location.origin}/chat?roomID=${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onLeaveRoom: onEndCall,
      });
    };

    startCall();
  }, [roomID, userId, userName]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[calc(100%-4rem)]"
    ></div>
  );
};

export default VideoCall;