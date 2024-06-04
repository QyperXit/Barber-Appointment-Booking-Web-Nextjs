import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex items-center justify-center h-dvh">
    <UserProfile path="/user-profile" />;
  </div>
);

export default UserProfilePage;
