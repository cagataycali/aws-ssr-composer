const Button = (await import("app2/Button")).default;

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.chucknorris.io/jokes/random`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return { props: { data } }
}

const Page = ({ data }) => {
  return (
    <div>
      Cagatay CALI
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <br />
      <h1>Server Side Rendering:</h1>
      <hr />
      <Button {...data} />
      <br />
      <h1>Client Side Rendering:</h1>
      <hr />
      <Button />
    </div>
  );
};

export default Page;
