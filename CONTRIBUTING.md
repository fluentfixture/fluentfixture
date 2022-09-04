# Contributing to @fluentfixture

A big welcome and thank you for considering contributing to @fluentfixture projects! 
It’s people like you that make it a reality for users in our community.

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. 
It also communicates that you agree to respect the time of the developers managing and developing these open source projects. 
In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

## Code of Conduct

We take our open source community seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/fluentfixture/fluentfixture/blob/main/CODE_OF_CONDUCT.md).

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs). Search for existing Issues and PRs before creating your own.

### Issues

Issues should be used to report problems with the library, request a new feature, or to discuss potential changes before a PR is created. 
When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.
If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one.

### Pull Requests

PRs to our libraries are always welcome and can be a quick way to get your fix or improvement slated for the next release.

Search [Pull Requests](https://github.com/fluentfixture/fluentfixture/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
1. Fork this repository.
2. Make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch main
   ```

3. Create your patch, including appropriate test cases.
4. Follow our [Coding Rules](#coding-rules).
5. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit-message-guidelines). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.
6. Push your branch to GitHub:

   ```shell
   git push origin my-fix-branch
   ```
7. In GitHub, send a pull request to the main branch.

If we suggest changes then:

  - Make the required updates.
  - Re-run the all test suites to ensure tests are still passing.
  - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```
    
## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes must be tested by one or more specs.
- We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html).

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more
readable message that are easy to follow when looking through the project history. But also,
we use the git commit messages to generate the change log.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer than 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

Footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

```
docs(changelog): update change log to beta.5
refactor(format): remove the change-case dependency
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **chore**: Updating tasks etc; no production code change
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **sample**: A change to the samples

### Scope

The scope should have the name of the package or sample affected.

The following is the list of supported scopes:

- **core**: for changes made on `packages/core` directory
- **shared**: for changes made on `packages/shared` directory
- **format**: for changes made on `packages/format` directory
- **01** or **02**: for changes made on `sample/01-*` or `sample/02-*` directory.

If your change affect more than one package, separate the scopes with a comma (e.g. `common,core`).

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain reference GitHub issues that this commit **Closes**.

## Attribution

This contributing guideline is inspired from [Nest](https://github.com/nestjs/nest/blob/master/CONTRIBUTING.md) and [Auth0 Open Source Template](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md)
