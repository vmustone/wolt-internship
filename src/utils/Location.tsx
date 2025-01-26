export const getLocationAndSetValues = (
  setFieldValue: (field: string, value: any) => void,
  onError: (errorMessage: string) => void
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFieldValue('userLatitude', latitude);
        setFieldValue('userLongitude', longitude);
      },
      (error) => {
        const errorMessage = error.message || 'Unable to fetch location';
        onError(errorMessage);
      }
    );
  } else {
    onError('Geolocation is not supported by this browser.');
  }
};
