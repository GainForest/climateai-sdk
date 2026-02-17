import type {
  LinearDocument,
  LinearDocumentBlock,
  BlockContent,
  ListItem,
  ListItemContent,
} from "./index";
import type {
  PubLeafletPagesLinearDocument,
  PubLeafletBlocksText,
  PubLeafletBlocksHeader,
  PubLeafletBlocksImage,
  PubLeafletBlocksBlockquote,
  PubLeafletBlocksCode,
  PubLeafletBlocksUnorderedList,
  PubLeafletBlocksHorizontalRule,
  PubLeafletBlocksIframe,
  PubLeafletBlocksMath,
  PubLeafletBlocksWebsite,
  PubLeafletBlocksBskyPost,
  PubLeafletBlocksPage,
  PubLeafletBlocksPoll,
  PubLeafletBlocksButton,
} from "@/../lex-api";
import { toBlobRef, type BlobRefGenerator } from "../blobref";

/**
 * Converts a Zod-validated LinearDocument input to the lex-api LinearDocument type.
 * Handles BlobRefGenerator → BlobRef conversion for image and website blocks.
 */
export const toLinearDocument = (
  input: LinearDocument
): PubLeafletPagesLinearDocument.Main => {
  return {
    $type: "pub.leaflet.pages.linearDocument",
    id: input.id,
    blocks: input.blocks.map(toLinearDocumentBlock),
  };
};

const toLinearDocumentBlock = (
  block: LinearDocumentBlock
): PubLeafletPagesLinearDocument.Block => {
  const convertedBlock = convertBlockContent(block.block);
  return {
    $type: "pub.leaflet.pages.linearDocument#block",
    block: convertedBlock as PubLeafletPagesLinearDocument.Block["block"],
    alignment: block.alignment,
  };
};

type LexBlockContent =
  | PubLeafletBlocksText.Main
  | PubLeafletBlocksHeader.Main
  | PubLeafletBlocksImage.Main
  | PubLeafletBlocksBlockquote.Main
  | PubLeafletBlocksCode.Main
  | PubLeafletBlocksUnorderedList.Main
  | PubLeafletBlocksHorizontalRule.Main
  | PubLeafletBlocksIframe.Main
  | PubLeafletBlocksMath.Main
  | PubLeafletBlocksWebsite.Main
  | PubLeafletBlocksBskyPost.Main
  | PubLeafletBlocksPage.Main
  | PubLeafletBlocksPoll.Main
  | PubLeafletBlocksButton.Main;

const convertBlockContent = (
  content: BlockContent
):
  | PubLeafletBlocksText.Main
  | PubLeafletBlocksHeader.Main
  | PubLeafletBlocksImage.Main
  | PubLeafletBlocksBlockquote.Main
  | PubLeafletBlocksCode.Main
  | PubLeafletBlocksUnorderedList.Main
  | PubLeafletBlocksHorizontalRule.Main
  | PubLeafletBlocksIframe.Main
  | PubLeafletBlocksMath.Main
  | PubLeafletBlocksWebsite.Main
  | PubLeafletBlocksBskyPost.Main
  | PubLeafletBlocksPage.Main
  | PubLeafletBlocksPoll.Main
  | PubLeafletBlocksButton.Main => {
  // Handle image blocks - convert BlobRefGenerator to BlobRef
  if (content.$type === "pub.leaflet.blocks.image") {
    const converted: PubLeafletBlocksImage.Main = {
      $type: "pub.leaflet.blocks.image",
      image: toBlobRef(content.image as BlobRefGenerator),
      alt: content.alt,
      aspectRatio: content.aspectRatio,
    };
    return converted;
  }

  // Handle website blocks - convert optional previewImage
  if (content.$type === "pub.leaflet.blocks.website") {
    const converted: PubLeafletBlocksWebsite.Main = {
      $type: "pub.leaflet.blocks.website",
      src: content.src,
      previewImage: content.previewImage
        ? toBlobRef(content.previewImage as BlobRefGenerator)
        : undefined,
      title: content.title,
      description: content.description,
    };
    return converted;
  }

  // Handle unordered list - recursively convert list items with images
  if (content.$type === "pub.leaflet.blocks.unorderedList") {
    const converted: PubLeafletBlocksUnorderedList.Main = {
      $type: "pub.leaflet.blocks.unorderedList",
      children: content.children.map(convertListItem),
    };
    return converted;
  }

  // All other blocks - ensure $type is set as required string (not optional)
  if (content.$type === "pub.leaflet.blocks.text") {
    const converted: PubLeafletBlocksText.Main = {
      ...content,
      $type: "pub.leaflet.blocks.text" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.header") {
    const converted: PubLeafletBlocksHeader.Main = {
      ...content,
      $type: "pub.leaflet.blocks.header" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.blockquote") {
    const converted: PubLeafletBlocksBlockquote.Main = {
      ...content,
      $type: "pub.leaflet.blocks.blockquote" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.code") {
    const converted: PubLeafletBlocksCode.Main = {
      ...content,
      $type: "pub.leaflet.blocks.code" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.horizontalRule") {
    const converted: PubLeafletBlocksHorizontalRule.Main = {
      $type: "pub.leaflet.blocks.horizontalRule" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.iframe") {
    const converted: PubLeafletBlocksIframe.Main = {
      ...content,
      $type: "pub.leaflet.blocks.iframe" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.math") {
    const converted: PubLeafletBlocksMath.Main = {
      ...content,
      $type: "pub.leaflet.blocks.math" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.bskyPost") {
    const converted: PubLeafletBlocksBskyPost.Main = {
      ...content,
      $type: "pub.leaflet.blocks.bskyPost" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.page") {
    const converted: PubLeafletBlocksPage.Main = {
      ...content,
      $type: "pub.leaflet.blocks.page" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.poll") {
    const converted: PubLeafletBlocksPoll.Main = {
      ...content,
      $type: "pub.leaflet.blocks.poll" as const,
    };
    return converted;
  }
  if (content.$type === "pub.leaflet.blocks.button") {
    const converted: PubLeafletBlocksButton.Main = {
      ...content,
      $type: "pub.leaflet.blocks.button" as const,
    };
    return converted;
  }

  // This should never happen due to discriminated union, but TypeScript needs it
  const exhaustiveCheck: never = content;
  throw new Error(`Unhandled block type: ${JSON.stringify(exhaustiveCheck)}`);
};

const convertListItemContent = (
  content: ListItemContent
):
  | PubLeafletBlocksText.Main
  | PubLeafletBlocksHeader.Main
  | PubLeafletBlocksImage.Main => {
  if (content.$type === "pub.leaflet.blocks.image") {
    const converted: PubLeafletBlocksImage.Main = {
      $type: "pub.leaflet.blocks.image",
      image: toBlobRef(content.image as BlobRefGenerator),
      alt: content.alt,
      aspectRatio: content.aspectRatio,
    };
    return converted;
  }

  if (content.$type === "pub.leaflet.blocks.text") {
    const converted: PubLeafletBlocksText.Main = {
      ...content,
      $type: "pub.leaflet.blocks.text" as const,
    };
    return converted;
  }

  if (content.$type === "pub.leaflet.blocks.header") {
    const converted: PubLeafletBlocksHeader.Main = {
      ...content,
      $type: "pub.leaflet.blocks.header" as const,
    };
    return converted;
  }

  // Exhaustive check
  const exhaustiveCheck: never = content;
  throw new Error(`Unhandled list item content type: ${JSON.stringify(exhaustiveCheck)}`);
};

const convertListItem = (
  item: ListItem
): PubLeafletBlocksUnorderedList.ListItem => {
  const convertedContent = convertListItemContent(item.content);

  return {
    $type: "pub.leaflet.blocks.unorderedList#listItem",
    content: convertedContent as PubLeafletBlocksUnorderedList.ListItem["content"],
    children: item.children?.map(convertListItem),
  };
};
