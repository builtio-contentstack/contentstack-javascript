// Type definitions for contentstack 3.11.0
// Project: https://www.contentstack.com/
// Definitions by: Contentstack <https://github.com/contentstack>

//Enum for Contentstack Region
export enum Region {
    US = "us",
    EU = "eu"
}

//Enum for Contentstack CachePolicy
export enum CachePolicy {
     IGNORE_CACHE = -1,
     ONLY_NETWORK = 0,
     CACHE_ELSE_NETWORK = 1,
     NETWORK_ELSE_CACHE = 2,
     CACHE_THEN_NETWORK = 3
}

// Sync Result 
export interface SyncResult {
    items: Array<any>;
    paginationToken?: string;
    syncToken?: string;
    skip: number;
    limit: number;
    totalCount: number;
}

// Contentstack Config 
export interface Config {
    api_key: string;
    delivery_token: string;
    environment: string;
    region?: Region;
    fetchOptions?: object;
}
// Stack Config
export interface StackConfig {
    protocol: string;
    host: string;
    port: number;
    version: string;
}

// ContentTypeCollection
export interface ContentTypeCollection{
    contentTypes: Array<any>
    count?: number
}

// Stack 
export class Stack {
    constructor(config: Config);
    constructor(api_key: string, delivery_token: string, environment_name: string, region?: Region, fetchOptions?: any);

    environment: string;
    cachePolicy: CachePolicy;
    config: StackConfig;
    fetchOptions: any;

    ContentType(uid: string): ContentType;
    Assets(uid: string): Asset;
    Assets(): Assets;

    setPort(port: number): Stack;
    setProtocol(protocol: string): Stack;
    setHost(host: string): Stack;
    setCachePolicy(policy: CachePolicy): Stack;
    setCacheProvider(provider: object): Stack;
    clearByQuery(): Stack;
    clearByContentType(): Stack;
    clearAll(): Stack;
    getCacheProvider(): object;
    getLastActivites(): Promise<any>;;
    getContentTypes(param?: object): Promise<ContentTypeCollection>;
    sync(params: object): Promise<SyncResult>;
    imageTransform(url: string, params: any): string;
}

export function Stack(config: Config): Stack;
export function Stack(api_key: string, access_token: string, environment_name: string, region?: string, fetchOptions?: object): Stack;

export class ContentType {
    constructor();
    content_type_uid: string
    
    Query(): Query;
    Entry(uid: string): Entry;
    fetch(fetchOptions?: object): Promise<any>;
}

export class Assets {
    constructor();

    toJSON(): Assets;
    addParam(key: string, value: any): Assets;
    Query(): Query;

}

export class Asset {
    constructor();

    asset_uid: string
    
    toJSON(): Assets;
    addParam(key: string, value: any): Assets;
    fetch(fetchOptions?: object): Promise<any>;
}

export class Entry {
    constructor();

    entry_uid: string;
    content_type_uid: string;
    _query: object;
    provider: any;
    cachePolicy: number;
    queryCachePolicy: number;

    only(field_uid: string): Entry;
    only(field_uids: string[]): Entry;
    only(reference_field_uid:string, field_uid: string): Entry;
    only(reference_field_uid:string, field_uids: string[]): Entry;

    except(field_uid: string): Entry;
    except(field_uids: string[]): Entry;
    except(reference_field_uid:string, field_uid: string): Entry;
    except(reference_field_uid:string, field_uids: string[]): Entry;

    setCacheProvider(provider: object): Entry;
    setCachePolicy(policy: number): Entry;
    includeReference(val: string[]): Entry;
    includeReference(...val: string[]): Entry;
    language(language_code: string): Entry;
    addQuery(key: string, value: string): Entry;

    /**
     * @deprecated since verion 3.3.0
     */
    includeSchema(): Entry;
    includeReferenceContentTypeUID(): Entry;
    includeContentType(): Entry;
    includeOwner(): Entry;
    toJSON(): Entry;
    addParam(key: string, value: any): Entry;
    fetch(fetchOptions?: object): Promise<any>;
}

export class Query extends Entry {
    constructor();
    _query: object;

    getQuery(): Query;

    includeCount(): Query;
    query(query: object): Query;
    count(fetchOptions?: object): Query;

    referenceIn(key: string, query: Query): Query;
    referenceNotIn(key: string, query: Query): Query;

    tags(value: string[]): Query;

    where(key: string, value: (string | number)): Query;
    equalTo(key: string, value: (string | number)): Query;
    notEqualTo(key: string, value: (string | number)): Query;

    lessThan(key: string, value: (string | number)): Query;
    lessThanOrEqualTo(key: string, value: (string | number)): Query;

    greaterThan(key: string, value: (string | number)): Query;
    greaterThanOrEqualTo(key: string, value: (string | number)): Query;

    containedIn(key: string, value: (string | number)[]): Query;
    notContainedIn(key: string, value: (string | number)[]): Query;

    exists(key: string): Query;
    notExists(key: string): Query;

    ascending(key: string): Query;
    descending(key: string): Query;

    beforeUid(uid: string): Query;
    afterUid(uid: string): Query;

    skip(skip: number): Query;
    limit(limit: number): Query;

    or(...queries: Query[]): Query;
    and(...queries: Query[]): Query;

    referenceIn(key: string, query: (Query | object)): Query;
    referenceNotIn(key: string, query: (Query | object)): Query;

    regex(key: string, value: string, options?: string): Query;
    
    search(value: string): Query;

    find(fetchOptions?: object): Promise<any>;
    findOne(): Promise<any>;
}