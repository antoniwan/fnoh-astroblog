import type { ImageMetadata } from 'astro';

/**
 * Type guard to check if a value is an ImageMetadata
 */
export function isImageMetadata(value: unknown): value is ImageMetadata {
	return typeof value === 'object' && value !== null && 'src' in value;
}

/**
 * Get the alt text for an image, with fallback
 */
export function getImageAlt(alt: string | undefined, fallback: string): string {
	return alt || fallback;
}

/**
 * Get image dimensions with fallbacks
 */
export function getImageDimensions(
	width?: number,
	height?: number,
	defaultWidth = 800,
	defaultHeight = 400
) {
	return {
		width: width || defaultWidth,
		height: height || defaultHeight,
	};
}

/**
 * Validate image metadata for content collections
 */
export function validateImageMetadata(
	image: unknown,
	fieldName: string
): ImageMetadata | undefined {
	if (image === undefined || image === null) {
		return undefined;
	}
	
	if (isImageMetadata(image)) {
		return image;
	}
	
	console.warn(
		`Warning: ${fieldName} is not a valid ImageMetadata. Expected ImageMetadata, got ${typeof image}.`
	);
	return undefined;
}
