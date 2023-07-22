import React from "react";
import { getSession } from "next-auth/react";
import Layout from "../../components/profile/layout";

export default function profile({ user, tab }) {
  return (
    <Layout session={user} tab={tab}>
      Anshu is handsome
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const { query, req } = ctx;
  const session = await getSession({ req });
  const tab = query.tab || 0;
  return {
    props: {
      user: session,
      tab,
    },
  };
}
