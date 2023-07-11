export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Projects: {
        Row: {
          created_at: string | null
          github_url: string | null
          id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          github_url?: string | null
          id?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          github_url?: string | null
          id?: number
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
