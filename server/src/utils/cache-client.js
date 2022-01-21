import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config";

const { CACHE_TARGET } = config;
const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

const PROTO_PATH = `${dirname}/../cache.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });

const cacheProto = grpc.loadPackageDefinition(packageDefinition).cache;
const cacheClient = new cacheProto.CacheHandler(CACHE_TARGET, grpc.credentials.createInsecure());

export default cacheClient;
