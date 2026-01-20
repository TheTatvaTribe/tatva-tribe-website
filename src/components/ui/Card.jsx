const Card = ({
    children,
    className = '',
    hover = true,
    ...props
}) => {
    return (
        <div
            className={`bg-forest-600/50 backdrop-blur-sm rounded-2xl p-6 border border-forest-500/30 ${hover ? 'transition-all duration-300 hover:border-gold-400/50 hover:shadow-lg hover:shadow-gold-400/10 hover:-translate-y-1' : ''
                } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
