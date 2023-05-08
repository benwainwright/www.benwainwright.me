# www.benwainwright.me

This repository contains the source code for my personal website.
(https://www.benwainwright.me).

It is a statically Gatsby application written in TypeScript and hosted by AWS
S3. In order to keep the pages performant but provide myself with a simple
editing UI, I'm working towards an architecture where blog posts are generated
statically at build time based on data from an API (see below). The admin area doesn't need
to be as fast, so it interfaces with the API directly.

![Architecture diagram](./docs/diagrams_image.png)
