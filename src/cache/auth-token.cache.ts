import CacheCore from "@/cache/core.cache.ts";

export default new class AuthTokenCache extends CacheCore {
  constructor() {
    super('auth-token');
  }
}();