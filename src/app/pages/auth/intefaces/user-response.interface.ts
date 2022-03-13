import { ApiError, User } from "@supabase/supabase-js";

export interface UserResponse extends User, ApiError {
    
}