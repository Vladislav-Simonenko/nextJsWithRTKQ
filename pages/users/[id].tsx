import { useRouter } from "next/router";
import MainContainer from "../components/MainContainer";

export default function ({ user }: any) {
  return (
    <MainContainer>
      <>
        <div>ПолЬзователь c id {user.id}</div>
        <div>ПолЬзователь c именем {user.name}</div>
        <div>ПолЬзователь c id {user.id}</div>
        <div>ПолЬзователь c id {user.id}</div>
      </>
    </MainContainer>
  );
}
export async function getServerSideProps({ params }: any) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  );
  const user = await response.json();

  return {
    props: { user },
  };
}
