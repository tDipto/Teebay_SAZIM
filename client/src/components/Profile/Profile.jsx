import { useQuery } from "@apollo/client";
import React from "react";
import { Card, Menu } from "react-daisyui";
import { GET_USER_QUERY } from "../../graphql/queries/userQueries/userQueries";
const Profile = () => {
  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    fetchPolicy: "network-only",
  });

  return (
    <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-5 mt-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Menu>
            <Menu.Item>
              <div>
                <svg
                  class="h-4 fill-current text-green-700 pr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
                {data?.getCurrentUser?.name}
              </div>
            </Menu.Item>
            <Menu.Item>
              <div>
                <svg
                  class="h-4 fill-current text-gray-700 pr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                {data?.getCurrentUser?.email}
              </div>
            </Menu.Item>
          </Menu>
        </>
      )}
    </Card>
  );
};

export default Profile;
