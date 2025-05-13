#!/bin/bash

cd frontend || exit
npm run build
cd ..
rm -r backend/public
cp -r frontend/build backend/public
npx vercel deploy --prod
