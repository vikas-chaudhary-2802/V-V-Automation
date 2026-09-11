import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Machines", path: "/products" },
  { label: "CNC Parts", path: "/parts" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="container-section header-inner">
        <Link to="/" className="brand" aria-label="V & V Automation home">
          <span className="brand-mark"><img src={logo} alt="" /></span>
          <span className="brand-copy">
            <strong>V&amp;V Automation</strong>
            <small>Precision in motion</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href="tel:+919313521824" aria-label="Call +91 93135 21824">
            <Phone size={16} />
            <span>+91 93135 21824</span>
          </a>
          <Link className="button button-accent header-quote" to="/contact">
            Request a quote <ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="container-section">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {item.label}
              </NavLink>
            ))}
            <a href="tel:+919313521824"><Phone size={17} /> +91 93135 21824</a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
