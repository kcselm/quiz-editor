// would really like to use uuid on the server for generating a truly unique id

export const getRandomID = () => Math.random().toString(16).slice(2)
