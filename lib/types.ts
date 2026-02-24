export interface User {
    id: string;
    email: string;
    username: string;
    role: 'fan' | 'creator' | 'admin';
    created_at: string;
}

export interface Theory {
    id: string;
    user_id: string;
    title: string;
    content: string;
    status: 'draft' | 'published' | 'rejected';
    created_at: string;
    updated_at: string;
}

export interface Anime {
    id: number;
    title: string;
    year: number;
    genres: string[];
    anilist_id: number;
    synced_at: string;
}

export interface Gig {
    id: string;
    title: string;
    description: string;
    budget: string;
    status: 'open' | 'closed';
    creator_id: string;
    created_at: string;
}

export interface AuditLog {
    id: string;
    action: string;
    user_id: string;
    table_name: string;
    record_id: string;
    changes: any;
    created_at: string;
}
