import { useWindowDimensions } from 'react-native';

interface Layout {
    width: number;
    height: number;
    isLandscape: boolean;
    numColumns: number;        // product grid
    isTablet: boolean;
}

export function useLayout(): Layout {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const isTablet = width >= 600;

    return {
        width,
        height,
        isLandscape,
        numColumns: isTablet || isLandscape ? 3 : 2,
        isTablet,
    };
}