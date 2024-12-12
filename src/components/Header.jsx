import { Link } from 'react-router-dom';

const Header = () => (
  <header
    className="bg-cover bg-center text-white  flex justify-between items-center"
    style={{
      backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      minHeight: '100px',
    }}
  >
    <div className="container mx-auto p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        Globaly task
      </Link>
    </div>
  </header>
);

export default Header;
