#!/bin/bash

echo "Removing ./node_modules";
rm -rf ./node_modules;

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Removing ./ios/build";
  rm -rf ./ios/build;

  echo "Removing ./ios/Pods";
  rm -rf ./ios/Pods;

  echo "Removing DerivedData ~/Library/Developer/Xcode/DerivedData/*";
  rm -rf ~/Library/Developer/Xcode/DerivedData/*

  echo "Removing Archives ~/Library/Developer/Xcode/Archives/*";
  rm -rf ~/Library/Developer/Xcode/Archives/*
fi

echo "Removing Android Build ./android/build/*";
rm -rf ./android/build/*

echo "Removing Android App Build ./android/app/build/*";
rm -rf ./android/app/build/*

echo "Running Yarn";
yarn

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Running Pod Install"
  cd ios; pod install; cd ..
fi

echo "Running npx react-native start --reset-cache";
npx react-native start --reset-cache

echo "Finish with success";
