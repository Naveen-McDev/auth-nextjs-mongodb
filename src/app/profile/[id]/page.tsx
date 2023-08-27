export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-3xl mb-5">Profile</h1>
      <p className="text-xl mb-5">
        Profile Page of <span className="font-bold">{params.id}</span>
      </p>
    </div>
  );
}
