#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { WwwDotBenwainwrightDotMeStack } from "../lib/www-dot-benwainwright-dot-me-stack";

const app = new cdk.App();
new WwwDotBenwainwrightDotMeStack(app, "WwwDotBenwainwrightDotMeStack", {
  env: {
    region: "us-west-2",
    account: "661272765443",
  },
});
