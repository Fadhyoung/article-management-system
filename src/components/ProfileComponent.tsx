import Button from "@/components/Button";
import Typography from "@/components/Typography";
import { Profile } from "@/types/User";

interface ProfileComponentProps {
  data: Profile | undefined;
  handleBack: () => void;
}

const ProfileComponent = ({ data, handleBack }: ProfileComponentProps) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-white">
      <Typography type="cardtitle">User Profile</Typography>
      <div className="w-20 h-20 rounded-full bg-gray-300"></div>
      <div className="w-full flex flex-col gap-5 items-center justify-center">
        <div className="w-full px-5 py-2 flex gap-2 justify-between border rounded-md bg-background">
          <Typography type="body">Username :</Typography>
          {data?.username || "N/A"}
        </div>
        <div className="w-full px-5 py-2 flex gap-2 justify-between border rounded-md bg-background">
          <Typography type="body">Password :</Typography>
          {data?.id || "N/A"}
        </div>
        <div className="w-full px-5 py-2 flex gap-2 justify-between border rounded-md bg-background">
          <Typography type="body">Role :</Typography>
          {data?.role || "N/A"}
        </div>
      </div>
      <Button onClick={handleBack} variant="primary" radius="lg" className="w-full">
        Back To Dashboard
      </Button>
    </div>
  );
};

export default ProfileComponent;
