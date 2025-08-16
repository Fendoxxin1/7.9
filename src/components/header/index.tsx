import { memo } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">AvtoMarket</h1>
        <nav className="flex gap-6">
          <NavLink to="/" className="hover:text-green-200">
            Bosh sahifa
          </NavLink>
          <NavLink to="/car" className="hover:text-green-200">
            Avtomobillar
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
