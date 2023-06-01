const Tab = ({ children }) => {
  return (
    <div className="overflow-x-auto sticky space-x-1 top-0 flex py-2 bg-white border-b border-slate-100">
      {children}
    </div>
  );
};

export default Tab;
