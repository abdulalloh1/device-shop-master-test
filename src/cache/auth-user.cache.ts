import CacheCore from "@/cache/core.cache";

export default new class AuthUserCache extends CacheCore {
  constructor() {
    super('auth-user');
  }
}();