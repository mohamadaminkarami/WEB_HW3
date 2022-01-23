import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import grpcPromise from "grpc-promise";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import config from "../config";

const { CACHE_TARGET, SSL_ENABLE } = config;
const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

const PROTO_PATH = `${dirname}/../cache.proto`;
const packageDefinition = protoLoader.loadSync(PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });

const cacheProto = grpc.loadPackageDefinition(packageDefinition).cache;

const rootCert = SSL_ENABLE ? fs.readFileSync(`${dirname}/../../cert.pem`) : undefined;
const sslCreds = SSL_ENABLE ? grpc.credentials.createSsl(rootCert) : undefined;
const credentials = SSL_ENABLE ? sslCreds : grpc.credentials.createInsecure();
console.log("ssl:", SSL_ENABLE);
const cacheClient = new cacheProto.CacheHandler(CACHE_TARGET, credentials);

grpcPromise.promisifyAll(cacheClient);

export default cacheClient;
