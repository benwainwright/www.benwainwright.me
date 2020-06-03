import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as WwwDotBenwainwrightDotMe from '../lib/www-dot-benwainwright-dot-me-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new WwwDotBenwainwrightDotMe.WwwDotBenwainwrightDotMeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
