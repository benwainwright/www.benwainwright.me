---
slug: "a-modern-vim-setup"
date: "2021-06-28"
last_modified: "2021-06-28"
title: "A Modern VIM Setup"
description: "Things from my vim configuration that I couldn't live without"
published: false
---

I've been using Vim professionally for about four years now. I've tried other
things, and much as I'd like to use something a little prettier (I'm looking at
you [Visual Studio Code](https://code.visualstudio.com)), I'm just not as fast
with anything else. It's been four years of tweaking, but I'm starting to get to
a point where my `.vimrc` doesn't change (that much) and I wanted to share some
of the parts of my setup that allow vim to compete as a modern IDE in 2021.

# Code Intelligence

I've tried a lot of different things to try to emulate the seamless
auto-completion and diagnostic annotations of VSCode. It's only really since
discovering the rather unfortunately named [coc.nvim](https://github.com/neoclide/coc.nvim)
that I feel that the battle has now well and truly been won. Move over [deoplete](https://github.com/Shougo/deoplete.nvim), [ale](https://github.com/dense-analysis/ale), [youcompleteme](https://github.com/ycm-core/YouCompleteMe), [asyncomplete](https://github.com/ycm-core/YouCompleteMe) etc. Everything else is _just too buggy, hard to get working, and easy to break_ compared to coc.

It works by allowing you to use extensions already written for VSCode, either
unchanged or with small modifications, directly in Vim. This is a huge
revolution because

- There are loads of them
- Most of the time, they just work
- It allows you to do almost everything you can do in VSCode, plus all the
  extra things you can do because you are in Vim

It is _so_ good that it appears to have finally won the editor wars for
me. I've spent the last four years going through periods of trying Emacs
(because I like brackets, I guess), VSCode, and other lesser-known alternatives,
but it was `coc.nvim` that has helped me "settle down"

## Tips

- Use [coc-marketplace](https://github.com/fannheyward/coc-marketplace) to find new extensions, or just try installing VSCode plugins directly using `:CocInstall <github-url-of-vscode-extension>`
- Use the `.vimrc` config provided on the plugin homepage and customise
  over time. Just like VSCode, `coc.nvim` gives you _a lot more power_ than
  is initially available
- Type `:CocCommand<CR>` to get a list of all the different commands available
  to you. You can then map `:CocCommand <command>` to a keyboard shortcut
- Set `g:coc_global_extensions` containing a list of the extensions you'd like
  to install. If you use vim on another machine, they will be
  automatically downloaded for you

## My Favorite Extensions

- [coc-tabnine](https://github.com/neoclide/coc-tabnine) - if code completion
  wasn't already clever enough. Tabnine quite regularly guesses what I'm
  about to type in a way that can only be described as creepy.
- [coc-tsserver](https://github.com/neoclide/coc-tsserver) - I'm a
  TypeScript/JavaScript developer, so obviously
- [coc-explorer](https://github.com/weirongxu/coc-explorer) - coc based
  NERDTree replacement

- [coc-eslint](https://github.com/neoclide/coc-eslint) - Editor annotations
  from the de-facto standard JavaScript/TypeScript static analysis engine

# Project Navigation

At any one time, I usually have anything from 10-50 repositories checked out
on my hard disk, and it's quite likely that I'll want to make changes to several
of them in quick succession, which requires a lot of very fast context
switching and navigation between files. I've solved this problem by writing a
plugin called [fzf-project](https://github.com/benwainwright/fzf-project) on top of [fzf.vim](https://github.com/junegunn/fzf.vim) that allows me to

- Specify a list of folders that contain repositories
- Quickly switch the working directory to the root of any one of these repositories using a `fzf` based fuzzy finder
- Immediately drill down to a file within one of these folders using
  another fuzzy finder

# Debugging Slow Plugins

One of the benefits of using vim is the speed at which you can get in the
zone. Because of how insanely customisable it is, it is very easy to bloat
your config in a way that slows it down. To drill down to the
source of the problem, you <em>can</em> open vim with `vim --startuptime time.log` and analyse the output. A better option that is now a permanent
part of my setup just in case I add something slow is
[vim-startuptime](https://github.com/tweekmonster/startuptime.vim). This takes
multiple samples to make sure it gets accurate results and then displays the 10
slowest plugins in your config.
