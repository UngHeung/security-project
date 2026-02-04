export default function ProfileButton({
  size,
  avatarUrl,
}: {
  size: number;
  avatarUrl?: string;
}) {
  return (
    <>
      <div
        className={`flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border-none`}
      >
        <img
          src={avatarUrl}
          alt="My avatar"
          width={size}
          height={size}
          className="rounded-full"
        />
      </div>
    </>
  );
}
