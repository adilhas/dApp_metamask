// src/components/shared/SkeletonTable.tsx

const SkeletonTable = () => {
  const skeletonRows = Array.from({ length: 20 });

  return (
    <div className="overflow-x-auto w-full">
      <table className="table max-w-80 mx-auto border border-neutral-700">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, index) => (
            <tr key={index} className="animate-pulse">
              <th className="text-neutral-400">{index + 1}</th>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-neutral rounded-full" />
                  <div className="h-4 bg-neutral w-24 rounded" />
                </div>
              </td>
              <td>
                <div className="h-4 bg-neutral w-10 rounded" />
              </td>
              <td>
                <div className="h-4 bg-neutral w-20 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
