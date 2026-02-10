export default function ProfileImage({ avatarUrl }: { avatarUrl?: string }) {
  return (
    <>
      <div
        className={`flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-none`}
      >
        <img
          src={avatarUrl}
          alt="My avatar"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </>
  );
}
