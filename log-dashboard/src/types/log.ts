export interface Log {
    id: number,
    timestamp: string,
    level: string,
    message: string,
    app_name: string,
    meta: Record<string, unknown>;
}

export interface LogFilters {
    level?: string;
    appName?: string;
    search?: string;
    from?: string;
    to?: string;    
}