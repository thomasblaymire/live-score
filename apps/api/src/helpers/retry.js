var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// An exponential backoff retry function
export function retry(fn_1) {
    return __awaiter(this, arguments, void 0, function* (fn, retries = 3, delay = 100) {
        try {
            const result = yield fn();
            return result;
        }
        catch (error) {
            if (retries === 0) {
                throw error;
            }
            yield new Promise((resolve) => setTimeout(resolve, delay));
            return yield retry(fn, retries - 1, delay * 2);
        }
    });
}
