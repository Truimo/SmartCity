export function getStorageSync(key, defaultValue = null) {
    try {
        const value = uni.getStorageSync(key)
        return value ? value : defaultValue
    } catch(error) {
        console.log(`获取本地缓存 ${key} 失败：`, error.message)
    }
    return defaultValue
}