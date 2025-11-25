const parseAtUri = (atUri: string) => {
  const cleanedAtUri = atUri.replace("at://", "");
  const [did, ...rest] = cleanedAtUri.split("/");
  let rkey = rest.at(-1) ?? "";
  return { did, rkey };
};

export default parseAtUri;
