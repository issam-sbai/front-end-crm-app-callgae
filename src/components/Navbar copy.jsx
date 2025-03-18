import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="https://flowbite.com/">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold">Flowbite</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="dropdown ms-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="userMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              {/* <img className="w-8 h-8 rounded-circle" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" /> */}
              bb
            </button>
            <ul className="dropdown-menu" aria-labelledby="userMenuButton">
              <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
              <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
              <li><Link className="dropdown-item" to="/earnings">Earnings</Link></li>
              <li><Link className="dropdown-item" to="/signout">Sign out</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
