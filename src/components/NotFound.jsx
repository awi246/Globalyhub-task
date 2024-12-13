
// eslint-disable-next-line react/prop-types
const NotFound = ({ searchedName }) => {
  return (
    <div className="flex items-center justify-center bg-white h-[70dvh] w-full p-4">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src="https://sm.ign.com/ign_in/news/t/the-pokemo/the-pokemon-company-explains-how-the-heck-pokemon-sleep-actu_rw5c.jpg"
          alt="No Pokemon Found"
          className="w-64 h-auto mb-4 md:mb-0 md:mr-4 rounded shadow"
        />
        <p className="text-xl text-gray-800">
          No Pokemon found named "<strong>{searchedName}</strong>"
        </p>
      </div>
    </div>
  );
};

export default NotFound;
