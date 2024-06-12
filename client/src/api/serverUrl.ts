// const baseUrl = "https://192.168.0.120" //when wifi dongle is connected
const baseUrl = "https://172.22.52.67" // when I use other wifi adaptar

export const serverUrl = import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : `${baseUrl}:3000`;