This is a [Next.js](https://nextjs.org) project for a personal portfolio site.

## Getting Started

This project uses [mise](https://mise.jdx.dev/) to manage the local Node.js runtime.

Install the project toolchain and dependencies:

```bash
mise trust
mise install
npm install
```

Start the development server with either `mise` or `npm`:

```bash
mise run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Other common commands:

```bash
mise run lint
mise run build
```

The pinned runtime lives in `mise.toml` and matches the minimum Node.js version required by Next.js 16.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
