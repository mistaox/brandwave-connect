import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="text-xl font-bold">
        Brand<span className="text-brandpink">Collab</span>
      </span>
    </Link>
  );
};