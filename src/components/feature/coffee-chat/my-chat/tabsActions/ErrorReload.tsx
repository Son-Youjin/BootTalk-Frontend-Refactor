export default function ErrorReload() {
  return (
    <div className="mt-4 p-4 bg-red-50 rounded-lg text-center">
      <p className="text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</p>
      <button
        className="mt-2 text-sm text-blue-500 hover:underline"
        onClick={() => window.location.reload()}
      >
        새로고침
      </button>
    </div>
  );
}
