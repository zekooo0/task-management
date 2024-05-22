// "use client";

import { getProfile } from "../actions/profile";

const page = async () => {
  const profile = await getProfile();
  return (
    <div className="container">
      <ul className="flex flex-col space-y-4">
        <li>url: {profile.url}</li>
        <li>photo: {profile.photo}</li>
        <li>name: {profile.name}</li>
        <li>title: {profile.title}</li>
        <li>address: {profile.address}</li>
      </ul>
    </div>
  );
};

export default page;
