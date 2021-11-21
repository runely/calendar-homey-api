module.exports = data => data !== undefined && data !== null && (Array.isArray(data) ? data.length !== 0 : typeof data === 'object' ? Object.getOwnPropertyNames(data).length !== 0 : data)
