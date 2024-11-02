export const trackTitleFilter = (title: String) => (track: any) => 
    track.title?.toLowerCase().includes(title.toLowerCase())