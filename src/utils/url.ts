// Helper function to get the first API URL from comma-separated string
export const getFirstApiUrl = (apiUrl: string): string => {
  if (apiUrl.includes(",")) {
    return apiUrl.split(",")[0].trim()
  }
  return apiUrl
}
