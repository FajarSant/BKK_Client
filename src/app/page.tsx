import CardPost from "./Components/CardPost";
import NavigasiBar from "./Components/NavigasiBar";

export default function Home() {
  return (
    <div className="">
      <NavigasiBar />
      <div className="mt-32">
        <CardPost/>
      </div>
    </div>
  );
}
