import ChatHeader from "@/components/Custom/chat/ChatHeader";

export default function Page({ params }: { params: { channel: string } }) {
  return (
    <>
      <div className="w-full h-full">
        <ChatHeader />
      </div>
    </>
  );
}
