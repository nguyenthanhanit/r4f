export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Next.js + NextUI",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Về tôi",
            href: "/",
        },
        {
            label: "Thử thách",
            href: "/challenges",
        },
    ],
    navMenuItems: [
        {
            label: "Về tôi",
            href: "/",
        },
        {
            label: "Thử thách",
            href: "/challenges",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    links: {
        sponsor: "https://patreon.com/jrgarciadev"
    },
};
