# www.benwainwright.me

![build status](https://img.shields.io/github/actions/workflow/status/benwainwright/www.benwainwright.me/main-pipeline.yaml)

This repository contains the source code for my personal website.
(https://www.benwainwright.me).

The site is a statically generated [Gatsby](https://www.gatsbyjs.com/) application written in TypeScript and hosted by AWS
S3.

The architecture of the site is designed so that I have a responsive admin area,
but the blog posts themselves are super fast. The admin area is a live CRUD
application which reads and writes data into a DynamoDB backed database. This
database is then used when the site deploys to statically generate new pages.

This means that there is a bit of acceptable latency between making changes and
seeing those changes live; but the site itself will always be predictable and
low latency as it is a static website.

![Architecture diagram](./docs/diagrams_image.png)
