export default {
    production: process.env.NODE_ENV === 'production',
    baseUrl: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:9000/api',
    facebookAppId: "480859139369996"
}