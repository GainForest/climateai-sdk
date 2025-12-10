bunx @atproto/lex-cli gen-api ./lex-api \
  ./lexicons/* ./lexicons/*/* ./lexicons/*/*/* ./lexicons/*/*/*/* ./lexicons/*/*/*/*/* ./lexicons/*/*/*/*/*/*
bun run scripts/lex-api-mod.ts