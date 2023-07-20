# github-widget(Developing)

This is a simple and general library of web components integrating github RESTful API.

## About Definition of Contribution

[Your contributions, including commits, proposed pull requests, and opened issues, are displayed on your profile so people can easily see the work you've done.](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile)

By the way, there have no direct ways to get the contribution stats, instead, it is derived by commits, pull requests and issues, hence we have no choice but calculate it by counting those metrics.

So, is there really have no ways? No, We have a hack method to get it: crawling the html from personal github homepage. But this way is unstable because of we have to update our crawler every time when github updates their html structure. Sum up, I have implement this function but you CANNOT hold too much wish on its stability.

## Example

Click [online example]() to get a look of this component.

## Usage

## Install

If you want modify the source code of this project, you have to install `ruby` and `gem`. Because the features that getting and analyzing the github contribution stats are depends on gem module `githubstats`.

**I'm trying to develop a equivalent js module and then removing dependence of `githubstats`**.

- [Ruby Download](https://www.ruby-lang.org/en/downloads/)
- [Gem Download](https://rubygems.org/pages/download)

Run the follow commands after done:

```bash
npm install

gem install bundler

bundle install
```

## TODO

- develop a github contribution analyzing lib base on js.
- offer interface to customize style of components.
- generate story book or components doc.
- build and publish a version for react/vue.
