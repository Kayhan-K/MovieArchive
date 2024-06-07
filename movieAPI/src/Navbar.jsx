function Navbar({ changeUserInput, clickMovieBtn, clickSeriesBtn }) {
  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col gap-5 mb-8 w-justify-center w-8/12 items-center">
        <label
          htmlFor="userSearch"
          className="relative w-full block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
        >
          <input
            type="text"
            onChange={(e) => changeUserInput(e.target.value)}
            id="userSearch"
            placeholder="Email"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />

          <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
            Search
          </span>
        </label>
        <div className="flex gap-10 w-full justify-center">
          <a
            className="inline-block  rounded text-center flex-1 bg-indigo-600 sm:px-8 px-6  py-3  font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            href="#"
            onClick={clickMovieBtn}
          >
            Movie
          </a>
          <a
            className="inline-block rounded text-center flex-1 bg-indigo-600 sm:px-8 px-6 py-3  font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            href="#"
            onClick={clickSeriesBtn}
          >
            Series
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
