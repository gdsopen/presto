mkdir -p scripts/bin

gh api -H "Accept: application/vnd.github.raw" -H "X-GitHub-Api-Version: 2022-11-28" /repos/mizphses/aeromate-backend/contents/docs/openapi.yaml > scripts/bin/openapi.yml

npx openapi-typescript ./scripts/bin/openapi.yml -o ./src/api/generated/types.ts
