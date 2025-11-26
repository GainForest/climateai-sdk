bunx @atproto/lex-cli gen-api ./lex-api \
  ./../hypercerts-lexicon/app/certified/*.json \
  ./../hypercerts-lexicon/org/hypercerts/*.json \
  ./../hypercerts-lexicon/org/hypercerts/*/*.json \
  ./../lexicons/*/*/*/*.json
bun run scripts/lex-api-mod.ts