const Button = ({ name, onClick, icon, className, type }) => {
    return (
        <button onClick={onClick} type={type} className={className}>
            {icon} {name}
        </button>
    );
};

export default Button;