const UxUnit = 4;

export const Theme = {
  UxUnit: 4,
  DefaultPadding: 4, // Keeping this as 5 for now, but we should probably change this to 4 - not sure why it seems to make such a massive difference.
  DisabledOpacity: 0.3,
  Spacing: {
    XXSmall: UxUnit,
    XSmall: UxUnit * 2,
    Small: UxUnit * 3,
    Medium: UxUnit * 4,
    Large: UxUnit * 6,
    XLarge: UxUnit * 8,
  },
  Radius: {
    Small: 4,
    Medium: 12,
    Large: 20,
    XLarge: 32,
    FullyRound: 999,
  },
  Fonts: {
    Regular: 'SuisseIntl-Regular',
    RegularItalic: 'SuisseIntl-RegularItalic',
    Medium: 'SuisseIntl-Medium',
    MediumItalic: 'SuisseIntl-MediumItalic',
    SemiBold: 'SuisseIntl-SemiBold',
    SemiBoldItalic: 'SuisseIntl-SemiBoldItalic',
    Bold: 'SuisseIntl-Bold',
    BoldItalic: 'SuisseIntl-BoldItalic',
    Black: 'SuisseIntl-Black',
    BlackItalic: 'SuisseIntl-BlackItalic',
    Thin: 'SuisseIntl-Thin',
    ThinItalic: 'SuisseIntl-ThinItalic',
    UltraLight: 'SuisseIntl-UltraLight',
    UltraLightItalic: 'SuisseIntl-UltraLightItalic',
    Book: 'SuisseIntl-Book',
    BookItalic: 'SuisseIntl-BookItalic',
  },
  DefaultHitSlop: { top: 50, bottom: 50, left: 50, right: 50 } as const,
};
