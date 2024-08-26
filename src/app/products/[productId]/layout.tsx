export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div
        style={{ minHeight: 'max(800px, 100vh)' }}
        className='w-screen overflow-y-auto flex flex-col items-center relative max-w-[1920px] m-auto pt-[100px] pb-[5px] bg-white'>
        <div className="w-11/12 max-w-11/12 h-full xl:max-w-8/12 xl:w-8/12 flex flex-col relative">
            {children}
        </div>
    </div>;
}