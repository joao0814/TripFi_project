export default function Head() {
  return (
    <>
      <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={process.env.NEXT_PUBLIC_APP_DESCRIPTION} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
