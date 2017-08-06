"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function router(router) {
    router.all('/', async (ctx) => {
        console.log(ctx.request.body);
        ctx.body = { 'Hello': 'world' };
    });
}
exports.router = router;
//# sourceMappingURL=router.js.map