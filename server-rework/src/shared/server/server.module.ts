import Module from "../module/module.interface";
import Container from "typedi";
import { ServerConfigurationToken } from "./config/server.config";
import { serverConfiguration } from "./config/values/server.config";

export default class ServerModule implements Module {
    constructor() {
        Container.set(ServerConfigurationToken, serverConfiguration);
    }

    getDeclarations(): Function[] {
        return [];
    }
    
}