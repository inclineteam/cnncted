import { useLocation } from "@remix-run/react";
import { Link } from "@remix-run/react";

const TabItem = ({ isActive, setTab, name }) => {
  const path = useLocation();

  return (
    <button
      onClick={setTab}
      className={`text-center min-w-[6rem] flex-1 text-sm w-full py-1.5 font-semibold rounded-md ${
        isActive
          ? "shadow-purple-200 bg-purple-500 text-white"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800"
      }`}
    >
      {name}
    </button>
  );
};

export default TabItem;
