var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseISO, isValid } from "date-fns";
import { z } from "zod";
export const LocalDateSchema = z
    .string()
    .refine((date) => isValid(parseISO(date)), { message: "Invalid date string" })
    .transform((date) => parseISO(date));
function thisWorksWithNoDate() {
    return __awaiter(this, void 0, void 0, function* () {
        const SchemaNoDate = z.object({
            a: z.string(),
            b: z.string(),
            c: z.string(),
        });
        const works = yield genericFetcher({
            path: "/foo",
            schema: SchemaNoDate,
        });
    });
}
function reproTheThingWithDate() {
    return __awaiter(this, void 0, void 0, function* () {
        const SchemaWithDate = z.object({
            a: z.string(),
            date: LocalDateSchema,
            c: z.string(),
        });
        // The types of '_input.date' are incompatible between these types. Type 'string' is not assignable to type 'Date'.ts(2322)
        const doesNotWork = yield genericFetcher({
            path: "/foo",
            schema: SchemaWithDate,
        });
    });
}
function genericFetcher({ path, schema, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fakeFetch(path);
        const responseJson = yield response.json();
        const result = schema.safeParse(responseJson);
        if (result.success) {
            return result.data;
        }
        throw new Error(`Unable to parse response`);
    });
}
/**
 * Only used for reproduction
 */
function fakeFetch(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            json: () => Promise.resolve({}),
        };
    });
}
