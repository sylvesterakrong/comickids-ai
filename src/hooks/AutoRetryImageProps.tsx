import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, AlertCircle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutoRetryImageProps {
  src: string;
  alt: string;
  className?: string;
  maxRetries?: number;
  initialDelay?: number;
  onError?: (error: string) => void;
  onSuccess?: () => void;
  fallbackSrc?: string;
}

const AutoRetryImage: React.FC<AutoRetryImageProps> = ({
  src,
  alt,
  className = "",
  maxRetries = 3,
  initialDelay = 1000,
  onError,
  onSuccess,
  fallbackSrc = "/placeholder.svg"
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setRetryCount(0);
    setIsLoading(true);
    setHasError(false);
    setIsRetrying(false);
  }, [src]);

  const calculateDelay = useCallback((attempt: number) => {
    return initialDelay * Math.pow(2, attempt); // Exponential backoff
  }, [initialDelay]);

  const retryLoad = useCallback(async (attempt: number) => {
    if (attempt >= maxRetries) {
      setIsRetrying(false);
      setIsLoading(false);
      setHasError(true);
      onError?.(`Failed to load image after ${maxRetries} attempts`);
      return;
    }

    setIsRetrying(true);
    const delay = calculateDelay(attempt);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Force refresh by adding timestamp
    const refreshedSrc = `${src}${src.includes('?') ? '&' : '?'}retry=${Date.now()}`;
    setCurrentSrc(refreshedSrc);
    setRetryCount(attempt + 1);
  }, [src, maxRetries, calculateDelay, onError]);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    setIsRetrying(false);
    onSuccess?.();
  }, [onSuccess]);

  const handleImageError = useCallback(() => {
    console.log(`Image load failed (attempt ${retryCount + 1}/${maxRetries})`);
    
    if (retryCount < maxRetries) {
      retryLoad(retryCount);
    } else {
      setIsLoading(false);
      setHasError(true);
      setIsRetrying(false);
      setCurrentSrc(fallbackSrc);
      onError?.(`Failed to load image after ${maxRetries} attempts`);
    }
  }, [retryCount, maxRetries, retryLoad, fallbackSrc, onError]);

  const handleManualRetry = useCallback(() => {
    setRetryCount(0);
    setHasError(false);
    setIsLoading(true);
    setIsRetrying(false);
    setCurrentSrc(src);
  }, [src]);

  if (hasError && currentSrc === fallbackSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-muted rounded-lg p-4 ${className}`}>
        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground text-center mb-3">
          Failed to load image after {maxRetries} attempts
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleManualRetry}
          className="flex items-center gap-2"
        >
          <RotateCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      {(isLoading || isRetrying) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/80 rounded-lg z-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" />
          <p className="text-xs text-muted-foreground">
            {isRetrying ? `Retrying... (${retryCount}/${maxRetries})` : 'Loading...'}
          </p>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: isLoading ? 'block' : 'block' }}
      />
    </div>
  );
};

export default AutoRetryImage;