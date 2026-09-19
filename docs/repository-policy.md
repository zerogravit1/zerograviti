# Repository Policy

## Main branch

`main` is the production branch and should remain deployable.

Changes should reach `main` through pull requests. Direct pushes are reserved for repository bootstrap or an explicit emergency.

## Branch naming

Use short, descriptive branches:

- `feat/<name>`
- `fix/<name>`
- `chore/<name>`
- `docs/<name>`
- `refactor/<name>`
- `test/<name>`

## Pull requests

Pull requests should:

- explain what changed and why;
- link the relevant issue or project item when one exists;
- include or update tests when behavior changes;
- include screenshots for meaningful UI changes;
- keep unrelated changes out of the same PR;
- resolve review conversations before merge.

## Merge strategy

Use squash merge so `main` keeps a linear, intentional history.

Delete merged branches after merge.

## Required checks

As CI is introduced, protect `main` with required checks for:

1. formatting / linting;
2. typechecking;
3. unit tests;
4. build;
5. Playwright smoke tests when the application is runnable.

Additional performance, accessibility, security, and deployment checks can become required as they mature.

## Review policy

This is currently a single-maintainer repository, so required approvals should remain at zero. Requiring an approval from the only maintainer would create an artificial bypass workflow.

If additional maintainers are added, change the ruleset to require at least one approval.

## History and safety

The `main` ruleset should:

- require a pull request before merge;
- require status checks once CI exists;
- require conversation resolution;
- require linear history;
- block force pushes;
- block branch deletion.

## Security

Never commit secrets, credentials, private keys, production environment files, or access tokens.

Enable GitHub secret scanning and push protection where available. Add dependency update automation after the project has a package manifest.
