const parseAtUri = (atUri: string) => {
  let cleanedAtUri = atUri.replace("at://", "");

  const splitUri = cleanedAtUri.split("/");

  const did = splitUri.at(0) ?? "";
  const collection = splitUri.at(1) ?? "";
  const rkey = splitUri.at(2) ?? "self";

  return { did, collection, rkey };
};

export default parseAtUri;
