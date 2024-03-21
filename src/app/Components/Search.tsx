
const Search = () => {
  return (
    <div className="container h-[350px] sm:h-[450px]" style={{backgroundImage: 'url(https://2.bp.blogspot.com/-x3TpSydwjqQ/T2Id6JzchHI/AAAAAAAAADk/c_MeEiSrQbM/s1600/DSC01280.JPG)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="flex flex-col justify-center items-center h-full text-black">
        <h1 className="font-extrabold text-2xl text-center mt-5">
          Temukan pekerjaan menarik dan fleksibel yang <br/> sesuai dengan Anda.
        </h1>
        <h2 className="text-center">
          Ayo bergabung dan raih kesempatan karier terbaik!
        </h2>
        <div className="flex justify-center mt-4">
          <input
            className="w-1/2 px-4 py-2 mr-2 rounded-lg border-none bg-white text-gray-800 focus:outline-none"
            type="search"
            placeholder="Cari pekerjaan..."
          />
          <button className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 focus:outline-none">
            Cari
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
