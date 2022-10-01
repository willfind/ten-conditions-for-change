To make changes to this web page, follow these steps:

1. Clone this repo.
2. Make whatever changes you want to make to your local copy.
3. Run `npm install` from within this directory in your local copy. This will install the requisite NodeJS packages for building the site content. You'll need to have NodeJS installed for this to work.
4. Run `node build.js` from within this directory in your local copy. This will build the site content.
5. Add, commit, and push your changes via git back to this repo.

Note that the above steps are necessary but not sufficient to get changes to show up on the live site. To make that happen, you'll need to update the website repo, since it uses this repo as a submodule. To do that, follow these steps:

1. Clone or navigate to the [website repo](https://github.com/willfind/sparkwave-website).
2. Inside the website repo directory, run `git submodule update --init --remote --recursive` to pull in the changes made to the Ten Conditions repo.
3. The previous step puts the website repo in a modified state, which means that you'll need to add, commit, and push the changes back to the website repo's origin.

Once that's done, the changes should be live!
