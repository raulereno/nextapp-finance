import { useSession } from "next-auth/react";

export default function PersonalFinances() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Personal Finances</h1>
    </div>
  );
}
