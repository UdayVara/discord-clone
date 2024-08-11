"use client";

import { Button } from "@/components/ui/button";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function VideoChatBody({
  video,
  audio,
  room,
  name,
  active,
  setActive
}: {
  video: boolean;
  audio: boolean;
  active: boolean;
  room: string;
  name: string;
  setActive:Dispatch<SetStateAction<boolean>>
}) {
  // TODO: get user input for room and name

  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (token === "") {
    return <div className="w-full h-full flex flex-col justify-center items-center"><svg fill="#818cf8" className="animate-spin h-5 w-5 " viewBox="0 0 24 24">
    
  </svg></div>
  }

  return (
    <>
    {
      active ?
      <LiveKitRoom
        video={video}
        audio={audio}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        className="max-h-full pb-32"
        onDisconnected={()=>{
          setActive(false)
        }}
        
      >
        {/* Your custom component with basic video conferencing functionality. */}
        <MyVideoConference />
        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
        <RoomAudioRenderer />
        {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
        <ControlBar  />
      </LiveKitRoom>
      : <div className="w-full h-full flex flex-col items-center justify-center">
        <h5 className="text-xl">Start Chatting</h5>
        <Button variant={"primary"}  className="block mx-auto mt-2 mb-10" onClick={() => setActive(true)}>Join</Button>
      </div>
    }
    </>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile  />
    </GridLayout>
  );
}
