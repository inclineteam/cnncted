const PinnedLinks = ({ links }) => {
  return (
    <>
      <div className="px-3 mb-2 flex items-center space-x-3">
        <p className="font-medium text-neutral-600">Pinned links</p>
      </div>

      {links.length > 0 ? (
        <div>Has links</div>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-6xl font-extrabold text-neutral-700">0</h1>
          <p className="text-neutral-600 mb-4">Pinned links</p>
        </div>
      )}
    </>
  );
};

export default PinnedLinks;
