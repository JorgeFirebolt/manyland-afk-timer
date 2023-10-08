# Manyland AFK Timer

- A manyland mod to implement a time elapsed count with the next format `hh-mm-ss`, so other players are aknowledge of how long you've been AFK.
- Easy to use and deploy. (see on [how to deploy the script on my browser](./#deployment))

## Deployment

There's 2 easy ways to deploy your script on your Manyland client _(ommitting just copypasting the source code on console or using Snippets)_, **with** or **without** the extension Tampermonkey.

| Aspect                 | Tampermonkey                                | `$.getScript("afk_timer_url")` in JavaScript           |
|------------------------|--------------------------------------------|----------------------------------------------|
| Installation           | Easier to install for non-technical users.  | Requires users to add it manually through their browser or a webpage.     |

### Without Tampermokey

1. Write the following line on your Manyland tab `javascript:$.getScript("https://cdn.jsdelivr.net/gh/JorgeFirebolt/manyland-afk-timer/afk_timer.js")`.
2. Press enter, and, everything should be done. Next step is to follow [Getting started](./#getting-started).

### With Tampermonkey

1. Click this [link](https://greasyfork.org/en/scripts/476980-afk-timer) to install it on your Tampermonkey client.
2. Done, once you join Manyland next step is to follow [Getting started](./#getting-started).

## Getting started

To trigger the `AFK` state just write AFK _(non case sensitive)_. The following UI Dialog will display.

[![AFK Timer usage Example](https://i.gyazo.com/3ec7aaff5c7f01261eb6910a1e5b35f7.gif)](https://gyazo.com/3ec7aaff5c7f01261eb6910a1e5b35f7)

The players around you and your friends will see the next text displayed on your name.

[![Timer view 2nd player](https://i.gyazo.com/db571e0c4633340029d3e79b0b03acdb.gif)](https://gyazo.com/db571e0c4633340029d3e79b0b03acdb)

To wear off the `AFK` state you can rather press the `back` button,

[![AFK wear off back button](https://i.gyazo.com/3aae4c20ef0cce23b8c491284abb53aa.gif)](https://gyazo.com/3aae4c20ef0cce23b8c491284abb53aa)

Or rather just show any kind of activity ingame, like moving or pressing `esc` key.

[![AFK wear off activity](https://i.gyazo.com/4f213430312fd7f93b515cfb0af4eaf7.gif)](https://gyazo.com/4f213430312fd7f93b515cfb0af4eaf7)
