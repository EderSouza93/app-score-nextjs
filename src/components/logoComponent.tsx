import Image from 'next/image';
import { FC } from 'react';

interface LogoProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    className?: string;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    quality?: number;
    onLoad?: () => void;
    onError?: (error: Error) => void;
}

const Logo: FC<LogoProps> = ({
    src,
    alt,
    width = 400,
    height = 300,
    priority = false,
    className = '',
    objectFit = 'cover',
    quality = 75,
    onLoad,
    onError,
}) => {
    return (
        <div className={`relative ${className}`}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                className={className}
                objectFit={`object-${objectFit}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={quality}
                onLoad={onLoad}
                onError={onError as any}
            />
        </div>
    );
};

export default Logo;