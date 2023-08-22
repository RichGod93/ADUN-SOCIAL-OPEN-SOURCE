const Logo = () => {
    return (
        <div className="flex justify-between items-center py-1 px-2">
            <div className="cursor-pointer flex items-center">
                <p className="font-bold text-sm lg:text-base primary-text-color pr-1">ADUN</p>
                <div className="h-6 lg:w-16 px-1 primary-bg-color rounded-sm flex items-center justify-center">
                    <p className="font-medium text-sm lg:text-base secondary-text-color">SOCIAL</p>
                </div>
            </div>
        </div>);
};

export default Logo;