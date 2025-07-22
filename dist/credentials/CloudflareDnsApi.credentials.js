"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudflareDnsApi = void 0;
class CloudflareDnsApi {
    constructor() {
        this.name = 'cloudflareDnsApi';
        this.displayName = 'Cloudflare DNS API';
        this.documentationUrl = 'https://developers.cloudflare.com/fundamentals/api/get-started/';
        this.properties = [
            {
                displayName: 'API Token',
                name: 'apiToken',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
                description: 'Cloudflare API Token with DNS permissions',
                placeholder: 'Your Cloudflare API Token',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://api.cloudflare.com/client/v4',
                url: '/user/tokens/verify',
                method: 'GET',
            },
        };
    }
}
exports.CloudflareDnsApi = CloudflareDnsApi;
