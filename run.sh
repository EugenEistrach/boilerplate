#!/bin/bash -e

pushd ./drizzle/migrate
pnpm db:migrate
popd

pnpm start
