import Link from "next/link";
import React from "react";
import MainContainer from "./components/MainContainer";

const Users = ({ users }: any) => {
  return (
    <MainContainer>
      <h1> Список юзеров</h1>
      <ul>
        {users?.map((user: any) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </MainContainer>
  );
};
export default Users;

export async function getStaticProps(context: any) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return {
    props: { users },
  };
}
