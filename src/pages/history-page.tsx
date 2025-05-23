import { useSearchHistory } from "@/hooks/use-search-history";

export default function HistoryPage() {
  const { history } = useSearchHistory();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search History</h1>
      {history.length === 0 ? (
        <p className="text-gray-500">No search history available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Latitude</th>
                <th className="p-2 border">Longitude</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr
                  key={i}
                  className="text-center border-t dark:border-gray-700"
                >
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.lat}</td>
                  <td className="p-2 border">{item.lon}</td>
                  <td className="p-2 border">
                    {new Date(item.searchedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
