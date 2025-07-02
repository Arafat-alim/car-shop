const getbaseUrl = () => {
  const environment = process.env.NODE_ENV;

  const baseUrl =
    environment === "development"
      ? `${process.env.NEXT_PUBLIC_DEV_URL}/api`
      : `${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  return baseUrl;
};

export { getbaseUrl };
