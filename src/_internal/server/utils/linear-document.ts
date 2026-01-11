import { type Main as PubLeafletBlocksText } from "@/../lex-api/types/pub/leaflet/blocks/text";
import {
  type Main as PubLeafletPagesLinearDocument,
  type Block as PubLeafletPagesLinearDocumentBlock,
} from "@/../lex-api/types/pub/leaflet/pages/linearDocument";

export const createLinearDocument = (
  description: string
): PubLeafletPagesLinearDocument => {
  return {
    $type: "pub.leaflet.pages.linearDocument",
    blocks: [
      {
        $type: "pub.leaflet.pages.linearDocument#block",
        block: {
          $type: "pub.leaflet.blocks.text",
          plaintext: description,
        } satisfies PubLeafletBlocksText,
      } satisfies PubLeafletPagesLinearDocumentBlock,
    ],
  } satisfies PubLeafletPagesLinearDocument;
};
