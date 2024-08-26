export const revalidate = 300;

export default function Layout({ children, modal }: Readonly<{
    children: React.ReactNode, modal: React.ReactNode
}>) {
    return <>
        {children}
        {modal}
    </>;
}