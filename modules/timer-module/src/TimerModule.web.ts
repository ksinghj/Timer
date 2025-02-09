const fallback = {
  areActivitiesEnabled: () => false,
  startActivity() {
    return false;
  },
  // endActivity(_title: string, _headline: string, _widgetUrl: string) {},
};

export default fallback;
