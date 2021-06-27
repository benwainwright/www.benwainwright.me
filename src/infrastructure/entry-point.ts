#!/usr/bin/env node
import "source-map-support/register"
import * as cdk from "aws-cdk-lib"
import { WwwDotBenwainwrightDotMeStack } from "./www-dot-benwainwright-dot-me-stack"

const app = new cdk.App()
new WwwDotBenwainwrightDotMeStack(app, "WwwDotBenwainwrightDotMeStack", {
  env: {
    region: "us-east-1",
    account: "661272765443",
  },
})
