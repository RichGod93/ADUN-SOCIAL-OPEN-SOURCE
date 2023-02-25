const Logo = () => {
    return (
        <div className="flex justify-between items-center py-1 px-2">
            <div className="cursor-pointer flex items-center">
                <p className="font-bold primary-text-color pr-1">ADUN</p>
                <div className="h-6 w-16 primary-bg-color rounded-lg flex items-center justify-center">
                    <p className="font-medium secondary-text-color">SOCIAL</p>
                </div>
            </div>
        </div>);
};

export default Logo;