export default function LoginRequired() {
  return (
    <div className="rounded-2xl px-6 py-10 text-center">
      <h2 className="mt-5 text-lg font-semibold text-gray-900">
        로그인 후 이용할 수 있어요
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        커피챗 신청 및 내역 확인은
        <br />
        로그인 후 이용할 수 있습니다.
      </p>

      <button
        type="button"
        className="mt-6 w-full rounded-lg bg-gray-800 px-4 py-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      >
        로그인하기
      </button>
    </div>
  );
}
