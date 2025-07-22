"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudflareDns = void 0;
class CloudflareDns {
    constructor() {
        this.description = {
            displayName: 'Cloudflare DNS',
            name: 'cloudflareDns',
            icon: 'file:cloudflare.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with Cloudflare DNS API',
            defaults: {
                name: 'Cloudflare DNS',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
            credentials: [
                {
                    name: 'cloudflareDnsApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'DNS Record',
                            value: 'dnsRecord',
                        },
                    ],
                    default: 'dnsRecord',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                        },
                    },
                    options: [
                        {
                            name: 'Create',
                            value: 'create',
                            description: 'Create a DNS record',
                            action: 'Create a DNS record',
                        },
                        {
                            name: 'Delete',
                            value: 'delete',
                            description: 'Delete a DNS record',
                            action: 'Delete a DNS record',
                        },
                        {
                            name: 'Get All',
                            value: 'getAll',
                            description: 'List all DNS records for a zone',
                            action: 'Get all DNS records',
                        },
                        {
                            name: 'Update',
                            value: 'update',
                            description: 'Update a DNS record',
                            action: 'Update a DNS record',
                        },
                    ],
                    default: 'getAll',
                },
                // Zone ID field (required for all operations)
                {
                    displayName: 'Zone ID',
                    name: 'zoneId',
                    type: 'string',
                    required: true,
                    default: '',
                    description: 'The zone ID to perform the operation on',
                    placeholder: 'e.g., 1234567890abcdef1234567890abcdef',
                },
                // DNS Record ID field (for update and delete operations)
                {
                    displayName: 'DNS Record ID',
                    name: 'recordId',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                            operation: ['update', 'delete'],
                        },
                    },
                    default: '',
                    description: 'The DNS record ID to update or delete',
                    placeholder: 'e.g., 1234567890abcdef1234567890abcdef',
                },
                // DNS Record Type field (for create and update operations)
                {
                    displayName: 'Record Type',
                    name: 'type',
                    type: 'options',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                            operation: ['create', 'update'],
                        },
                    },
                    options: [
                        {
                            name: 'A',
                            value: 'A',
                        },
                        {
                            name: 'AAAA',
                            value: 'AAAA',
                        },
                        {
                            name: 'CNAME',
                            value: 'CNAME',
                        },
                        {
                            name: 'MX',
                            value: 'MX',
                        },
                        {
                            name: 'TXT',
                            value: 'TXT',
                        },
                        {
                            name: 'NS',
                            value: 'NS',
                        },
                        {
                            name: 'SRV',
                            value: 'SRV',
                        },
                        {
                            name: 'PTR',
                            value: 'PTR',
                        },
                    ],
                    default: 'A',
                    description: 'Type of DNS record',
                },
                // DNS Record Name field (for create and update operations)
                {
                    displayName: 'Record Name',
                    name: 'name',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                            operation: ['create', 'update'],
                        },
                    },
                    default: '',
                    description: 'DNS record name (e.g., "www", "@" for root domain)',
                    placeholder: 'www',
                },
                // DNS Record Content field (for create and update operations)
                {
                    displayName: 'Record Content',
                    name: 'content',
                    type: 'string',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                            operation: ['create', 'update'],
                        },
                    },
                    default: '',
                    description: 'DNS record content (e.g., IP address for A record)',
                    placeholder: '192.0.2.1',
                },
                // Additional Fields for create and update operations
                {
                    displayName: 'Additional Fields',
                    name: 'additionalFields',
                    type: 'collection',
                    placeholder: 'Add Field',
                    default: {},
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                            operation: ['create', 'update'],
                        },
                    },
                    options: [
                        {
                            displayName: 'TTL',
                            name: 'ttl',
                            type: 'number',
                            default: 1,
                            description: 'Time To Live in seconds (1 for automatic)',
                            typeOptions: {
                                minValue: 1,
                                maxValue: 2147483647,
                            },
                        },
                        {
                            displayName: 'Proxied',
                            name: 'proxied',
                            type: 'boolean',
                            default: false,
                            description: 'Whether the record is proxied through Cloudflare',
                        },
                        {
                            displayName: 'Comment',
                            name: 'comment',
                            type: 'string',
                            default: '',
                            description: 'A comment for the DNS record',
                        },
                        {
                            displayName: 'Tags',
                            name: 'tags',
                            type: 'string',
                            default: '',
                            description: 'Comma-separated list of tags for the DNS record',
                        },
                        {
                            displayName: 'Priority',
                            name: 'priority',
                            type: 'number',
                            default: 10,
                            description: 'Priority for MX and SRV records',
                            displayOptions: {
                                show: {
                                    '/type': ['MX', 'SRV'],
                                },
                            },
                        },
                    ],
                },
                // Options for getAll operation
                {
                    displayName: 'Options',
                    name: 'options',
                    type: 'collection',
                    placeholder: 'Add Option',
                    default: {},
                    displayOptions: {
                        show: {
                            resource: ['dnsRecord'],
                            operation: ['getAll'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Record Type',
                            name: 'type',
                            type: 'options',
                            default: '',
                            description: 'Filter by record type',
                            options: [
                                {
                                    name: 'All Types',
                                    value: '',
                                },
                                {
                                    name: 'A',
                                    value: 'A',
                                },
                                {
                                    name: 'AAAA',
                                    value: 'AAAA',
                                },
                                {
                                    name: 'CNAME',
                                    value: 'CNAME',
                                },
                                {
                                    name: 'MX',
                                    value: 'MX',
                                },
                                {
                                    name: 'TXT',
                                    value: 'TXT',
                                },
                                {
                                    name: 'NS',
                                    value: 'NS',
                                },
                                {
                                    name: 'SRV',
                                    value: 'SRV',
                                },
                                {
                                    name: 'PTR',
                                    value: 'PTR',
                                },
                            ],
                        },
                        {
                            displayName: 'Record Name',
                            name: 'name',
                            type: 'string',
                            default: '',
                            description: 'Filter by record name',
                        },
                        {
                            displayName: 'Content',
                            name: 'content',
                            type: 'string',
                            default: '',
                            description: 'Filter by record content',
                        },
                        {
                            displayName: 'Limit',
                            name: 'per_page',
                            type: 'number',
                            default: 20,
                            description: 'Number of records per page',
                            typeOptions: {
                                minValue: 5,
                                maxValue: 5000,
                            },
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            if (resource === 'dnsRecord') {
                if (operation === 'getAll') {
                    // List DNS records
                    const zoneId = this.getNodeParameter('zoneId', i);
                    const options = this.getNodeParameter('options', i);
                    const qs = {};
                    if (options.type) {
                        qs.type = options.type;
                    }
                    if (options.name) {
                        qs.name = options.name;
                    }
                    if (options.content) {
                        qs.content = options.content;
                    }
                    if (options.per_page) {
                        qs.per_page = options.per_page;
                    }
                    const requestOptions = {
                        method: 'GET',
                        baseURL: 'https://api.cloudflare.com/client/v4',
                        url: `/zones/${zoneId}/dns_records`,
                        qs,
                        json: true,
                    };
                    const response = await this.helpers.requestWithAuthentication.call(this, 'cloudflareDnsApi', requestOptions);
                    if (response.success) {
                        returnData.push(...response.result);
                    }
                    else {
                        throw new Error(`Cloudflare API Error: ${JSON.stringify(response.errors)}`);
                    }
                }
                else if (operation === 'create') {
                    // Create DNS record
                    const zoneId = this.getNodeParameter('zoneId', i);
                    const type = this.getNodeParameter('type', i);
                    const name = this.getNodeParameter('name', i);
                    const content = this.getNodeParameter('content', i);
                    const additionalFields = this.getNodeParameter('additionalFields', i);
                    const body = {
                        type,
                        name,
                        content,
                    };
                    if (additionalFields.ttl) {
                        body.ttl = additionalFields.ttl;
                    }
                    if (additionalFields.proxied !== undefined) {
                        body.proxied = additionalFields.proxied;
                    }
                    if (additionalFields.comment) {
                        body.comment = additionalFields.comment;
                    }
                    if (additionalFields.tags) {
                        body.tags = additionalFields.tags.split(',').map(tag => tag.trim());
                    }
                    if (additionalFields.priority && (type === 'MX' || type === 'SRV')) {
                        body.priority = additionalFields.priority;
                    }
                    const requestOptions = {
                        method: 'POST',
                        baseURL: 'https://api.cloudflare.com/client/v4',
                        url: `/zones/${zoneId}/dns_records`,
                        body,
                        json: true,
                    };
                    const response = await this.helpers.requestWithAuthentication.call(this, 'cloudflareDnsApi', requestOptions);
                    if (response.success) {
                        returnData.push(response.result);
                    }
                    else {
                        throw new Error(`Cloudflare API Error: ${JSON.stringify(response.errors)}`);
                    }
                }
                else if (operation === 'update') {
                    // Update DNS record
                    const zoneId = this.getNodeParameter('zoneId', i);
                    const recordId = this.getNodeParameter('recordId', i);
                    const type = this.getNodeParameter('type', i);
                    const name = this.getNodeParameter('name', i);
                    const content = this.getNodeParameter('content', i);
                    const additionalFields = this.getNodeParameter('additionalFields', i);
                    const body = {
                        type,
                        name,
                        content,
                    };
                    if (additionalFields.ttl) {
                        body.ttl = additionalFields.ttl;
                    }
                    if (additionalFields.proxied !== undefined) {
                        body.proxied = additionalFields.proxied;
                    }
                    if (additionalFields.comment) {
                        body.comment = additionalFields.comment;
                    }
                    if (additionalFields.tags) {
                        body.tags = additionalFields.tags.split(',').map(tag => tag.trim());
                    }
                    if (additionalFields.priority && (type === 'MX' || type === 'SRV')) {
                        body.priority = additionalFields.priority;
                    }
                    const requestOptions = {
                        method: 'PUT',
                        baseURL: 'https://api.cloudflare.com/client/v4',
                        url: `/zones/${zoneId}/dns_records/${recordId}`,
                        body,
                        json: true,
                    };
                    const response = await this.helpers.requestWithAuthentication.call(this, 'cloudflareDnsApi', requestOptions);
                    if (response.success) {
                        returnData.push(response.result);
                    }
                    else {
                        throw new Error(`Cloudflare API Error: ${JSON.stringify(response.errors)}`);
                    }
                }
                else if (operation === 'delete') {
                    // Delete DNS record
                    const zoneId = this.getNodeParameter('zoneId', i);
                    const recordId = this.getNodeParameter('recordId', i);
                    const requestOptions = {
                        method: 'DELETE',
                        baseURL: 'https://api.cloudflare.com/client/v4',
                        url: `/zones/${zoneId}/dns_records/${recordId}`,
                        json: true,
                    };
                    const response = await this.helpers.requestWithAuthentication.call(this, 'cloudflareDnsApi', requestOptions);
                    if (response.success) {
                        returnData.push(response.result);
                    }
                    else {
                        throw new Error(`Cloudflare API Error: ${JSON.stringify(response.errors)}`);
                    }
                }
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.CloudflareDns = CloudflareDns;
