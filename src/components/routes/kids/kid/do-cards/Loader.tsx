const Loader = () => {
    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-6"}>
            {Array.from({length: 4}).map((_, index) => <div key={index} className={"max-w-[600px] h-[200px] bg-animate rounded-xl"}/>)}
        </div>
    );
};

export default Loader;