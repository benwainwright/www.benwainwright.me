---
slug: "dns-cheat-sheet"
date: "2021-07-18"
last-modified: "2021-07-18"
title: "DNS Cheat Sheet"
description: "A summary of all the basic stuff you need to know to work with DNS as a web engineer"
published: false
---

The DNS system is one of the backbones of the internet stack. Its the
mysterious system of chained servers which allows your browser to take a human
readable domain name like `https://benwainwright.me` and return a numerical IP
address that it can use to connect to the desired host.

As a web engineer, I've tended to struggled to retain in my head how it works,
as its quite "fire and forget"; you set it up once and then it just works so you
can stop thinking about it until you need to do something like moving to a different
DNS provider, or set up a subdomain.

In order to combat that, I'm writing this post as a summary of all the salient
points an IT professional working in the web space should probably know. Its
mostly a reference guide for me, but hopefully it can help others who have the
same problem in the future.

# Abbreviations

- IANA - Internet Assigned Numbers Authority, a department of...
- ICANN - Internet Corporation for Assigned Numbers
- DNS - Domain Name System
- TLD - Top Level Domain (After final dot)
- 2LD - Second Level Domain (To the left of TLD)
- URL - Uniform Resource Locator (Full web address for a site including protocol, path and other factors)

# Anatomy of a URL and how it relates to DNS

A URL consists of a string like
`https://www.foo.co.uk/path/to/resource?also=has&a=query&string`. This tells us

- Where to find the remote host that will serve the request: `www.foo.co.uk`
- What resource is going to be requested from that host:
  `/path/to/resource?also=has&a=query&string`
- What protocol it will be served with: `https://`

The DNS system concerns itself with the first one _only_ - everything else
describes the communication between the browser and that host, and is out of
scope for this post.

`www.foo.co.uk` breaks down into

- `uk` - TLD (Top Level Domain)
- `co` - 2LD (Second Level Domain)
- `foo` - 3LD (Third level Domain)
- `www` - 4LD (Fourth level Domain)

# TL;DR

- "Domain name registries" maintain a database of who owns which domain. There
  is one registry per TLD.
- Sale and assignment of domains is delegated to "Registrars".
- Mapping from domain name to IP address is maintained by "Name Servers" (NS)
- Mapping from domain name to NS is maintained by registrars
- Retrieving the IP address involves a recursive set of queries that eventually
  result in identifying the NS that contains the IP address you require

# DNS Query

A DNS query follows approximately this pattern from the point of view of the
client

- Check the browser DNS cache
- Check the OS level DNS cache
- Query a "Recursive DNS Resolver" provided by a your ISP

Satisfaction of the DNS request is then delegated to the resolver that will then
perform the following for a given query to `www.foo.co.uk`:

- Return an IP address record (A Record) for `www.foo.co.uk` from cache or
- Directly query the NS that contains the actual A Record for `www.foo.co.uk` if it is
  contained in cache (this server is known as the "Authoritative NS") or
- Directly query the NS for `foo.co.uk` if it is contained in
