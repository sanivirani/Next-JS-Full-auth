// passing data form id to profile passing [params:any]

export default function UserProfilePage({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="mb-4 text-2xl">UserProfile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-red-600 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
