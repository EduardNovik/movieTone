# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

turbo.json:

{
"$schema": "https://turbo.build/schema.json",
"globalDependencies": ["**/.env.*local"],
"pipeline": {
"build": {
"dependsOn": ["^build"],
"outputs": ["dist/**"]
},
"lint": {},
"dev": {
"cache": false,
"persistent": true
}
}
}

in fe tsconfig:
{
"extends": "tsconfig/vite.json",
"include": ["src"]
}

---in packages tsconfig:

add vite.json to tsconfig:
{
"extends": "./base.json",
"compilerOptions": {
"target": "ESNext",
"useDefineForClassFields": true,
"module": "ESNext",
"lib": ["ESNext", "DOM"],
"sourceMap": true,
"resolveJsonModule": true,
"noEmit": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true
},
"exclude": ["node_modules"]
}

base.json:
{
"$schema": "https://json.schemastore.org/tsconfig",
"display": "Default",
"compilerOptions": {
"composite": false,
"declaration": true,
"declarationMap": true,
"esModuleInterop": true,
"forceConsistentCasingInFileNames": true,
"inlineSources": false,
"isolatedModules": true,
"moduleResolution": "node",
"noUnusedLocals": false,
"noUnusedParameters": false,
"preserveWatchOutput": true,
"skipLibCheck": true,
"strict": true
},
"exclude": ["node_modules"]
}

vite.json:
new:
{
"extends": "./base.json",
"compilerOptions": {
"target": "ESNext",
"useDefineForClassFields": true,
"module": "ESNext",
"lib": ["ESNext", "DOM"],
"sourceMap": true,
"resolveJsonModule": true,
"noEmit": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"noImplicitReturns": true
},
"exclude": ["node_modules"]
}

old:
{
"compilerOptions": {
"target": "ES2020",
"useDefineForClassFields": true,
"lib": ["ES2020", "DOM", "DOM.Iterable"],
"module": "ESNext",
"skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }

},
"include": ["src"],
"references": [{ "path": "./tsconfig.node.json" }]
}

---in fe package.json:
{
"name": "web",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview",
"lint": "eslint \"src/\*_/_.ts\""
},
"dependencies": {
"ui": "workspace:_"
},
"devDependencies": {
"eslint": "^7.32.0",
"eslint-config-custom": "workspace:_",
"tsconfig": "workspace:\*",
"typescript": "^4.9.4",
"vite": "^4.0.3"
}
}

removed
// "eslint-config-prettier": "^9.0.0",
