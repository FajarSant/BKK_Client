"use client"
import CardPost from "./Components/Cardpost";
import NavigasiBar from "./Components/NavigasiBar";


export default function Home() {
  const postData = {
    imageSrc: 'https://example.com/image.jpg',
    name: 'Nama Post',
    description: 'Deskripsi singkat dari post.',
    hastag: 'Deskripsi singkat dari post.',
  };
  return (
    <div className="">
      <NavigasiBar />
      <div className="mt-32">
      <CardPost postData={postData} />
      </div>
    </div>
  );
}
