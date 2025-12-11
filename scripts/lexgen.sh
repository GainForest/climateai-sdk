bun run scripts/lexgen-helper.ts \
  "hypercertsLexiconsSource=./../hypercerts-lexicon/lexicons" \
  "gainforestLexiconsSource=./../lexicons/lexicons"
bunx @atproto/lex-cli gen-api ./lex-api \
  ./lexicons/* ./lexicons/*/* ./lexicons/*/*/* ./lexicons/*/*/*/* ./lexicons/*/*/*/*/* ./lexicons/*/*/*/*/*/*
bun run scripts/lex-api-mod.ts