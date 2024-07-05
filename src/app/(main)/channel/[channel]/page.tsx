export default function Page({ params }: { params: { channel: string } }) {
    return <div>My Channel : {params.channel}</div>
  }