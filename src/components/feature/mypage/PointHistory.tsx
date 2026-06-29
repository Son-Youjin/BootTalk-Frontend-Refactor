import { useGetPointHistory } from "@/hooks/my-page/useGetPointHistory";

const PointHistory = () => {
  const { pointHistory, isPointHistoryLoading, isPointHistoryError } =
    useGetPointHistory();

  if (isPointHistoryLoading) return <div>로딩 중...</div>;

  if (isPointHistoryError)
    return <div>포인트 내역을 불러오는데 실패했습니다.</div>;

  // 데이터가 없는 경우 처리
  if (!pointHistory || pointHistory.length === 0)
    return <div>포인트 내역이 없습니다.</div>;

  console.log(pointHistory);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      {/* 현재 포인트 */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-4">
        <span className="text-sm font-medium text-gray-500">현재 포인트</span>

        <span className="text-2xl font-bold tracking-tight text-amber-900">
          {pointHistory[0].currentPoint}P
        </span>
      </div>

      {/* 포인트 내역 */}
      <div className="px-2">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-200 text-[11px] font-semibold text-gray-500">
              <th className="pl-2 pr-2 py-4 text-left">이벤트</th>
              <th className="px-2 py-4 text-left">날짜</th>
              <th className="px-2 py-4 text-right">변동</th>
              <th className="pl-2 pr-2 py-4 text-right">잔여</th>
            </tr>
          </thead>

          <tbody>
            {pointHistory.map((point) => (
              <tr
                key={point.pointHistoryId}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="pl-2 pr-2 py-4 text-[13px] font-medium text-gray-900">
                  {point.eventTypeName}
                </td>

                <td className="px-2 py-4 text-[11px] text-gray-500">
                  {new Date(point.createdAt).toLocaleDateString("ko-KR")}
                </td>

                <td
                  className={`px-2 py-4 text-right text-[13px] font-semibold ${
                    point.pointTypeName.includes("적립") ||
                    point.pointTypeName.includes("환불")
                      ? "text-blue-600"
                      : "text-red-500"
                  }`}
                >
                  {(point.pointTypeName.includes("적립") ||
                  point.pointTypeName.includes("환불")
                    ? "+"
                    : "-") + `${point.changedPoint}P`}
                </td>

                <td className="pl-2 pr-2 py-4 text-right text-[13px] font-medium text-gray-700">
                  {point.currentPoint}P
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PointHistory;
