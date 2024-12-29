import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="text-2xl font-bold text-brandgray">
      Brand<span className="text-brandpink">Collab</span>
    </Link>
  );
};