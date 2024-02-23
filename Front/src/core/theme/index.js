const Theme = {
    size: (value, sizeMultiplicator = 8) => {
        return value * sizeMultiplicator
    },
    fonts: {
        main: 'Plus Jakarta Sans'
    },
    maxWidth: 1120,
    breakpoints: {
        desktop: 'screen and (min-width: 769px)',
    },
    colors: {
        neutralColor: '#ffffff',
        brandColor: '#6972FF',
        hoverBrandColor: '#3d4aff',
        accentColor: '#EA5326',
        hoverAccentColor: '#df4516',
        textBlackColor: '#17181B',
    },
    gradients: {
        bodyBack: 'linear-gradient(to top right, #EFE7D8, #BED5D9)',
        cardBack: 'linear-gradient(to bottom right, #DCDFE4, #E8EEEE)',
    },
    shadows: {
        soft: '0px 3px 12px -3px rgba(0, 0, 0, 0.1)',
        medium: '0px 9px 12px -3px rgba(0, 0, 0, 0.1)',
        high: '0px 12px 12px -3px rgba(0, 0, 0, 0.1)',
    }
}

export default Theme;