import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

type OptimizedImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
  className?: string;
};

export function OptimizedImage({
  src,
  alt,
  className,
  width = 0,
  height = 0,
  ...props
}: OptimizedImageProps) {
  // Handle external URLs
  const isExternal = typeof src === 'string' && src.startsWith('http');

  // Set default sizes for responsive images
  const sizes = props.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 768px';

  return (
    <div className={cn('relative', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={cn('h-auto w-full object-cover', className)}
        {...props}
        unoptimized={isExternal}
        priority={props.priority}
        loading={props.loading}
        quality={props.quality || 75}
      />
    </div>
  );
}
