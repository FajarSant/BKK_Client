import CardPost from "./Components/CardPost";
import NavigasiBar from "./Components/NavigasiBar";
import Search from "./Components/Search";

export default function Home() {
  return (
    <div className="">
      <NavigasiBar />
      <div className="">
        <Search />
        <CardPost />
      </div>
    </div>
  );
}
