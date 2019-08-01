"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fast_express_1 = require("@karakulov-web-dev/fast-express");
var voting_pay_get_user_id_by_access_token_1 = __importDefault(require("@karakulov-web-dev/voting-pay-get-user-id-by-access-token"));
var md5_1 = __importDefault(require("md5"));
function SaveImg(base64Data) {
    var fileName = md5_1["default"](base64Data) + ".png";
    require("fs").writeFile(__dirname + "/../static/images/" + fileName, base64Data, "base64", function () { });
    return fileName;
}
var ProfilesApi = /** @class */ (function (_super) {
    __extends(ProfilesApi, _super);
    function ProfilesApi(port, profiles) {
        var _this = _super.call(this, port, function (app) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                app.get("/static*", fast_express_1.express.static(__dirname + "/../"));
                return [2 /*return*/];
            });
        }); }) || this;
        _this.profiles = profiles;
        return _this;
    }
    ProfilesApi.prototype.get = function (_a) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var userId, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!body || !body.AccessToken) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "invalid data request",
                                    profiles: []
                                }];
                        }
                        return [4 /*yield*/, voting_pay_get_user_id_by_access_token_1["default"](body.AccessToken)];
                    case 1:
                        userId = _c.sent();
                        if (!userId) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "Ошибка при проверке AccessToken",
                                    profiles: []
                                }];
                        }
                        _b = {
                            error: false,
                            errorText: ""
                        };
                        return [4 /*yield*/, this.profiles.get({ userId: userId })];
                    case 2: return [2 /*return*/, (_b.profiles = _c.sent(),
                            _b)];
                }
            });
        });
    };
    ProfilesApi.prototype.create = function (_a) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var userId, profiles, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!body || !body.AccessToken) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "AccessToken empty or undefined"
                                }];
                        }
                        return [4 /*yield*/, voting_pay_get_user_id_by_access_token_1["default"](body.AccessToken)];
                    case 1:
                        userId = _c.sent();
                        if (!userId) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "Ошибка при проверке AccessToken",
                                    profiles: []
                                }];
                        }
                        return [4 /*yield*/, this.profiles.get({ userId: userId })];
                    case 2:
                        profiles = _c.sent();
                        if (!profiles || !Array.isArray(profiles) || profiles.length) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "Невозможно создать профиль"
                                }];
                        }
                        _b = {
                            error: false,
                            errorText: ""
                        };
                        return [4 /*yield*/, this.profiles.set([{ userId: userId }])];
                    case 3: return [2 /*return*/, (_b.result = _c.sent(),
                            _b)];
                }
            });
        });
    };
    ProfilesApi.prototype.update = function (_a) {
        var body = _a.body;
        return __awaiter(this, void 0, void 0, function () {
            var userId, fileName, dbSetObj, updateResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!body || !body.AccessToken || !body.data) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "invalid data request"
                                }];
                        }
                        return [4 /*yield*/, voting_pay_get_user_id_by_access_token_1["default"](body.AccessToken)];
                    case 1:
                        userId = _b.sent();
                        if (!userId) {
                            return [2 /*return*/, {
                                    error: true,
                                    errorText: "Ошибка при проверке AccessToken",
                                    profiles: []
                                }];
                        }
                        if (body.data.img) {
                            fileName = SaveImg(body.data.img.replace(/^data:image\/png;base64,/, ""));
                        }
                        else {
                            fileName = "";
                        }
                        dbSetObj = {
                            profile: body.data.profile || "",
                            name: body.data.name || "",
                            description: body.data.description || ""
                        };
                        if (fileName) {
                            dbSetObj.img = "http://localhost/profile/static/images/" + fileName;
                        }
                        return [4 /*yield*/, this.profiles.update({ userId: userId }, {
                                $set: dbSetObj
                            })];
                    case 2:
                        updateResult = _b.sent();
                        return [2 /*return*/, {
                                error: false,
                                errorText: "",
                                result: updateResult.result
                            }];
                }
            });
        });
    };
    return ProfilesApi;
}(fast_express_1.FastExpress));
exports["default"] = ProfilesApi;
